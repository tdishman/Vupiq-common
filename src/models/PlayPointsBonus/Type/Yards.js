import Base from './Base';

export default class Yards extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.yards = playPoints.yardsGained;
  }

  isScored(variantKey) {
    let scored = false;
    let variant = this.variants[variantKey];
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
