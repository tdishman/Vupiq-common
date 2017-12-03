export default class Base {
  constructor(variants) {
    this.variants = variants;
  }

  isScored() {
    return false;
  }

  getScoredVariant() {
    let variant = '';
    let variantsKeys = Object.keys(this.variants);
    for (let i = 0; i < variantsKeys.length; i++) {
      variant = variantsKeys[i];
      if (this.isScored(variantsKeys[i])) {
        break;
      }
    }
    return variant;
  }

  scoredPoints(variantKey) {
    return this.variants[variantKey].points || 0;
  }
}
