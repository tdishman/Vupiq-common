import BonusTypes from './Type';

export default class PlayPointsBonus {
  constructor({metric, variants}, playPoints, variantKey) {
    this.instance = new BonusTypes[metric](variants, variantKey, playPoints);
  }

  isScored() {
    if (!this.instance) {
// eslint-disable-next-line no-console
      console.warn('Not defined bonus metric ! Scored is false by default!');
      return false;
    }
    return this.instance.isScored();
  }

  scoredPoints() {
    return this.instance ? this.instance.scoredPoints() : 0;
  }

  static typeIsExists(metric) {
    return !!BonusTypes[metric];
  }
}
