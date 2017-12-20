/* eslint-disable no-console */
const debug = require('debug')('vupiq-common:bonus-type:punt-result');
import Base from './Base';

export default class PuntResult extends Base {
  constructor(variants, playPoints) {
    super(variants);
    if (playPoints.puntFake) {
      this.value = 'fake';
    }
    else {
      this.value = !playPoints.puntBlocked ? 'successful' : 'blocked';
    }
  }

  isScored(variant) {
// eslint-disable-next-line no-console
    debug(`${this.value} === ${variant}`);
    return this.value === variant;
  }
}
