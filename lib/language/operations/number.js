'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.div = exports.mult = exports.rest = exports.plus = undefined;

var _util = require('./util');

var plus = exports.plus = function plus() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));
  return args.reduce(function (acc, prev) {
    return acc + prev;
  });
};

var rest = exports.rest = function rest() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));
  if (args.length === 1) return rest([0, args[0]]);
  return args.reduce(function (acc, prev) {
    return acc - prev;
  });
};

var mult = exports.mult = function mult() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));
  return args.reduce(function (acc, prev) {
    return acc * prev;
  });
};

var div = exports.div = function div() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));
  if (args.length === 1) return div([1, args[0]]);
  if (args.slice(1).find(function (c) {
    return c === 0;
  }) === 0) throw new Error('Division by zero');
  return args.reduce(function (acc, prev) {
    return acc / prev;
  });
};