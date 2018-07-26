/* eslint-disable no-console */
const debug = require('debug')('vupiq-common:bonus-type:scoring-play');
import Base from './Base';

export default class OnsideKick extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.value = playPoints.scoringPlay ? 'made' : 'missed';
  }

  isScored(variant) {
    // eslint-disable-next-line no-console
    debug(`${this.value} === ${variant}`);
    return this.value === variant;
  }
}
