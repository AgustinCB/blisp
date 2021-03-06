'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _language = require('./language');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interpreter = function () {
  function Interpreter(prompt) {
    _classCallCheck(this, Interpreter);

    if (prompt === undefined) prompt = '> ';
    if (typeof prompt !== 'string') prompt = '';
    this.prompt = '' + prompt;
    this.history = [];
  }

  _createClass(Interpreter, [{
    key: 'loadStandardLib',
    value: function loadStandardLib() {
      var _this = this;

      var lib = _path2.default.join(__dirname, '../src/language/stdlib');
      var handleErr = function handleErr(err) {
        return console.log('Error: ', err);
      };

      return (0, _util.promisify)(_fs2.default.readdir, lib).then(function (files) {
        return files.filter(function (file) {
          return file.endsWith('.blisp');
        }).forEach(function (file) {
          return _this.interpret('(load "' + _path2.default.join(lib, file) + '")');
        });
      }).catch(handleErr);
    }
  }, {
    key: 'parseError',
    value: function parseError(res, input) {
      if (res.unconsumedStrings && res.unconsumedStrings[0]) {
        throw new Error('Unexpected input (col ' + input.indexOf(res.unconsumedStrings[0]) + '): "' + res.unconsumedStrings[0] + '"');
      }
    }
  }, {
    key: 'interpret',
    value: function interpret(input) {
      var res = _language.statment.parse(input);

      this.parseError(res, input);

      return res;
    }
  }]);

  return Interpreter;
}();

exports.default = Interpreter;