let Result = require('../../../../src/models/PlayPointsBonus/Type/Result').default;
let common = require('../../../common');
let typeInstance = null;

describe('Result PlayPointsBonus Type ', () => {
  describe('isScored method ', () => {
    it('variant is missed', () => {
      typeInstance = new Result([], {}, 'resultFieldName');
      assert.equal(typeInstance.isScored(), false);
    });
    it('variant is none', () => {
      typeInstance = new Result([], {}, 'resultFieldName');
      assert.equal(typeInstance.isScored('none'), false);
    });
    it('variant is present', () => {
      typeInstance = new Result([], {resultFieldName: ['test', 'test3']}, 'resultFieldName');
      assert.equal(typeInstance.isScored('test'), true);
    });
    it('variant is missed in results', () => {
      typeInstance = new Result([], {resultFieldName: ['test', 'test3']}, 'resultFieldName');
      assert.equal(typeInstance.isScored('test2'), false);
    });
  });
});
