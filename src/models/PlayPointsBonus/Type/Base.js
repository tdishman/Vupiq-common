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
      variant = variantsKeys[i];
      if (this.isScored(variant)) {
        break;
      }
    }
    return variant;
  }
}
