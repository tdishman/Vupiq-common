import * as playTypes from '../../constants/play-types';
import * as gameConstants from '../../constants/game';
import PlayPointsBonus from '../../models/PlayPointsBonus';
const debug = require('debug')('vupiq-common:functions:helpers');

export const playIsScoring = play => {
  switch (play.base.calculatedType || play.base.type) {
    case playTypes.TYPE_CONVERSION:
    case playTypes.TYPE_RUSH:
    case playTypes.TYPE_PASS:
    case playTypes.TYPE_KICKOFF:
    case playTypes.TYPE_EXTRA_POINT:
    case playTypes.TYPE_FIELD_GOAL:
    case playTypes.TYPE_PUNT:
      return true;
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
      description: ''
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
        if ((bet.position && bet.position !== 'none') || (!!bet.bonus && (bet.bonus !== 'none' && bet.bonus !== 'none__none' && bet.bonus !== 'none__none__none'))) {
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

  if (playStartedAtValid > 0) {
    let betPoints = play.points ? {
      pos: play.points[bet.position] || 0,
      bonus: play.points.bonuses ? play.points.bonuses[bet.bonus] || 0 : 0
    } : {pos: 0, bonus: 0};
    betPoints.total = betPoints.pos + betPoints.bonus;
    return betPoints;
  }

  return null;
};

export const shouldProcessPoints = play => {
  return play.endedAt > 0 && playIsScoring(play);
};

export const getScoredBonusesVariants = (playType, points, playBonusesSystem) => {
  let pickVariants = {};
  let playTypeBonuses = playBonusesSystem[playType];
  let basePick = playType;
  pickVariants[basePick] = playTypeBonuses ? playTypeBonuses.points[basePick] || 0 : 0;
  let details = playTypeBonuses.details;

  // Recursive details processing
  processDetails(pickVariants, details, basePick, points, playTypeBonuses);

  if (!playTypeBonuses.disabledSkip) {
    let variants = Object.keys(pickVariants);
    for (let i = 0; i < variants.length; i++) {
      let variant = variants[i].split('__');
      if (variant.length > 2) {
        let skippedVariant = [].concat(variant);
        skippedVariant[1] = 'none';
        let complexPickKey = skippedVariant.join('__');
        pickVariants[complexPickKey] = playTypeBonuses.points[complexPickKey] || 0;

        skippedVariant[0] = 'none';
        complexPickKey = skippedVariant.join('__');
        pickVariants[complexPickKey] = playTypeBonuses.points[complexPickKey] || 0;
      }
    }
  }

  debug(JSON.stringify(pickVariants));
  return pickVariants;
};

export const processDetails = (pickVariants, details, basePick, points, playTypeBonuses) => {
  for (let i = 0; i < details.length; i++) {
    let detail = details[i];
    if (PlayPointsBonus.typeIsExists(detail.metric)) {
      let playPointsBonus = new PlayPointsBonus(detail, points);
      let scoredVariants = playPointsBonus.getScoredVariants();
      let pickVariantsKeys = Object.keys(pickVariants);
      for (var j = 0; j < scoredVariants.length; j++) {
        var scoredVariant = scoredVariants[j];
        for (var k = 0; k < pickVariantsKeys.length; k++) {
          var complexPickKey = pickVariantsKeys[k] + '__' + scoredVariant;
          pickVariants[complexPickKey] = playTypeBonuses.points[complexPickKey] || 0;
        }
      }
    }
    else {
      break;
    }
  }
};
