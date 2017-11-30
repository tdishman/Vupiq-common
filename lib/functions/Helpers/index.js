'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractBetPoints = exports.shouldProcessPoints = exports.getBetPoints = exports.betIsCreatedBeforePlayStarted = exports.getLatencyGroup = exports.findActualBetForPlay = exports.toOrdinal = exports.getInitialPlay = exports.gameIsActive = exports.playIsScoring = undefined;

var _playTypes = require('../../constants/play-types');

var playTypes = _interopRequireWildcard(_playTypes);

var _game = require('../../constants/game');

var gameConstants = _interopRequireWildcard(_game);

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

  if (bet.playDetail_0 && bet.playType === play.base.type) {
    var detailsScored = false;

    // Validate risk picks
    for (var i = 0; i < playBonusesSystem[bet.playType].details.length; i++) {
      var detail = playBonusesSystem[bet.playType].details[i];
      var betDetailChoose = bet['playDetail_' + i];

      if (!betDetailChoose) {
        break;
      }

      switch (detail.metric) {
        case 'Yards':
          {
            var variant = detail.variants[betDetailChoose];
            var maxIsPresent = variant.max !== null && variant.max !== undefined;
            var minIsPresent = variant.min !== null && variant.min !== undefined;

            if (maxIsPresent && minIsPresent) {
              detailsScored = points.yardsGained >= variant.min && points.yardsGained <= variant.max;
            } else if (maxIsPresent) {
              detailsScored = points.yardsGained <= variant.max;
            } else if (minIsPresent) {
              detailsScored = points.yardsGained >= variant.min;
            }

            break;
          }
        case 'Direction':
          {
            detailsScored = (points.direction || '').indexOf(betDetailChoose) > -1;
            break;
          }
        case 'Result':
          {
            detailsScored = (points.complete ? 'complete' : 'incomplete') === betDetailChoose;
            break;
          }
        default:
          {
            break;
          }
      }

      if (!detailsScored) {
        break;
      }
    }

    // Add extra points
    if (detailsScored) {
      betPoints += playBonusesSystem[bet.playType].points;
      for (var j = 0; j < playBonusesSystem[bet.playType].details.length; j++) {
        var _betDetailChoose = bet['playDetail_' + j];
        if (!_betDetailChoose) {
          break;
        }
        var _variant = playBonusesSystem[bet.playType].details[j].variants[_betDetailChoose];
        betPoints += _variant ? _variant.points : 0;
      }
    }
  } else if (bet.playType === play.base.type) {
    betPoints += playBonusesSystem[bet.playType].points;
  }
  return betPoints;
};