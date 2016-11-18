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

var lang = _interopRequireWildcard(_language);

var _operations = require('./language/operations');

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interpreter = function () {
  function Interpreter(prompt) {
    _classCallCheck(this, Interpreter);

    if (prompt === undefined) prompt = '> ';
    if (typeof prompt !== 'string') prompt = '';
    this.prompt = '' + prompt;
    this.history = [];

    this.loadStandardLib();
  }

  _createClass(Interpreter, [{
    key: 'loadStandardLib',
    value: function loadStandardLib() {
      var _this = this;

      var lib = './src/language/stdlib',
          readFile = function readFile(file) {
        return (0, _util.promisify)(_fs2.default.readFile, _path2.default.join(lib, file));
      },
          loadCode = function loadCode(code) {
        code.toString().split('\n').forEach(function (codeLine) {
          return _this.interpret(codeLine);
        });
      };

      return (0, _util.promisify)(_fs2.default.readdir, lib).then(function (files) {
        return files.filter(function (file) {
          return file.endsWith('.blisp');
        }).forEach(function (file) {
          return readFile(file).then(loadCode).catch(function (err) {
            return console.log(err);
          });
        });
      }).catch(function (err) {
        return console.log(err);
      });
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
      var res = lang.statment.parse(input);

      this.parseError(res);

      return res;
    }
  }]);

  return Interpreter;
}();

exports.default = Interpreter;