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
var debug = require('debug')('vupiq-common:bonus-type:field-goal-result');

var FieldGoalResult = function (_Base) {
  _inherits(FieldGoalResult, _Base);

  function FieldGoalResult(variants, playPoints) {
    _classCallCheck(this, FieldGoalResult);

    var _this = _possibleConstructorReturn(this, (FieldGoalResult.__proto__ || Object.getPrototypeOf(FieldGoalResult)).call(this, variants));

    _this.fieldGoalResult = playPoints.fieldGoalResult;
    return _this;
  }

  _createClass(FieldGoalResult, [{
    key: 'isScored',
    value: function isScored(variant) {
      // eslint-disable-next-line no-console
      debug(this.fieldGoalResult + ' === ' + variant);
      if (!variant || variant === 'none') {
        return false;
      }
      return this.fieldGoalResult.indexOf(variant) > -1;
    }
  }]);

  return FieldGoalResult;
}(_Base3.default);

exports.default = FieldGoalResult;