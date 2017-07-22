'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = exports.playTypes = undefined;

var _playTypes = require('./play-types');

var playTypes = _interopRequireWildcard(_playTypes);

var _game = require('./game');

var game = _interopRequireWildcard(_game);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.playTypes = playTypes;
exports.game = game;