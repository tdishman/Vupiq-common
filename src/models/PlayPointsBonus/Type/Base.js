export default class Base {
  constructor(variants, variantKey) {
    this.variants = variants;
    this.variantKey = variantKey;
  }

  isScored() {
    return false;
  }

  scoredPoints() {
    return this.variants[this.variantKey].points || 0;
  }
}
