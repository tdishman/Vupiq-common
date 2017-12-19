'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base(variants) {
    _classCallCheck(this, Base);

    this.variants = variants;
  }

  _createClass(Base, [{
    key: 'isScored',
    value: function isScored() {
      return false;
    }
  }, {
    key: 'nextDetails',
    value: function nextDetails(variant) {
      return this.variants[variant].details;
    }
  }, {
    key: 'getScoredVariant',
    value: function getScoredVariant() {
      var variant = '';
      var variantsKeys = Object.keys(this.variants);
      for (var i = 0; i < variantsKeys.length; i++) {
        variant = variantsKeys[i];
        if (this.isScored(variant)) {
          break;
        }
      }
      return variant;
    }
  }]);

  return Base;
}();

exports.default = Base;