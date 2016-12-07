'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.not = exports.or = exports.and = undefined;

var _util = require('./util');

var and = exports.and = function and() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));

  if (!args.length) throw new Error('And function needs arguments');
  return args.findIndex(function (val) {
    return !val;
  }) === -1;
};

var or = exports.or = function or() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));

  if (!args.length) throw new Error('Or function needs arguments');
  return args.findIndex(function (val) {
    return !!val;
  }) >= 0;
};

var not = exports.not = function not() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (!args.length) throw new Error('Not function needs arguments');
  return !(0, _util.processElement)(true, args[0]);
};