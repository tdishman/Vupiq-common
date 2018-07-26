const debug = require('debug')('vupiq-common:bonus-type:result');
import Base from './Base';

export default class Result extends Base {
  constructor(variants, playPoints, resultFieldName) {
    super(variants);
    this.result = playPoints[resultFieldName] || '';
  }

  isScored(variant) {
    // eslint-disable-next-line no-console
    debug(`${this.result} === ${variant}`);
    if (!variant || variant === 'none') {
      return false;
    }
    return this.result.indexOf(variant) > -1;
  }
}
