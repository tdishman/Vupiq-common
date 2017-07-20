var playTypes = require('../constants').playTypes;

const {
  TYPE_FIELDGOAL,
  TYPE_EXTRA_POINT,

  SCORE_OFF_TOUCHDOWN
} = playTypes;

exports.default = function(play) {
  const { start, end, home, away } = play;

  const possTeam = end.possession === 'home' ? home.alias : away.alias;
  const away2Absolute = location => (50 - location) + 50;
  const startLoc = start.locationAlias === away.alias ? away2Absolute(start.location) : start.location;
  const endLoc = end.locationAlias === away.alias ? away2Absolute(end.location) : end.location;

  let gained = endLoc - startLoc;

  if (play.base.scoring === SCORE_OFF_TOUCHDOWN) {
    // Offense scored from the opponent's side
    gained = start.location;

    // Offense scored a 50+ yard touchdown
    if (start.locationAlias !== possTeam) {
      gained = (50 - start.location) + 50;
    }
  }

  if (start.locationAlias === end.locationAlias) {
    switch (play.base.type) {
      case TYPE_EXTRA_POINT:
        gained = 32;
        break;

      case TYPE_FIELDGOAL:
        if (start.locationAlias === possTeam) {
          gained = (50 - start.location) + 67;
        }
        else {
          gained = start.location + 17;
        }
        break;

      default:
        break;
    }
  }



  return gained;
}
;
