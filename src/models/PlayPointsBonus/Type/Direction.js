/* eslint-disable no-console */
import Base from './Base';

export default class Direction extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.direction = playPoints.direction;
  }

  isScored(variant) {
    return (this.direction || '').indexOf(variant) > -1;
  }
}
