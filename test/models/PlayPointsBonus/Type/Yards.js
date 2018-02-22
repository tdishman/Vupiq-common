let Yards = require('../../../../src/models/PlayPointsBonus/Type/Yards.js').default;
let common = require('../../../common');
let typeInstance = null;

describe('ConversionCategory PlayPointsBonus Type ', () => {
  describe('checkVariant method ', () => {
    it('variant is long', () => {
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
      typeInstance = new Yards(variants, {yardsGained: 10, attYardsGained: 12});
      assert.equal(typeInstance.checkVariant(10, 'long'), true);
      assert.equal(typeInstance.checkVariant(10, 'short'), false);
    });
    it('variant is long and short', () => {
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
      typeInstance = new Yards(variants, {yardsGained: 10, attYardsGained: 12});
      assert.equal(typeInstance.checkVariant(5, 'long'), true);
      assert.equal(typeInstance.checkVariant(5, 'short'), true);
    });
    it('variant is short', () => {
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
      typeInstance = new Yards(variants, {yardsGained: 10, attYardsGained: 12});
      assert.equal(typeInstance.checkVariant(1, 'short'), true);
      assert.equal(typeInstance.checkVariant(1, 'long'), false);
    });
  });
  describe('isScored method ', () => {
    it('yardsGained is present', () => {
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
      typeInstance = new Yards(variants, {yardsGained: 10, attYardsGained: 1});
      assert.equal(typeInstance.isScored('long'), true);
    });
    it('yardsGained and attYardsGained is present', () => {
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
      typeInstance = new Yards(variants, {yardsGained: 10, attYardsGained: 1});
      assert.equal(typeInstance.isScored('long'), true);
    });
    it('yardsGained is not scored and attYardsGained is present and scored', () => {
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
      typeInstance = new Yards(variants, {yardsGained: 1, attYardsGained: 10});
      assert.equal(typeInstance.isScored('long'), true);
    });
    it('yardsGained and attYardsGained is missed', () => {
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
      typeInstance = new Yards(variants, {yardsGained: null, attYardsGained: null});
      assert.equal(typeInstance.isScored('long'), false);
    });
  });
});
