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

export const getScoredPickVariants = (play, points, playBonusesSystem) => {
  let pickVariants = {};
  let playTypeBonuses = playBonusesSystem[play.base.type];
  let basePick = 'variant__' + play.base.type;
  let complexPick = [];
  let complexVariantPoints = 0;
  pickVariants[basePick] = playTypeBonuses ? playTypeBonuses.points : 0;

  // Validate risk picks
  for (let i = 0; i < playTypeBonuses.details.length; i++) {
    let detail = playTypeBonuses.details[i];

    if (PlayPointsBonus.typeIsExists(detail.metric)) {
      let playPointsBonus = new PlayPointsBonus(detail, points);
      let scoredVariant = playPointsBonus.getScoredVariant();
      complexPick.push(scoredVariant);
      complexVariantPoints += playPointsBonus.scoredPoints(scoredVariant);
    }
    else {
      break;
    }
  }

  if (complexPick.length > 1) {
    pickVariants[basePick + '__' + complexPick.join('__')] = complexVariantPoints + pickVariants[basePick];
  }

  return pickVariants;
};
