"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base(variants, variantKey) {
    _classCallCheck(this, Base);

    this.variants = variants;
    this.variantKey = variantKey;
  }

  _createClass(Base, [{
    key: "isScored",
    value: function isScored() {
      return false;
    }
  }, {
    key: "scoredPoints",
    value: function scoredPoints() {
      return this.variants[this.variantKey].points || 0;
    }
  }]);

  return Base;
}();

exports.default = Base;