/* eslint-disable no-console */
const debug = require('debug')('vupiq-common:bonus-type:down');
import Base from './Base';

export default class ConversionResult extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.result = !playPoints.conversionComplete ? 'failed' : 'success';
  }

  isScored(variant) {
    // eslint-disable-next-line no-console
    debug(`${this.result} === ${variant}`);
    return this.result === variant;
  }
}
