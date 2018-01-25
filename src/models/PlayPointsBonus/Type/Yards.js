import Base from './Base';

export default class Yards extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.yardsGained = playPoints.yardsGained || playPoints.yardsGained === 0 ? playPoints.yardsGained : null;
    this.attYardsGained = playPoints.attYardsGained || playPoints.attYardsGained === 0 ? playPoints.attYardsGained : null;
  }

  isScored(variantKey) {
    let scored = false;

    if (this.yardsGained !== null) {
      scored = this.checkVariant(this.yardsGained, variantKey);
    }
    if (!scored && this.attYardsGained !== null) {
      scored = this.checkVariant(this.attYardsGained, variantKey);
    }

    return scored;
  }

  checkVariant(yardsValue, variantKey) {
    let scored = false;
    let variant = this.variants[variantKey];
    let maxIsPresent = variant.max !== null && variant.max !== undefined;
    let minIsPresent = variant.min !== null && variant.min !== undefined;

    if (maxIsPresent && minIsPresent) {
      scored = yardsValue >= variant.min && yardsValue <= variant.max;
    }
    else if (maxIsPresent) {
      scored = yardsValue <= variant.max;
    }
    else if (minIsPresent) {
      scored = yardsValue >= variant.min;
    }
    return scored;
  }
}
