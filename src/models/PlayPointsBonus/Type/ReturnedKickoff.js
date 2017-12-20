/* eslint-disable no-console */
const debug = require('debug')('vupiq-common:bonus-type:returned-kickoff');
import Base from './Base';

export default class ReturnedKickoff extends Base {
  constructor(variants, playPoints) {
    super(variants);
    if (playPoints.locationYardline < 25 && playPoints.territoryOfPossesion) {
      this.returnedKickoff = 'inside25';
    }
    else if (playPoints.locationYardline >= 25) {
      this.returnedKickoff = '25orBeyond';
    }
  }

  isScored(variant) {
// eslint-disable-next-line no-console
    debug(`${this.returnedKickoff} === ${variant}`);
    return this.returnedKickoff === variant;
  }
}
