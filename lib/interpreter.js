'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _language = require('./language');

var lang = _interopRequireWildcard(_language);

var _operations = require('./language/operations');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interpreter = function () {
  function Interpreter() {
    _classCallCheck(this, Interpreter);

    this.prompt = '> ';
    this.history = [];
  }

  _createClass(Interpreter, [{
    key: 'addHistory',
    value: function addHistory(input) {
      this.history.push(input);
    }
  }, {
    key: 'parseError',
    value: function parseError(res) {
      var input = res.input;
      if (res.unconsumedStrings && res.unconsumedStrings[0]) {
        throw new Error('Unexpected input (col ' + input.indexOf(res.unconsumedStrings[0]) + '): "' + res.unconsumedStrings[0] + '"');
      }
    }
  }, {
    key: 'interpret',
    value: function interpret(input) {
      this.addHistory(input);
      var res = lang.statment.parse(input);

      this.parseError(res);

      return res;
    }
  }]);

  return Interpreter;
}();

exports.default = Interpreter;