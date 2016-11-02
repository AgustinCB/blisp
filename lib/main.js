'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reader = require('./reader');

var _reader2 = _interopRequireDefault(_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    key: 'interpret',
    value: function interpret(input) {
      this.addHistory(input);
      return input;
    }
  }]);

  return Interpreter;
}();

exports.default = Interpreter;


var main = function main() {
  var interpreter = new Interpreter(),
      rl = new _reader2.default(),
      read = function read() {
    return rl.ask(interpreter.prompt).then(function (res) {
      console.log(interpreter.interpret(res));
      return read();
    });
  };

  return read();
};

if (require.main === module) {
  main().catch(function (err) {
    return console.log('An error happened!', err);
  });
}