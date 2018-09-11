'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processDetails = exports.getScoredPlayersVariants = exports.getScoredBonusesVariants = exports.shouldProcessPoints = exports.getBetPoints = exports.betIsCreatedBeforePlayStarted = exports.getLatencyGroup = exports.findActualBetForPlay = exports.toOrdinal = exports.getInitialPlay = exports.gameIsActive = exports.playIsScoring = undefined;

var _playTypes = require('../../constants/play-types');

var playTypes = _interopRequireWildcard(_playTypes);

var _cardStatuses = require('../../constants/card-statuses');

var cardStatuses = _interopRequireWildcard(_cardStatuses);

var _game = require('../../constants/game');

var gameConstants = _interopRequireWildcard(_game);

var _PlayPointsBonus = require('../../models/PlayPointsBonus');

var _PlayPointsBonus2 = _interopRequireDefault(_PlayPointsBonus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var debug = require('debug')('vupiq-common:functions:helpers');

var playIsScoring = exports.playIsScoring = function playIsScoring(play) {
  switch (play.base.calculatedType || play.base.type) {
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
      description: ''
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
        if (bet.position && bet.position !== 'none' || !!bet.bonus && bet.bonus !== 'none' && bet.bonus !== 'none__none' && bet.bonus !== 'none__none__none') {
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
  var playersCards = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var playStartedAtValid = (play.startedAt || 0) + (bet.latency > 0 ? bet.latency : 0);
  var playersCardsPoints = 0;

  if (playStartedAtValid > 0) {
    for (var i = 0; i < playersCards.length; i++) {
      playersCardsPoints = playersCardsPoints + ((play.points.playersBonuses || {})[playersCards[i]] || 0);
    }
    var betPoints = play.points ? {
      pos: play.points[bet.position] || 0,
      playersCardsPoints: playersCardsPoints || 0,
      bonus: play.points.bonuses ? play.points.bonuses[bet.bonus] || 0 : 0
    } : { pos: 0, bonus: 0, playersCardsPoints: 0 };
    betPoints.total = betPoints.pos + betPoints.bonus + betPoints.playersCardsPoints;
    return betPoints;
  }

  return null;
};

var shouldProcessPoints = exports.shouldProcessPoints = function shouldProcessPoints(play) {
  return play.endedAt > 0 && playIsScoring(play);
};

var getScoredBonusesVariants = exports.getScoredBonusesVariants = function getScoredBonusesVariants(playType, points, playBonusesSystem) {
  var pickVariants = {};
  var playTypeBonuses = playBonusesSystem[playType];
  var basePick = playType;
  pickVariants[basePick] = playTypeBonuses ? playTypeBonuses.points[basePick] || 0 : 0;
  var details = playTypeBonuses.details;

  processDetails(pickVariants, details, basePick, points, playTypeBonuses, !!playBonusesSystem.strict, !!playBonusesSystem.disabledSkip);

  debug(JSON.stringify(pickVariants));
  return pickVariants;
};

var getScoredPlayersVariants = exports.getScoredPlayersVariants = function getScoredPlayersVariants(playStatistics, playBonusesSystem) {
  var pickVariants = {};
  var playersStatusesPoints = playBonusesSystem.playersStatusesPoints || {};
  var statuses = Object.values(cardStatuses);

  for (var i = 0, j = playStatistics.length; i < j; i++) {
    if (playStatistics[i].player) {
      for (var k = 0, m = statuses.length; k < m; k++) {
        pickVariants[playStatistics[i].player.id + '__' + statuses[k]] = playersStatusesPoints[statuses[k]] || 0;
      }
    }
  }

  debug(JSON.stringify(pickVariants));
  return pickVariants;
};

var processDetails = exports.processDetails = function processDetails(pickVariants, details, basePick, points, playTypeBonuses, strictMode, disabledSkip) {
  for (var i = 0; i < details.length; i++) {
    var detail = details[i];
    if (_PlayPointsBonus2.default.typeIsExists(detail.metric)) {
      var playPointsBonus = new _PlayPointsBonus2.default(detail, points);
      var scoredVariants = playPointsBonus.getScoredVariants();
      var pickVariantsKeys = Object.keys(pickVariants);
      var allVariantsKeys = Object.keys(detail.variants);

      for (var j = 0; j < scoredVariants.length; j++) {
        var scoredVariant = scoredVariants[j];
        for (var k = 0; k < pickVariantsKeys.length; k++) {
          var complexPickKey = pickVariantsKeys[k] + '__' + scoredVariant;
          var variant = complexPickKey.split('__');
          if (variant.length === i + 2) {
            pickVariants[complexPickKey] = playTypeBonuses.points[complexPickKey] || 0;
            if (!disabledSkip) {
              if (variant.length > 2) {
                var skippedVariant = [].concat(variant);
                skippedVariant[1] = 'none';
                complexPickKey = skippedVariant.join('__');
                pickVariants[complexPickKey] = playTypeBonuses.points[complexPickKey] || 0;

                skippedVariant[0] = 'none';
                complexPickKey = skippedVariant.join('__');
                pickVariants[complexPickKey] = playTypeBonuses.points[complexPickKey] || 0;
              }
            }
          }
        }
      }

      for (var _j = 0; _j < allVariantsKeys.length; _j++) {
        var _variant = allVariantsKeys[_j];
        var _scoredVariant = scoredVariants[scoredVariants.indexOf(_variant)];
        console.log(scoredVariants);
        for (var _k = 0; _k < pickVariantsKeys.length; _k++) {
          if (pickVariantsKeys[_k].split('__').length + 1 === i + 2) {
            if (_scoredVariant) {
              var _complexPickKey = pickVariantsKeys[_k] + '__' + _scoredVariant;
              pickVariants[_complexPickKey] = pickVariants[_complexPickKey] > 0 ? pickVariants[_complexPickKey] : playTypeBonuses.points[pickVariantsKeys[_k]] || 0;
            } else if (!strictMode && detail.additional) {
              var _complexPickKey2 = pickVariantsKeys[_k] + '__' + _variant;
              pickVariants[_complexPickKey2] = playTypeBonuses.points[pickVariantsKeys[_k]] || 0;
            }
          }
        }
      }
    } else {
      break;
    }
  }
};