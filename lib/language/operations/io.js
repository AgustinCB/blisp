'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = exports.error = exports.print = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var print = exports.print = function print() {
  var _console;

  (_console = console).log.apply(_console, arguments);
};

var error = exports.error = function error() {
  throw new Error([].concat(Array.prototype.slice.call(arguments)).join(' '));
};

var load = exports.load = function load() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  var statment = args[0];
  var files = args.slice(1);

  files.forEach(function (file) {
    var content = _fs2.default.readFileSync(file).toString();
    content.split('\n').forEach(statment.parse.bind(statment));
  });
};