'use strict';

/**
 * Abstraction of readline using promises
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reader = function () {
  function Reader() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.stdin;
    var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.stdout;

    _classCallCheck(this, Reader);

    this.input = input;
    this.output = output;
  }

  _createClass(Reader, [{
    key: 'ask',
    value: function ask(question) {
      var _this = this;

      this.output.write(question);
      return new Promise(function (resolve, reject) {
        _this.input.on('data', resolve);
        _this.input.on('error', reject);
        _this.input.on('end', resolve);
      });
    }
  }]);

  return Reader;
}();

exports.default = Reader;