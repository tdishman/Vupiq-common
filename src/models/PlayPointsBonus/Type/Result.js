import Base from './Base';

export default class Result extends Base {
  constructor(variants, playPoints) {
    super(variants);
    this.complete = playPoints.complete ? 'complete' : 'incomplete';
  }

  isScored(variant) {
    return this.complete === (variant);
  }
}
