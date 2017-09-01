'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yfd = exports.toOrdinal = exports.getInitialPlay = exports.gameIsActive = exports.playIsScoring = undefined;

var _playTypes = require('../../constants/play-types');

var playTypes = _interopRequireWildcard(_playTypes);

var _game = require('../../constants/game');

var gameConstants = _interopRequireWildcard(_game);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var playIsScoring = exports.playIsScoring = function playIsScoring(play) {
  switch (play.base.type) {
    case playTypes.TYPE_CONVERSION:
      return true;
    case playTypes.TYPE_RUSH:
    case playTypes.TYPE_PASS:
      return !play.base.noPlay;
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
      noPlay: false
    },
    points: {
      rush: 0,
      def: 0,
      pass: 0
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

var yfd = exports.yfd = function yfd(down, yards) {
  return toOrdinal(down) + ' & ' + (yards < 10 ? 'Goal' : yards);
};