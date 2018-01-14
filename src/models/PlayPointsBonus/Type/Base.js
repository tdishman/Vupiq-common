export default class Base {
  constructor(variants) {
    this.variants = variants;
  }

  isScored() {
    return false;
  }

  nextDetails(variant) {
    return this.variants[variant] ? this.variants[variant].details : null;
  }

  getScoredVariants() {
    let scoredVariants = [];
    let variantsKeys = Object.keys(this.variants);
    for (let i = 0; i < variantsKeys.length; i++) {
      if (this.isScored(variantsKeys[i])) {
        scoredVariants.push(variantsKeys[i]);
      }
    }
    return scoredVariants;
  }
}
