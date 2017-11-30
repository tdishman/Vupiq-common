import Base from './Base';

export default class Yards extends Base {
  constructor(variants, variantKey, playPoints) {
    super(variants, variantKey);
    this.yards = playPoints.yardsGained;
  }

  isScored() {
    let scored = false;
    let variant = this.variants[this.variantKey];
    let maxIsPresent = variant.max !== null && variant.max !== undefined;
    let minIsPresent = variant.min !== null && variant.min !== undefined;

    if (maxIsPresent && minIsPresent) {
      scored = this.yards >= variant.min && this.yards <= variant.max;
    }
    else if (maxIsPresent) {
      scored = this.yards <= variant.max;
    }
    else if (minIsPresent) {
      scored = this.yards >= variant.min;
    }
    return scored;
  }
}
