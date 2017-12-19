'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScoredBonusesVariants = exports.shouldProcessPoints = exports.getBetPoints = exports.betIsCreatedBeforePlayStarted = exports.getLatencyGroup = exports.findActualBetForPlay = exports.toOrdinal = exports.getInitialPlay = exports.gameIsActive = exports.playIsScoring = undefined;

var _playTypes = require('../../constants/play-types');

var playTypes = _interopRequireWildcard(_playTypes);

var _game = require('../../constants/game');

var gameConstants = _interopRequireWildcard(_game);

var _PlayPointsBonus = require('../../models/PlayPointsBonus');

var _PlayPointsBonus2 = _interopRequireDefault(_PlayPointsBonus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var debug = require('debug')('vupiq-common:functions:helpers');

var playIsScoring = exports.playIsScoring = function playIsScoring(play) {
  switch (play.base.type) {
    case playTypes.TYPE_CONVERSION:
    case playTypes.TYPE_RUSH:
    case playTypes.TYPE_PASS:
    case playTypes.TYPE_KICKOFF:
    case playTypes.TYPE_EXTRA_POINT:
    case playTypes.TYPE_FIELD_GOAL:
    case playTypes.TYPE_PUNT:
      return true;
    default:
      return false;
  }
};

var gameIsActive = exports.gameIsActive = function gameIsActive(game) {
  return [gameConstants.INPROGRESS, gameConstants.HALFTIME].indexOf(game.info.status) > -1;
};

var getInitialPlay = exports.getInitialPlay = function getInitialPlay() {
  return {
    processed: false,
    rejected: false,
    fulfilled: false,
    merged: false,
    issued: false,
    away: {
      alias: '',
      score: 0
    },
    home: {
      alias: '',
      score: 0
    },
    base: {
      type: playTypes.TYPE_NONE,
      scoring: playTypes.SCORE_NONE,
      turnover: playTypes.TURNOVER_NONE,
      yardsGained: 0,
      description: '',
      penalty: false
    }
  };
};

var toOrdinal = exports.toOrdinal = function toOrdinal(value) {
  if ([11, 12, 13].indexOf(value % 100) > -1) {
    return value + 'th';
  } else {
    return value + ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][value % 10];
  }
};

var findActualBetForPlay = exports.findActualBetForPlay = function findActualBetForPlay(bets, play) {
  var actualBet = null;
  var sortedBets = bets.sort(function (betA, betB) {
    return betB.createdAt - betA.createdAt;
  });
  var playStartedAt = play.startedAt || 0;
  if (sortedBets.length === 1) {
    actualBet = sortedBets[0];
  } else {
    for (var i = 0; i < sortedBets.length; i++) {
      var bet = sortedBets[i];
      var latency = bet.latency || 0;
      var betBeforePlayStarted = latency > 0 ? bet.createdAt <= playStartedAt + latency : bet.createdAt + latency <= playStartedAt;

      if (betBeforePlayStarted) {
        if (bet.position && bet.position !== 'none') {
          actualBet = bet;
        }
        break;
      }
    }
  }
  return actualBet;
};

var getLatencyGroup = exports.getLatencyGroup = function getLatencyGroup(milliseconds) {
  milliseconds = milliseconds || 0;
  return (milliseconds / 1000 | 0) * 1000;
};

var betIsCreatedBeforePlayStarted = exports.betIsCreatedBeforePlayStarted = function betIsCreatedBeforePlayStarted(bet, playStartedAt) {
  return bet.latency > 0 ? bet.createdAt <= playStartedAt + bet.latency : bet.createdAt + bet.latency <= playStartedAt;
};

var getBetPoints = exports.getBetPoints = function getBetPoints(play, bet) {
  var playStartedAtValid = (play.startedAt || 0) + (bet.latency > 0 ? bet.latency : 0);

  if (playStartedAtValid > 0 && playStartedAtValid <= Date.now()) {
    var betPoints = play.points ? {
      pos: play.points[bet.position] || 0,
      bonus: play.points.bonuses ? play.points.bonuses[bet.bonus] || 0 : 0
    } : { pos: 0, bonus: 0 };
    betPoints.total = betPoints.pos + betPoints.bonus;
    return betPoints;
  }

  return null;
};

var shouldProcessPoints = exports.shouldProcessPoints = function shouldProcessPoints(play) {
  return play.endedAt > 0 && play.base.type === playTypes.TYPE_CONVERSION || play.base.type === playTypes.TYPE_PASS || play.base.type === playTypes.TYPE_RUSH;
};

var getScoredBonusesVariants = exports.getScoredBonusesVariants = function getScoredBonusesVariants(playType, points, playBonusesSystem) {
  var pickVariants = {};
  var playTypeBonuses = playBonusesSystem[playType];
  var basePick = playType;
  var complexPick = [];
  pickVariants[basePick] = playTypeBonuses ? playTypeBonuses.points[basePick] || 0 : 0;
  var details = playTypeBonuses.details;

  // Recursive details processing
  processDetails(pickVariants, details, basePick, points, playTypeBonuses, complexPick);
  debug(JSON.stringify(pickVariants));
  return pickVariants;
};

var processDetails = function processDetails(pickVariants, details, basePick, points, playTypeBonuses, complexPick) {
  debug(JSON.stringify(complexPick));
  debug(JSON.stringify(pickVariants));
  for (var i = 0; i < details.length; i++) {
    var detail = details[i];
    debug('details index ' + i);
    debug(JSON.stringify(detail));
    if (_PlayPointsBonus2.default.typeIsExists(detail.metric)) {
      var playPointsBonus = new _PlayPointsBonus2.default(detail, points);
      var scoredVariant = playPointsBonus.getScoredVariant();
      complexPick.push(scoredVariant);
      var complexPickKey = basePick + '__' + complexPick.join('__');
      pickVariants[complexPickKey] = playTypeBonuses.points[complexPickKey] || 0;

      var nextDetails = playPointsBonus.nextDetails(scoredVariant);
      if (nextDetails) {
        processDetails(pickVariants, nextDetails, basePick, points, playTypeBonuses, complexPick);
        break;
      }
    } else {
      break;
    }
  }
};