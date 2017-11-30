import Base from './Base';

export default class Result extends Base {
  constructor(variants, variantKey, playPoints) {
    super(variants, variantKey);
    this.complete = playPoints.complete ? 'complete' : 'incomplete';
  }

  isScored() {
    return this.complete === this.variantKey;
  }
}
