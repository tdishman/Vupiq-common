/* eslint-disable no-console */
const debug = require('debug')('vupiq-common:bonus-type:down');
import Base from './Base';

export default class ConversionCategory extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.conversionCategory = playPoints.conversionCategory;
  }

  isScored(variant) {
// eslint-disable-next-line no-console
    debug(`${this.conversionCategory} === ${variant}`);
    return this.conversionCategory === variant;
  }
}
