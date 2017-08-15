import * as playTypes from '../../constants/play-types';
import * as gameConstants from '../../constants/game';

export const playIsScoring = play => [playTypes.TYPE_RUSH, playTypes.TYPE_PASS].indexOf(play.base.type) > -1;

export const gameIsActive = game => [gameConstants.INPROGRESS, gameConstants.HALFTIME].indexOf(game.info.status) > -1;

export const toOrdinal = value => {
  if ([11, 12, 13].indexOf(value % 100) > -1) {
    return value + 'th';
  }
  else {
    return (
      value +
      ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][value % 10]
    );
  }
};

export const yfd = (down, yards) => {
  return `${toOrdinal(down)} & ${yards}`;
};
