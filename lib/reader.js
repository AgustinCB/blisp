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
    this.cache = [];
    this.errors = [];
    this.input.on('data', this.newData.bind(this));
    this.input.on('error', this.newError.bind(this));
    this.input.on('end', this.close.bind(this));
  }

  _createClass(Reader, [{
    key: 'ask',
    value: function ask(question) {
      var _this = this;

      this.output.write(question);
      return new Promise(function (resolve, reject) {
        var interval = setInterval(function () {
          if (_this.errors.length) {
            clearInterval(interval);
            reject(_this.errors.pop());
          }
          if (_this.cache.length) {
            clearInterval(interval);
            resolve(_this.cache.pop());
          }
        }, 100);
      });
    }
  }, {
    key: 'newData',
    value: function newData(data) {
      this.cache.push(data.toString());
    }
  }, {
    key: 'newError',
    value: function newError(error) {
      this.errors.push(data.toString());
    }
  }, {
    key: 'close',
    value: function close() {
      // Something to do here?
    }
  }]);

  return Reader;
}();

exports.default = Reader;