'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type = require('./Type');

var _Type2 = _interopRequireDefault(_Type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayPointsBonus = function () {
  function PlayPointsBonus(_ref, playPoints) {
    var metric = _ref.metric,
        variants = _ref.variants,
        resultFieldName = _ref.resultFieldName;

    _classCallCheck(this, PlayPointsBonus);

    this.instance = new _Type2.default[metric](variants, playPoints, resultFieldName);
  }

  _createClass(PlayPointsBonus, [{
    key: 'isScored',
    value: function isScored() {
      if (!this.instance) {
        // eslint-disable-next-line no-console
        console.warn('Not defined bonus metric ! Scored is false by default!');
        return false;
      }
      return this.instance.isScored();
    }
  }, {
    key: 'getScoredVariants',
    value: function getScoredVariants() {
      return this.instance ? this.instance.getScoredVariants() : '';
    }
  }, {
    key: 'nextDetails',
    value: function nextDetails(variant) {
      return this.instance ? this.instance.nextDetails(variant) : false;
    }
  }], [{
    key: 'typeIsExists',
    value: function typeIsExists(metric) {
      return !!_Type2.default[metric];
    }
  }]);

  return PlayPointsBonus;
}();

exports.default = PlayPointsBonus;