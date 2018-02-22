let ConversionResult = require('../../../../src/models/PlayPointsBonus/Type/ConversionResult.js').default;
let common = require('../../../common');
let typeInstance = null;

describe('ConversionResult PlayPointsBonus Type ', () => {
  describe('isScored method ', () => {
    it('variant is missed', () => {
      typeInstance = new ConversionResult([], {conversionComplete: true});
      assert.equal(typeInstance.isScored(), false);
    });
    it('variant is equal result', () => {
      typeInstance = new ConversionResult([], {conversionComplete: true});
      assert.equal(typeInstance.isScored('success'), true);
    });
    it('variant is not equal result', () => {
      typeInstance = new ConversionResult([], {conversionComplete: false});
      assert.equal(typeInstance.isScored('success'), false);
    });
  });
});
