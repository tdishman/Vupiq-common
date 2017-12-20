/* eslint-disable no-console */
const debug = require('debug')('vupiq-common:bonus-type:kickoff-type');
import Base from './Base';

export default class KickoffType extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.kickoffType = playPoints.kickoffType;
  }

  isScored(variant) {
// eslint-disable-next-line no-console
    debug(`${this.kickoffType} === ${variant}`);
    return this.kickoffType === variant;
  }
}
