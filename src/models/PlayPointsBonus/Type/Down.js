/* eslint-disable no-console */
const debug = require('debug')('vupiq-common:bonus-type:down');
import Base from './Base';

export default class Down extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.downType = playPoints.downType;
  }

  isScored(variant) {
// eslint-disable-next-line no-console
    debug(`${this.downType} === ${variant}`);
    if (!variant || variant === 'none') {
      return false;
    }
    return this.downType.indexOf(variant) > -1;
  }
}
