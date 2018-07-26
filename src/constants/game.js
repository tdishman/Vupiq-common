export const INPROGRESS = 'inprogress';
export const HALFTIME = 'halftime';

// TODO: NEED decide when set this statuses
export const COMPLETE = 'complete';
export const CANCELLED = 'cancelled';
export const SCHEDULED = 'scheduled';
export const CLOSED = 'closed';

export const OVERTIME_PHASE = 'OVERTIME';
export const INPROGRESS_PHASES = [
  'QUARTER 1',
  'QUARTER 2',
  'QUARTER 3',
  'QUARTER 4',
  OVERTIME_PHASE
];
export const HALFTIME_PHASES = ['HALFTIME'];
export const PREGAME_PHASES = ['PREGAME']; // TODO: SHOULD BE IS - SCHEDULED or INPROGRESS game status ?!

export const SHARED_GROUP_CODE = 'SHARED';
export const TRIGGER_CREATE_NEW_GROUP = 'CREATE_NEW';

export const SEASON_PRE = 'pre';
export const SEASON_REG = 'reg';
export const SEASON_PST = 'pst';
