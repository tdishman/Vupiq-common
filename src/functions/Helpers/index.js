import * as playTypes from '../../constants/play-types';
import * as gameConstants from '../../constants/game';

export const playIsScoring = play => {
  switch (play.base.type) {
    case playTypes.TYPE_CONVERSION:
    case playTypes.TYPE_RUSH:
    case playTypes.TYPE_PASS:
      return !play.base.penalty;
    default:
      return false;
  }
};

export const gameIsActive = game => [gameConstants.INPROGRESS, gameConstants.HALFTIME].indexOf(game.info.status) > -1;

export const getInitialPlay = () => {
  return {
    processed: false,
    rejected: false,
    fulfilled: false,
    merged: false,
    issued: false,
    away: {
      alias: '',
      score: 0
    },
    home: {
      alias: '',
      score: 0
    },
    base: {
      type: playTypes.TYPE_NONE,
      scoring: playTypes.SCORE_NONE,
      turnover: playTypes.TURNOVER_NONE,
      yardsGained: 0,
      description: '',
      penalty: false
    }
  };
};

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

export const findActualBetForPlay = (bets, play) => {
  let actualBet = null;
  const sortedBets = bets.sort((betA, betB) => betB.createdAt - betA.createdAt);
  let playStartedAt = play.startedAt || 0;
  if (sortedBets.length === 1) {
    actualBet = sortedBets[0];
  }
  else {
    for (let i = 0; i < sortedBets.length; i++) {
      let bet = sortedBets[i];
      let latency = bet.latency || 0;
      let betBeforePlayStarted = latency > 0 ? bet.createdAt <= (playStartedAt + latency) : bet.createdAt + latency <= playStartedAt;

      if (betBeforePlayStarted) {
        if (bet.position && bet.position !== 'none') {
          actualBet = bet;
        }
        break;
      }
    }
  }
  return actualBet;
};

export const getLatencyGroup = milliseconds => {
  milliseconds = milliseconds || 0;
  if (milliseconds <= 0) {
    return 0;
  }
  return (milliseconds / 1000 | 1000);
};
