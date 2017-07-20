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
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(INPROGRESS, 'INPROGRESS', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(HALFTIME, 'HALFTIME', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(COMPLETE, 'COMPLETE', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(CANCELLED, 'CANCELLED', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(SCHEDULED, 'SCHEDULED', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(OVERTIME_PHASE, 'OVERTIME_PHASE', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(INPROGRESS_PHASES, 'INPROGRESS_PHASES', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(HALFTIME_PHASES, 'HALFTIME_PHASES', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(PREGAME_PHASES, 'PREGAME_PHASES', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(SHARED_GROUP_CODE, 'SHARED_GROUP_CODE', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(TRIGGER_CREATE_NEW_GROUP, 'TRIGGER_CREATE_NEW_GROUP', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(SEASON_PRE, 'SEASON_PRE', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(SEASON_REG, 'SEASON_REG', 'src/constants/game.js');

  __REACT_HOT_LOADER__.register(SEASON_PST, 'SEASON_PST', 'src/constants/game.js');
}();

;