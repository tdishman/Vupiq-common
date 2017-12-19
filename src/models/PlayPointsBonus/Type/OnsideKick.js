/* eslint-disable no-console */
const debug = require('debug')('vupiq-common:bonus-type:onside-kick');
import Base from './Base';

export default class OnsideKick extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.onsideKick = playPoints.onsideSuccess ? 'onsideSuccessTrue' : 'onsideSuccessFalse';
  }

  isScored(variant) {
// eslint-disable-next-line no-console
    debug(`${this.onsideKick} === ${variant}`);
    return this.onsideKick === variant;
  }
}
