'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _expressions = require('./expressions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Symbol = function () {
  function _Symbol(name, value) {
    _classCallCheck(this, _Symbol);

    this.name = name;
  }

  _createClass(_Symbol, [{
    key: 'value',
    get: function get() {
      var _value = _environment2.default.get(this.name);
      if (_value === undefined) throw new Error(this.name + ' is not defined');
      if (_value instanceof _expressions.SExpression) return _value.run();
      return _value;
    }
  }]);

  return _Symbol;
}();

exports.default = _Symbol;