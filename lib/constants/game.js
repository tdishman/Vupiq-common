'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var INPROGRESS = exports.INPROGRESS = 'inprogress';
var HALFTIME = exports.HALFTIME = 'half-time';

// TODO: NEED decide when set this statuses
var COMPLETE = exports.COMPLETE = 'complete';
var CANCELLED = exports.CANCELLED = 'cancelled';
var SCHEDULED = exports.SCHEDULED = 'scheduled';

var OVERTIME_PHASE = exports.OVERTIME_PHASE = 'OVERTIME';
var INPROGRESS_PHASES = exports.INPROGRESS_PHASES = ['QUARTER 1', 'QUARTER 2', 'QUARTER 3', 'QUARTER 4', OVERTIME_PHASE];
var HALFTIME_PHASES = exports.HALFTIME_PHASES = ['HALFTIME'];
var PREGAME_PHASES = exports.PREGAME_PHASES = ['PREGAME']; // TODO: SHOULD BE IS - SCHEDULED or INPROGRESS game status ?!


var SHARED_GROUP_CODE = exports.SHARED_GROUP_CODE = 'SHARED';
var TRIGGER_CREATE_NEW_GROUP = exports.TRIGGER_CREATE_NEW_GROUP = 'CREATE_NEW';

var SEASON_PRE = exports.SEASON_PRE = 'pre';
var SEASON_REG = exports.SEASON_REG = 'reg';
var SEASON_PST = exports.SEASON_PST = 'pst';