'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Sportradar play types
 * @type {string}
 */
var TYPE_PASS = exports.TYPE_PASS = 'PASS';
var TYPE_RUSH = exports.TYPE_RUSH = 'RUSH';
var TYPE_FAIRCATCH_KICK = exports.TYPE_FAIRCATCH_KICK = 'FAIRCATCH_KICK';
var TYPE_EXTRA_POINT = exports.TYPE_EXTRA_POINT = 'EXTRA_POINT';
var TYPE_CONVERSION = exports.TYPE_CONVERSION = 'CONVERSION';
var TYPE_FREE_KICK = exports.TYPE_FREE_KICK = 'FREE_KICK';
var TYPE_KICKOFF = exports.TYPE_KICKOFF = 'KICKOFF';
var TYPE_PUNT = exports.TYPE_PUNT = 'PUNT';
var TYPE_FIELD_GOAL = exports.TYPE_FIELD_GOAL = 'FIELD_GOAL';
var TYPE_PENALTY = exports.TYPE_PENALTY = 'PENALTY';
var TYPE_COMMERCIAL = exports.TYPE_COMMERCIAL = 'COMMERCIAL';

/**
 * Sportradar event types
 * @type {string}
 */
var TYPE_SETUP = exports.TYPE_SETUP = 'SETUP';
var TYPE_TIMEOUT = exports.TYPE_TIMEOUT = 'TIMEOUT';
var TYPE_COMMENT = exports.TYPE_COMMENT = 'COMMENT';
var TYPE_PERIOD_END = exports.TYPE_PERIOD_END = 'PERIOD_END';
var TYPE_GAME_OVER = exports.TYPE_GAME_OVER = 'GAME_OVER';

/**
 * Custom play types
 * @type {string}
 */
var TYPE_NONE = exports.TYPE_NONE = 'NONE';
var TYPE_SACK = exports.TYPE_SACK = 'SACK';

/**
 * Custom score types
 * @type {string}
 */
var SCORE_NONE = exports.SCORE_NONE = 'NONE';
var SCORE_OFF_TOUCHDOWN = exports.SCORE_OFF_TOUCHDOWN = 'OFF_TOUCHDOWN';
var SCORE_DEF_TOUCHDOWN = exports.SCORE_DEF_TOUCHDOWN = 'DEF_TOUCHDOWN';
var SCORE_ST_TOUCHDOWN = exports.SCORE_ST_TOUCHDOWN = 'ST_TOUCHDOWN';
var SCORE_FIELDGOAL = exports.SCORE_FIELDGOAL = 'FIELDGOAL';
var SCORE_EXTRA_POINT = exports.SCORE_EXTRA_POINT = 'EXTRA_POINT';
var SCORE_TWOPT_CONVERSION = exports.SCORE_TWOPT_CONVERSION = 'TWOPT_CONVERSION';
var SCORE_SAFETY = exports.SCORE_SAFETY = 'SAFETY';

/**
 * Custom turnover types
 * @type {string}
 */
var TURNOVER_NONE = exports.TURNOVER_NONE = 'NONE';
var TURNOVER_UNDEFINED = exports.TURNOVER_UNDEFINED = 'UNDEFINED';
var TURNOVER_FUMBLE = exports.TURNOVER_FUMBLE = 'FUMBLE';
var TURNOVER_INTERCEPTION = exports.TURNOVER_INTERCEPTION = 'INTERCEPTION';
var TURNOVER_ON_DOWNS = exports.TURNOVER_ON_DOWNS = 'ON_DOWNS';