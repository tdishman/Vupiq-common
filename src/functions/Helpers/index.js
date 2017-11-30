import * as playTypes from '../../constants/play-types';
import * as gameConstants from '../../constants/game';
import PlayPointsBonus from '../../models/PlayPointsBonus';

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
  return (milliseconds / 1000 | 0) * 1000;
};

export const betIsCreatedBeforePlayStarted = (bet, playStartedAt) => {
  return bet.latency > 0 ? bet.createdAt <= (playStartedAt + bet.latency) : (bet.createdAt + bet.latency) <= playStartedAt;
};

export const getBetPoints = (play, bet) => {
  let playStartedAtValid = (play.startedAt || 0) + (bet.latency > 0 ? bet.latency : 0);

  if (play.points && playStartedAtValid > 0 && playStartedAtValid <= Date.now()) {
    return { points: play.points, pos: play.points[bet.position] || 0 };
  }

  return null;
};

export const shouldProcessPoints = play => {
  return play.endedAt > 0 &&
  play.base.type === playTypes.TYPE_CONVERSION ||
  play.base.type === playTypes.TYPE_PASS ||
  play.base.type === playTypes.TYPE_RUSH;
};

// DO NOT USE WHILE THIS COMMENT EXISTS
export const extractBetPoints = (play, points, playBonusesSystem, bet) => {
  let betPoints = points[bet.playType.toLowerCase()] || 0;
  let playTypeBonuses = playBonusesSystem[bet.playType];
  let betPlayTypeIsScored = bet.playType === play.base.type;

  if (bet.playDetail_0 && betPlayTypeIsScored) {
    let detailsScored = false;
    let playTypeBonusesDetails = [];
    // Validate risk picks
    for (let i = 0; i < playTypeBonuses.details.length; i++) {
      let detail = playTypeBonuses.details[i];

      if (!bet['playDetail_' + i]) {
        break;
      }

      if (PlayPointsBonus.typeIsExists(detail.metric)) {
        playTypeBonusesDetails[i] = new PlayPointsBonus(detail, points, bet['playDetail_' + i]);
        detailsScored = playTypeBonusesDetails[i].isScored();
      }

      if (!detailsScored) {
        break;
      }
    }

    // Add extra points
    if (detailsScored) {
      betPoints += playTypeBonuses.points;
      for (let j = 0; j < playTypeBonusesDetails.length; j++) {
        let betDetailChoose = bet['playDetail_' + j];
        if (!betDetailChoose) {
          break;
        }
        betPoints += playTypeBonusesDetails.scoredPoints();
      }
    }
  }
  else if (betPlayTypeIsScored) {
    betPoints += playTypeBonuses.points;
  }
  return betPoints;
};
