import BonusTypes from './Type';

export default class PlayPointsBonus {
  constructor({ metric, variants, resultFieldName }, playPoints) {
    this.instance = new BonusTypes[metric](
      variants,
      playPoints,
      resultFieldName
    );
  }

  isScored() {
    if (!this.instance) {
      // eslint-disable-next-line no-console
      console.warn('Not defined bonus metric ! Scored is false by default!');
      return false;
    }
    return this.instance.isScored();
  }

  getScoredVariants() {
    return this.instance ? this.instance.getScoredVariants() : '';
  }

  nextDetails(variant) {
    return this.instance ? this.instance.nextDetails(variant) : false;
  }

  static typeIsExists(metric) {
    return !!BonusTypes[metric];
  }
}
