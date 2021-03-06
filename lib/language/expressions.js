'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QExpression = exports.SExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _symbol = require('./symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SExpression = exports.SExpression = function () {
  function SExpression(list) {
    _classCallCheck(this, SExpression);

    this.list = list instanceof SExpression ? list.list : list;
  }

  _createClass(SExpression, [{
    key: 'run',
    value: function run() {
      var lead = this.list[0] instanceof _symbol2.default ? this.list[0].value : this.list[0];

      if (lead instanceof SExpression && !(lead instanceof QExpression)) {
        lead = lead.run();
      }

      if (typeof lead === 'function') {
        return lead.apply(undefined, _toConsumableArray(this.slice(1)));
      }

      if (!this.list || !this.list.constructor === Array) return (0, _util.toArray)(this.list);
      return this.map(function (v) {
        return v instanceof _symbol2.default ? v.value : v;
      });
    }
  }, {
    key: 'execute',
    value: function execute() {
      return this.run();
    }
  }, {
    key: 'map',
    value: function map(fn) {
      return this.list.map(fn);
    }
  }, {
    key: 'forEach',
    value: function forEach(fn) {
      return this.list.forEach(fn);
    }
  }, {
    key: 'reduce',
    value: function reduce(fn, init) {
      return this.list.reduce(fn, init);
    }
  }, {
    key: 'slice',
    value: function slice(from, to) {
      return this.list.slice(from, to);
    }
  }, {
    key: 'last',
    get: function get() {
      if (!this.list.length) return undefined;
      return this.list[this.list.length - 1];
    }
  }, {
    key: 'length',
    get: function get() {
      return this.list.length;
    }
  }]);

  return SExpression;
}();

SExpression.run = function (list) {
  return new SExpression(list).run();
};

var QExpression = exports.QExpression = function (_SExpression) {
  _inherits(QExpression, _SExpression);

  function QExpression() {
    _classCallCheck(this, QExpression);

    return _possibleConstructorReturn(this, (QExpression.__proto__ || Object.getPrototypeOf(QExpression)).apply(this, arguments));
  }

  _createClass(QExpression, [{
    key: 'run',
    value: function run() {
      return this;
    }
  }, {
    key: 'execute',
    value: function execute() {
      return SExpression.run(this.list);
    }
  }]);

  return QExpression;
}(SExpression);