import BonusTypes from './Type';

export default class PlayPointsBonus {
  constructor({metric, variants}, playPoints) {
    this.instance = new BonusTypes[metric](variants, playPoints);
  }

  isScored() {
    if (!this.instance) {
      // eslint-disable-next-line no-console
      console.warn('Not defined bonus metric ! Scored is false by default!');
      return false;
    }
    return this.instance.isScored();
  }

  scoredPoints(variantKey) {
    return this.instance ? this.instance.scoredPoints(variantKey) : 0;
  }

  getScoredVariant() {
    return this.instance ? this.instance.getScoredVariant() : '';
  }

  static typeIsExists(metric) {
    return !!BonusTypes[metric];
  }
}
