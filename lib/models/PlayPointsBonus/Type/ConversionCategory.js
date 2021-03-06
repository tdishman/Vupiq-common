'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-console */
var debug = require('debug')('vupiq-common:bonus-type:down');

var ConversionCategory = function (_Base) {
  _inherits(ConversionCategory, _Base);

  function ConversionCategory(variants, playPoints) {
    _classCallCheck(this, ConversionCategory);

    var _this = _possibleConstructorReturn(this, (ConversionCategory.__proto__ || Object.getPrototypeOf(ConversionCategory)).call(this, variants));

    _this.conversionCategory = playPoints.conversionCategory;
    return _this;
  }

  _createClass(ConversionCategory, [{
    key: 'isScored',
    value: function isScored(variant) {
      // eslint-disable-next-line no-console
      debug(this.conversionCategory + ' === ' + variant);
      return this.conversionCategory === variant;
    }
  }]);

  return ConversionCategory;
}(_Base3.default);

exports.default = ConversionCategory;