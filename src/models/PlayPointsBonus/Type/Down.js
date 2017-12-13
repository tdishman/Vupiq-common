/* eslint-disable no-console */
import Base from './Base';

export default class Down extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.downType = playPoints.downType;
  }

  isScored(variant) {
    return this.downType === variant;
  }
}
