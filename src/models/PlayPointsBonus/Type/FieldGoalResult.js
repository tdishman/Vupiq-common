/* eslint-disable no-console */
const debug = require('debug')('vupiq-common:bonus-type:field-goal-result');
import Base from './Base';

export default class FieldGoalResult extends Base {
  constructor(variants, playPoints) {
    super(variants);
    if (playPoints.fieldGoalFake) {
      this.value = 'fieldGoalFake';
    }
    else {
      this.value = playPoints.fieldGoalMissed ? 'made' : 'missed';
    }
  }

  isScored(variant) {
// eslint-disable-next-line no-console
    debug(`${this.value} === ${variant}`);
    return this.value === variant;
  }
}
