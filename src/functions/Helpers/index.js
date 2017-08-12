import * as playTypes from '../../constants/play-types';
import * as gameConstants from '../../constants/game';

export const playIsScoring = play => [playTypes.TYPE_RUSH, playTypes.TYPE_PASS].indexOf(play.base.type) > -1;

export const gameIsActive = game => [gameConstants.INPROGRESS, gameConstants.HALFTIME].indexOf(game.info.status) > -1;
