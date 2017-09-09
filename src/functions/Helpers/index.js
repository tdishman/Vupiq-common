import * as playTypes from '../../constants/play-types';
import * as gameConstants from '../../constants/game';

export const playIsScoring = play => {
  switch (play.base.type) {
    case playTypes.TYPE_CONVERSION:
      return true;
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
    },
    points: {
      rush: 0,
      def: 0,
      pass: 0
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

export const yfd = (down, yards, isSameTeam) => {
  return `${toOrdinal(down)} & ${yards < 10 && !isSameTeam ? 'Goal' : yards}`;
};

export const findActualBetForPlay = (bets, play, prevPlay) => {
  let actualBet = null;
  const sortedBets = bets.sort((betA, betB) => betB.createdAt - betA.createdAt);

  for (let i = 0; i < sortedBets.length; i++) {
    let bet = sortedBets[i];
    if (bet.latency) {
      let betBeforePlayStarted = bet.createdAt <= (((play.startedAt || 0) + bet.latency) * 1000);
      if (!prevPlay) {
        if (betBeforePlayStarted) {
          actualBet = bet;
          break;
        }
      }
      else {
        let betAfterPrevPlayStarted = bet.createdAt > (((prevPlay.startedAt || 0) + bet.latency) * 1000);
        if (betAfterPrevPlayStarted && betBeforePlayStarted) {
          actualBet = bet;
          break;
        }
      }
    }
  }
  return actualBet;
};
