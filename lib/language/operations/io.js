'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = exports.error = exports.print = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var print = exports.print = function print() {
  var _console;

  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));
  (_console = console).log.apply(_console, _toConsumableArray(args));
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
    statment.many().parse(content);
  });
};