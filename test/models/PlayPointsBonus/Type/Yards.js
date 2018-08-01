let Yards = require('../../../../src/models/PlayPointsBonus/Type/Yards.js')
  .default;
let common = require('../../../common');
let typeInstance = null;

describe('ConversionCategory PlayPointsBonus Type ', () => {
  describe('checkVariant method ', () => {
    it('variant is long', () => {
      let variants = {
        long: {
          min: 5,
          order: 1
        },
        short: {
          max: 5,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 10,
        attYardsGained: 12
      });
      assert.equal(typeInstance.checkVariant(10, 'long'), true);
      assert.equal(typeInstance.checkVariant(10, 'short'), false);
    });
    it('variant is long and short', () => {
      let variants = {
        long: {
          min: 5,
          order: 1
        },
        short: {
          max: 5,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 10,
        attYardsGained: 12
      });
      assert.equal(typeInstance.checkVariant(5, 'long'), true);
      assert.equal(typeInstance.checkVariant(5, 'short'), true);
    });
    it('variant is short', () => {
      let variants = {
        long: {
          min: 5,
          order: 1
        },
        short: {
          max: 5,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 10,
        attYardsGained: 12
      });
      assert.equal(typeInstance.checkVariant(1, 'short'), true);
      assert.equal(typeInstance.checkVariant(1, 'long'), false);
    });
  });
  describe('isScored method ', () => {
    it('yardsGained is present', () => {
      let variants = {
        long: {
          min: 5,
          order: 1
        },
        short: {
          max: 5,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 10,
        attYardsGained: 1
      });
      assert.equal(typeInstance.isScored('long'), true);
    });
    it('yardsGained and attYardsGained is present', () => {
      let variants = {
        long: {
          min: 5,
          order: 1
        },
        short: {
          max: 5,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 10,
        attYardsGained: 1
      });
      assert.equal(typeInstance.isScored('long'), true);
    });
    it('yardsGained is not scored and attYardsGained is present and scored', () => {
      let variants = {
        long: {
          min: 5,
          order: 1
        },
        short: {
          max: 5,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 1,
        attYardsGained: 10
      });
      assert.equal(typeInstance.isScored('long'), true);
    });
    it('yardsGained and attYardsGained is missed', () => {
      let variants = {
        long: {
          min: 5,
          order: 1
        },
        short: {
          max: 5,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: null,
        attYardsGained: null
      });
      assert.equal(typeInstance.isScored('long'), false);
    });
    it('<15 && !completed', () => {
      let variants = {
        long: {
          min: 15,
          order: 1
        },
        short: {
          max: 15,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        attYardsGained: 5
      });
      assert.equal(typeInstance.isScored('long'), false);
      assert.equal(typeInstance.isScored('short'), true);
    });
    it('<15 && completed', () => {
      let variants = {
        long: {
          min: 15,
          order: 1
        },
        short: {
          max: 15,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 7,
        attYardsGained: 5
      });
      assert.equal(typeInstance.isScored('long'), false);
      assert.equal(typeInstance.isScored('short'), true);
    });
    it('15 && !completed', () => {
      let variants = {
        long: {
          min: 15,
          order: 1
        },
        short: {
          max: 15,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        attYardsGained: 15
      });
      assert.equal(typeInstance.isScored('long'), true);
      assert.equal(typeInstance.isScored('short'), true);
    });
    it('15 && completed', () => {
      let variants = {
        long: {
          min: 15,
          order: 1
        },
        short: {
          max: 15,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 4,
        attYardsGained: 15
      });
      assert.equal(typeInstance.isScored('long'), true);
      assert.equal(typeInstance.isScored('short'), true);
    });
    it('>15 && completed', () => {
      let variants = {
        long: {
          min: 15,
          order: 1
        },
        short: {
          max: 15,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 4,
        attYardsGained: 16
      });
      assert.equal(typeInstance.isScored('long'), true);
      assert.equal(typeInstance.isScored('short'), true);
    });
    it('>15 && !completed', () => {
      let variants = {
        long: {
          min: 15,
          order: 1
        },
        short: {
          max: 15,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        attYardsGained: 10
      });
      assert.equal(typeInstance.isScored('long'), false);
      assert.equal(typeInstance.isScored('short'), true);
    });
    it('>15 && !completed', () => {
      let variants = {
        long: {
          min: 15,
          order: 1
        },
        short: {
          max: 15,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        attYardsGained: 16
      });
      assert.equal(typeInstance.isScored('long'), true);
      assert.equal(typeInstance.isScored('short'), false);
    });
    it('>15 && completed', () => {
      let variants = {
        long: {
          min: 15,
          order: 1
        },
        short: {
          max: 15,
          order: 0
        }
      };
      typeInstance = new Yards(variants, {
        yardsGained: 16,
        attYardsGained: 20
      });
      assert.equal(typeInstance.isScored('long'), true);
      assert.equal(typeInstance.isScored('short'), false);
    });
  });
});
