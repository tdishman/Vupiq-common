export default class Base {
  constructor(variants) {
    this.variants = variants;
  }

  isScored() {
    return false;
  }

  nextDetails(variant) {
    return this.variants[variant].details;
  }

  getScoredVariant() {
    let variant = '';
    let variantsKeys = Object.keys(this.variants);
    for (let i = 0; i < variantsKeys.length; i++) {
      if (this.isScored(variantsKeys[i])) {
        variant = variantsKeys[i];
        break;
      }
    }
    return variant;
  }
}
