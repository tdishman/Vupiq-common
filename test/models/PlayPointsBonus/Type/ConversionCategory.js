let ConversionCategory = require('../../../../src/models/PlayPointsBonus/Type/ConversionCategory.js').default;
let common = require('../../../common');
let typeInstance = null;

describe('ConversionCategory PlayPointsBonus Type ', () => {
  describe('isScored method ', () => {
    it('variant is missed', () => {
      typeInstance = new ConversionCategory([], {conversionCategory: 'test'});
      assert.equal(typeInstance.isScored(), false);
    });
    it('variant is equal conversionCategory', () => {
      typeInstance = new ConversionCategory([], {conversionCategory: 'test'});
      assert.equal(typeInstance.isScored('test'), true);
    });
    it('variant is not equal conversionCategory', () => {
      typeInstance = new ConversionCategory([], {conversionCategory: 'test'});
      assert.equal(typeInstance.isScored('success'), false);
    });
  });
});
