'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractBetPoints = exports.shouldProcessPoints = exports.getBetPoints = exports.betIsCreatedBeforePlayStarted = exports.getLatencyGroup = exports.findActualBetForPlay = exports.toOrdinal = exports.getInitialPlay = exports.gameIsActive = exports.playIsScoring = undefined;

var _playTypes = require('../../constants/play-types');

var playTypes = _interopRequireWildcard(_playTypes);

var _game = require('../../constants/game');

var gameConstants = _interopRequireWildcard(_game);

var _PlayPointsBonus = require('../../models/PlayPointsBonus');

var _PlayPointsBonus2 = _interopRequireDefault(_PlayPointsBonus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var playIsScoring = exports.playIsScoring = function playIsScoring(play) {
  switch (play.base.type) {
    case playTypes.TYPE_CONVERSION:
    case playTypes.TYPE_RUSH:
    case playTypes.TYPE_PASS:
      return !play.base.penalty;
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

  if (play.points && playStartedAtValid > 0 && playStartedAtValid <= Date.now()) {
    return { points: play.points, pos: play.points[bet.position] || 0 };
  }

  return null;
};

var shouldProcessPoints = exports.shouldProcessPoints = function shouldProcessPoints(play) {
  return play.endedAt > 0 && play.base.type === playTypes.TYPE_CONVERSION || play.base.type === playTypes.TYPE_PASS || play.base.type === playTypes.TYPE_RUSH;
};

// DO NOT USE WHILE THIS COMMENT EXISTS
var extractBetPoints = exports.extractBetPoints = function extractBetPoints(play, points, playBonusesSystem, bet) {
  var betPoints = points[bet.playType.toLowerCase()] || 0;
  var playTypeBonuses = playBonusesSystem[bet.playType];
  var betPlayTypeIsScored = bet.playType === play.base.type;

  if (bet.playDetail_0 && betPlayTypeIsScored) {
    var detailsScored = false;
    var playTypeBonusesDetails = [];
    // Validate risk picks
    for (var i = 0; i < playTypeBonuses.details.length; i++) {
      var detail = playTypeBonuses.details[i];

      if (!bet['playDetail_' + i]) {
        break;
      }

      if (_PlayPointsBonus2.default.typeIsExists(detail.metric)) {
        playTypeBonusesDetails[i] = new _PlayPointsBonus2.default(detail, points, bet['playDetail_' + i]);
        detailsScored = playTypeBonusesDetails[i].isScored();
      }

      if (!detailsScored) {
        break;
      }
    }

    // Add extra points
    if (detailsScored) {
      betPoints += playTypeBonuses.points;
      for (var j = 0; j < playTypeBonusesDetails.length; j++) {
        var betDetailChoose = bet['playDetail_' + j];
        if (!betDetailChoose) {
          break;
        }
        betPoints += playTypeBonusesDetails[j].scoredPoints();
      }
    }
  } else if (betPlayTypeIsScored) {
    betPoints += playTypeBonuses.points;
  }
  return betPoints;
};