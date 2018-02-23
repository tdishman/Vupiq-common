import * as gameConstants from '../../../src/constants/game';
let playTypeBonuses = require('../../../Docs/play_bonuses');
let playTypes = require('../../../src/constants/play-types');
let {TYPE_RUSH, TYPE_TIMEOUT} = require('../../../src/constants/play-types');

let {
  playIsScoring,
  gameIsActive,
  getLatencyGroup,
  getBetPoints,
  shouldProcessPoints,
  findActualBetForPlay,
  processDetails,
  getScoredBonusesVariants,
  betIsCreatedBeforePlayStarted
} = require('../../../src/functions/Helpers');

let common = require('../../common');

describe('Helpers', () => {
  describe('playIsScoring', () => {
    it('playIsScoring when play type TYPE_CONVERSION', () => {
      let play = {base: {type: playTypes.TYPE_CONVERSION}};
      assert.equal(playIsScoring(play), true);
    });
    it('playIsScoring when play type TYPE_RUSH', () => {
      let play = {base: {type: playTypes.TYPE_RUSH}};
      assert.equal(playIsScoring(play), true);
    });
    it('playIsScoring when play type TYPE_PASS', () => {
      let play = {base: {type: playTypes.TYPE_PASS}};
      assert.equal(playIsScoring(play), true);
    });
    it('playIsScoring when play type TYPE_KICKOFF', () => {
      let play = {base: {type: playTypes.TYPE_KICKOFF}};
      assert.equal(playIsScoring(play), true);
    });
    it('playIsScoring when play type TYPE_EXTRA_POINT', () => {
      let play = {base: {type: playTypes.TYPE_EXTRA_POINT}};
      assert.equal(playIsScoring(play), true);
    });
    it('playIsScoring when play type TYPE_FIELD_GOAL', () => {
      let play = {base: {type: playTypes.TYPE_FIELD_GOAL}};
      assert.equal(playIsScoring(play), true);
    });
    it('playIsScoring when play type TYPE_PUNT', () => {
      let play = {base: {type: playTypes.TYPE_PUNT}};
      assert.equal(playIsScoring(play), true);
    });
    it('playIsScoring when play type TYPE_PUNT and calculatedType TYPE_PENALTY', () => {
      let play = {base: {calculatedType: playTypes.TYPE_PENALTY, type: playTypes.TYPE_PASS}};
      assert.equal(playIsScoring(play), false);
    });
    it('playIsScoring when play type is not scoring', () => {
      let play = {base: {type: playTypes.TYPE_PENALTY}};
      assert.equal(playIsScoring(play), false);
    });
  });
  describe('gameIsActive', () => {
    it('gameIsActive when game status INPROGRESS', () => {
      let game = {info: {status: gameConstants.INPROGRESS}};
      assert.equal(gameIsActive(game), true);
    });
    it('gameIsActive when game status INPROGRESS', () => {
      let game = {info: {status: gameConstants.HALFTIME}};
      assert.equal(gameIsActive(game), true);
    });
    it('gameIsActive when game status CLOSED', () => {
      let game = {info: {status: gameConstants.CLOSED}};
      assert.equal(gameIsActive(game), false);
    });
    it('gameIsActive when game status COMPLETE', () => {
      let game = {info: {status: gameConstants.COMPLETE}};
      assert.equal(gameIsActive(game), false);
    });
    it('gameIsActive when game status CANCELLED', () => {
      let game = {info: {status: gameConstants.CANCELLED}};
      assert.equal(gameIsActive(game), false);
    });
    it('gameIsActive when game status SCHEDULED', () => {
      let game = {info: {status: gameConstants.SCHEDULED}};
      assert.equal(gameIsActive(game), false);
    });
  });
  describe('getLatencyGroup', () => {
    it('getLatencyGroup should return rounded latency', () => {
      assert.equal(getLatencyGroup(7626), 7000);
    });
  });
  describe('getBetPoints', () => {
    it('getBetPoints should return null', () => {
      let play = {};
      let bet = {};
      assert.equal(getBetPoints(play, bet), null);
    });
    it('getBetPoints when points present', () => {
      let play = {startedAt: 1, points: {bonuses: {[TYPE_RUSH]: 2}, rush: 1}};
      let bet = {position: 'rush', bonus: TYPE_RUSH};
      assert.deepEqual(getBetPoints(play, bet), {pos: 1, bonus: 2, total: 3});
    });
    it('getBetPoints when points is not present', () => {
      let play = {startedAt: 1};
      let bet = {position: 'rush', bonus: TYPE_RUSH};
      assert.deepEqual(getBetPoints(play, bet), {pos: 0, bonus: 0, total: 0});
    });
  });
  describe('shouldProcessPoints', () => {
    it('shouldProcessPoints when play is ended and playIsScoring', () => {
      let play = {endedAt: 2315, base: {type: TYPE_RUSH}};
      assert.equal(shouldProcessPoints(play), true);
    });
    it('shouldProcessPoints when play isn`t ended and playIsScoring', () => {
      let play = {base: {type: TYPE_RUSH}};
      assert.equal(shouldProcessPoints(play), false);
    });
    it('shouldProcessPoints when play is ended but play Isn`t Scoring', () => {
      let play = {endedAt: 2315, base: {type: TYPE_TIMEOUT}};
      assert.equal(shouldProcessPoints(play), false);
    });
  });
  describe('findActualBetForPlay', () => {
    it('findActualBetForPlay when bets not present', () => {
      let play = {endedAt: 2315, base: {type: TYPE_RUSH}};
      let bets = [];
      assert.equal(findActualBetForPlay(bets, play), null);
    });
    it('findActualBetForPlay when bets only one', () => {
      let play = {endedAt: 2315, base: {type: TYPE_RUSH}};
      let bets = [{createdAt: 2300}];
      assert.equal(findActualBetForPlay(bets, play), bets[0]);
    });
    it('findActualBetForPlay when bets with no pick value', () => {
      let play = {startedAt: 2315, base: {type: TYPE_RUSH}};
      let bets = [
        {createdAt: 2302, bonus: 'none', latency: 0},
        {createdAt: 2300, position: TYPE_RUSH.toLowerCase(), bonus: TYPE_RUSH, latency: 0}];
      assert.deepEqual(findActualBetForPlay(bets, play), null);
    });
    it('findActualBetForPlay when bets present and contain actual pick', () => {
      let play = {startedAt: 2315, base: {type: TYPE_RUSH}};
      let bets = [
        {createdAt: 2302, bonus: 'none', latency: 0},
        {createdAt: 2305, position: TYPE_RUSH.toLowerCase(), bonus: TYPE_RUSH, latency: 0}];
      assert.deepEqual(findActualBetForPlay(bets, play), {
        createdAt: 2305,
        position: TYPE_RUSH.toLowerCase(),
        bonus: TYPE_RUSH,
        latency: 0
      });
    });
  });
  describe('processDetails', () => {
    it('processDetails should gen multiple variants of score picks', () => {
      let pickVariants = {[TYPE_RUSH]: 1};
      let details = [{
        'metric': 'Yards',
        'title': 'Yards',
        'variants': {
          'long': {
            'min': 5,
            'order': 1
          },
          'short': {
            'max': 5,
            'order': 0
          }
        }
      }, {
        'metric': 'Result',
        'resultFieldName': 'downType',
        'title': 'Result',
        'variants': {
          'defscore': {
            'order': 3
          },
          'firstdown': {
            'order': 0
          },
          'sack': {
            'order': 4
          },
          'safety': {
            'order': 5
          },
          'touchdown': {
            'order': 1
          },
          'turnover': {
            'order': 2
          }
        }
      }];
      let points = {
        downType: ['touchdown', 'defscore'],
        yardsGained: 5
      };
      let expectedpickVariants = {
        'RUSH': 1,
        'RUSH__long': 11,
        'RUSH__short': 5,
        'RUSH__defscore': 0,
        'RUSH__long__defscore': 41,
        'RUSH__short__defscore': 35,
        'RUSH__touchdown': 0,
        'RUSH__long__touchdown': 21,
        'RUSH__short__touchdown': 15
      };
      processDetails(pickVariants, details, '', points, playTypeBonuses[TYPE_RUSH]);
      assert.deepEqual(pickVariants, expectedpickVariants);
    });
  });
  describe('getScoredBonusesVariants', () => {
    it('getScoredBonusesVariants should gen multiple variants of score picks', () => {
      let points = {
        downType: ['touchdown', 'defscore'],
        yardsGained: 5
      };
      let expectedpickVariants = {
        'RUSH': 3,
        'RUSH__long': 11,
        'RUSH__short': 5,
        'RUSH__defscore': 0,
        'RUSH__long__defscore': 41,
        'RUSH__short__defscore': 35,
        'RUSH__touchdown': 0,
        'RUSH__long__touchdown': 21,
        'RUSH__short__touchdown': 15,
        'RUSH__none__defscore': 33,
        'none__none__defscore': 30,
        'RUSH__none__touchdown': 13,
        'none__none__touchdown': 10
      };
      assert.deepEqual(getScoredBonusesVariants(TYPE_RUSH, points, playTypeBonuses), expectedpickVariants);
    });
  });
  describe('betIsCreatedBeforePlayStarted', () => {
    it('betIsCreatedBeforePlayStarted should correct check when bet is created if latency is positive', () => {
      let bet = {latency: 2000, createdAt: 40000000};
      assert.equal(betIsCreatedBeforePlayStarted(bet, 40000000), true);
      assert.equal(betIsCreatedBeforePlayStarted(bet, 20000000), false);
    });
    it('betIsCreatedBeforePlayStarted should correct check when bet is created if latency is negative', () => {
      let bet = {latency: -2000, createdAt: 40000000};
      assert.equal(betIsCreatedBeforePlayStarted(bet, 40000000), true);
      assert.equal(betIsCreatedBeforePlayStarted(bet, 20000000), false);
    });
  });
});
