'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unless = exports.ifcond = undefined;

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ifcond = exports.ifcond = function ifcond() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (args.length < 2) throw new Error('Conditions needs at least two arguments');

  if ((0, _util.processElement)(true, args[0])) return args[1].run ? args[1].run() : args[1];else if (args[2]) return args[2].run ? args[2].run() : args[2];
};

var unless = exports.unless = function unless() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  return ifcond.apply(undefined, [!args[0]].concat(_toConsumableArray(args.slice(1))));
};