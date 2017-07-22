import { playTypes } from '../constants';

const {
  TYPE_FIELDGOAL,
  TYPE_EXTRA_POINT
} = playTypes;

function calcYards(play) {
  const { start, end, home, away, base } = play;

  const possTeam = end.possession === 'home' ? home.alias : away.alias;
  const away2Absolute = location => (50 - location) + 50;
  const startLoc = start.locationAlias === away.alias ? away2Absolute(start.location) : start.location;
  const endLoc = end.locationAlias === away.alias ? away2Absolute(end.location) : end.location;

  let gained = endLoc - startLoc;
  if (start.possession === away.alias
    && base.type !== playTypes.TYPE_KICKOFF
    && base.type !== playTypes.TYPE_PUNT ) {
    gained *= -1;
  }

  if (start.locationAlias === end.locationAlias) {
    switch (base.type) {
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

export default calcYards;
