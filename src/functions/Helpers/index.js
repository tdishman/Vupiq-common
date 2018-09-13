import * as playTypes from '../../constants/play-types';
import * as cardStatuses from '../../constants/card-statuses';
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

export const gameIsActive = game => {
  return (
    [gameConstants.INPROGRESS, gameConstants.HALFTIME].indexOf(
      game.info.status
    ) > -1
  );
};

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
  } else {
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
  } else {
    for (let i = 0; i < sortedBets.length; i++) {
      let bet = sortedBets[i];
      let latency = bet.latency || 0;
      let betBeforePlayStarted =
        latency > 0
          ? bet.createdAt <= playStartedAt + latency
          : bet.createdAt + latency <= playStartedAt;

      if (betBeforePlayStarted) {
        if (
          (bet.position && bet.position !== 'none') ||
          (!!bet.bonus &&
            (bet.bonus !== 'none' &&
              bet.bonus !== 'none__none' &&
              bet.bonus !== 'none__none__none'))
        ) {
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
  return ((milliseconds / 1000) | 0) * 1000;
};

export const betIsCreatedBeforePlayStarted = (bet, playStartedAt) => {
  return bet.latency > 0
    ? bet.createdAt <= playStartedAt + bet.latency
    : bet.createdAt + bet.latency <= playStartedAt;
};

export const getBetPoints = (play, bet, playersCards = []) => {
  let playStartedAtValid =
    (play.startedAt || 0) + (bet.latency > 0 ? bet.latency : 0);
  let playersCardsPoints = 0;

  if (playStartedAtValid > 0) {
    for (let i = 0; i < playersCards.length; i++) {
      playersCardsPoints =
        playersCardsPoints +
        ((play.points.playersBonuses || {})[playersCards[i]] || 0);
    }
    let betPoints = play.points
      ? {
          pos: play.points[bet.position] || 0,
          playersCardsPoints: playersCardsPoints || 0,
          bonus: play.points.bonuses ? play.points.bonuses[bet.bonus] || 0 : 0
        }
      : { pos: 0, bonus: 0, playersCardsPoints: 0 };
    betPoints.total =
      betPoints.pos + betPoints.bonus + betPoints.playersCardsPoints;
    return betPoints;
  }

  return null;
};

export const shouldProcessPoints = play => {
  return play.endedAt > 0 && playIsScoring(play);
};

export const getScoredBonusesVariants = (
  playType,
  points,
  playBonusesSystem
) => {
  let pickVariants = {};
  let playTypeBonuses = playBonusesSystem[playType];
  let basePick = playType;
  let details = playTypeBonuses.details;
  let nonScoredVariants = {};
  let formation = playBonusesSystem.formations.filter(
    formation => formation.playTypes[playType]
  )[0];

  if (formation && !playBonusesSystem.strict) {
    delete formation.playTypes[playType];
    let formationPlayTypes = Object.keys(formation.playTypes);
    formationPlayTypes.forEach(formationPlayType => {
      let fPlayTypeBonuses = playBonusesSystem[formationPlayType];
      let fPlayTypeBonusesDetails = fPlayTypeBonuses.details;
      let fNonScoredVariants = {};
      fNonScoredVariants[formationPlayType] = true;
      for (let i = 0; i < fPlayTypeBonusesDetails.length; i++) {
        let detail = fPlayTypeBonusesDetails[i];
        if (PlayPointsBonus.typeIsExists(detail.metric)) {
          let pickVariantsKeys = Object.keys(fNonScoredVariants);
          let allVariantsKeys = Object.keys(detail.variants);
          for (let j = 0; j < allVariantsKeys.length; j++) {
            let variant = allVariantsKeys[j];
            for (let k = 0; k < pickVariantsKeys.length; k++) {
              if (pickVariantsKeys[k].split('__').length + 1 === i + 2) {
                if (!detail.additional) {
                  fNonScoredVariants[pickVariantsKeys[k] + '__none'] = true;
                  fNonScoredVariants[
                    pickVariantsKeys[k] + '__' + variant
                  ] = true;
                }
              }
            }
          }
        } else {
          break;
        }
      }
      delete fNonScoredVariants[formationPlayType];
      nonScoredVariants = Object.assign(nonScoredVariants, fNonScoredVariants);
    });
  }

  pickVariants[basePick] = playTypeBonuses
    ? playTypeBonuses.points[basePick] || 0
    : 0;

  // Fill base pick variant with none additional options
  if (!playTypeBonuses.disabledSkip) {
    if (details.length > 1) {
      let prevPickVariant = basePick;
      for (let i = 0; i < details.length; i++) {
        prevPickVariant = prevPickVariant + '__none';
        pickVariants[prevPickVariant] = playTypeBonuses
          ? playTypeBonuses.points[basePick] || 0
          : 0;
      }
    }
  }

  for (let i = 0; i < details.length; i++) {
    let detail = details[i];
    if (PlayPointsBonus.typeIsExists(detail.metric)) {
      let playPointsBonus = new PlayPointsBonus(detail, points);
      let scoredVariants = playPointsBonus.getScoredVariants();
      let pickVariantsKeys = Object.keys(pickVariants);
      let allVariantsKeys = Object.keys(detail.variants);

      for (let j = 0; j < scoredVariants.length; j++) {
        let scoredVariant = scoredVariants[j];
        for (let k = 0; k < pickVariantsKeys.length; k++) {
          let complexPickKey = pickVariantsKeys[k] + '__' + scoredVariant;
          let variant = complexPickKey.split('__');
          if (variant.length === i + 2) {
            pickVariants[complexPickKey] =
              playTypeBonuses.points[complexPickKey] || 0;
            if (!playTypeBonuses.disabledSkip) {
              if (variant.length > 2) {
                let skippedVariant = [].concat(variant);
                skippedVariant[1] = 'none';
                complexPickKey = skippedVariant.join('__');
                pickVariants[complexPickKey] =
                  playTypeBonuses.points[complexPickKey] || 0;

                skippedVariant[0] = 'none';
                complexPickKey = skippedVariant.join('__');
                pickVariants[complexPickKey] =
                  playTypeBonuses.points[complexPickKey] || 0;
              }
            }
          }
        }
      }

      for (let j = 0; j < allVariantsKeys.length; j++) {
        let variant = allVariantsKeys[j];
        let scoredVariant = scoredVariants[scoredVariants.indexOf(variant)];
        for (let k = 0; k < pickVariantsKeys.length; k++) {
          if (pickVariantsKeys[k].split('__').length + 1 === i + 2) {
            if (scoredVariant) {
              let complexPickKey = pickVariantsKeys[k] + '__' + scoredVariant;
              pickVariants[complexPickKey] =
                pickVariants[complexPickKey] > 0
                  ? pickVariants[complexPickKey]
                  : playTypeBonuses.points[pickVariantsKeys[k]] || 0;
              if (!playBonusesSystem.strict && detail.additional) {
                Object.keys(nonScoredVariants).forEach(key => {
                  let pointsKey = scoredVariant;
                  for (let m = 0; m < i + 1; m++) {
                    pointsKey = 'none__' + pointsKey;
                  }
                  pickVariants[key + '__' + scoredVariant] =
                    playTypeBonuses.points[pointsKey] || 0;
                });
              }
            } else {
              if (!detail.additional) {
                nonScoredVariants[pickVariantsKeys[k] + '__' + variant] = true;
              } else if (!playBonusesSystem.strict) {
                let complexPickKey = pickVariantsKeys[k] + '__' + variant;
                pickVariants[complexPickKey] =
                  playTypeBonuses.points[pickVariantsKeys[k]] || 0;
              }
            }
          }
        }
      }
    } else {
      break;
    }
  }
  debug(JSON.stringify(pickVariants));
  return pickVariants;
};

export const getScoredPlayersVariants = (playStatistics, playBonusesSystem) => {
  let pickVariants = {};
  let playersStatusesPoints = playBonusesSystem.playersStatusesPoints || {};
  let statuses = Object.values(cardStatuses);

  for (let i = 0, j = playStatistics.length; i < j; i++) {
    if (playStatistics[i].player) {
      for (let k = 0, m = statuses.length; k < m; k++) {
        pickVariants[`${playStatistics[i].player.id}__${statuses[k]}`] =
          playersStatusesPoints[statuses[k]] || 0;
      }
    }
  }

  debug(JSON.stringify(pickVariants));
  return pickVariants;
};
