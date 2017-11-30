/* eslint-disable no-console */
import Base from './Base';

export default class Direction extends Base {
  constructor(variants, variantKey, playPoints) {
    super(variants, variantKey);
    this.direction = playPoints.direction;
  }

  isScored() {
    return (this.direction || '').indexOf(this.variantKey) > -1;
  }
}
