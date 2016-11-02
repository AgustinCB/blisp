'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstraction of readline using promises
 */
var Reader = function () {
  function Reader() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.stdin;
    var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.stdout;

    _classCallCheck(this, Reader);

    this.rl = _readline2.default.createInterface({ input: input, output: output });
  }

  _createClass(Reader, [{
    key: 'ask',
    value: function ask(question) {
      return (0, _util.promisifyInverse)(this.rl.question.bind(this.rl), question);
    }
  }, {
    key: 'close',
    value: function close() {
      this.rl.close();
    }
  }]);

  return Reader;
}();

exports.default = Reader;