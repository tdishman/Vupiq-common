'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type = require('./Type');

var BonusTypes = _interopRequireWildcard(_Type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayPointsBonus = function () {
  function PlayPointsBonus(_ref, playPoints, variantKey) {
    var metric = _ref.metric,
        variants = _ref.variants;

    _classCallCheck(this, PlayPointsBonus);

    this.instance = new BonusTypes[metric](variants, variantKey, playPoints);
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
    key: 'scoredPoints',
    value: function scoredPoints() {
      return this.instance ? this.instance.scoredPoints() : 0;
    }
  }], [{
    key: 'typeIsExists',
    value: function typeIsExists(metric) {
      return !!BonusTypes[metric];
    }
  }]);

  return PlayPointsBonus;
}();

exports.default = PlayPointsBonus;