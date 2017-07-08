exports.INPROGRESS = 'inprogress';
exports.HALFTIME = 'half-time';

// TODO: NEED decide when set this statuses
exports.COMPLETE = 'complete';
exports.CANCELLED = 'cancelled';
exports.SCHEDULED = 'scheduled';

const OVERTIME_PHASE = 'OVERTIME';
exports.OVERTIME_PHASE = OVERTIME_PHASE;
exports.INPROGRESS_PHASES = ['QUARTER 1', 'QUARTER 2', 'QUARTER 3', 'QUARTER 4', OVERTIME_PHASE];
exports.HALFTIME_PHASES = ['HALFTIME'];
exports.PREGAME_PHASES = ['PREGAME']; // TODO: SHOULD BE IS - SCHEDULED or INPROGRESS game status ?!


exports.SHARED_GROUP_CODE = 'SHARED';
exports.TRIGGER_CREATE_NEW_GROUP = 'CREATE_NEW';
