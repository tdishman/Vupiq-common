let Base = require('../../../../src/models/PlayPointsBonus/Type/Base').default;
let Yards = require('../../../../src/models/PlayPointsBonus/Type/Yards').default;
let common = require('../../../common');

describe('Base PlayPointsBonus Type ', () => {
  describe('nextDetails method ', () => {
    it('variant is have details', () => {
      let typeInstance = new Base({'obe': {details: {}}});
      assert.deepEqual(typeInstance.nextDetails('obe'), {});
    });
    it('variant is not have details', () => {
      let typeInstance = new Base({'obe': {details: {}}});
      assert.equal(typeInstance.nextDetails('none'), null);
    });
  });
  describe('getScoredVariants method ', () => {
    it('variant is have details', () => {
      let variants = {
        'long': {
          'min': 5,
          'order': 1
        },
        'short': {
          'max': 5,
          'order': 0
        }
      };
      let typeInstance = new Yards(variants, {yardsGained: 10, attYardsGained: 1});
      assert.deepEqual(typeInstance.getScoredVariants(), [ 'long', 'short' ]);
      typeInstance = new Yards(variants, {yardsGained: 1, attYardsGained: 10});
      assert.deepEqual(typeInstance.getScoredVariants(), [ 'long', 'short' ]);
    });
  });
});
