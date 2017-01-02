'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lesserOrEqualsThan = exports.greaterOrEqualsThan = exports.lesserThan = exports.greaterThan = exports.notEquals = exports.equals = undefined;

var _util = require('./util');

var boolOp = function boolOp(condition) {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)).slice(1));

  if (!args.length) throw new Error('Equals function needs arguments');
  for (var i in args) {
    var val = args[i];
    if (i > 0 && !condition(args[i - 1], val)) return false;
  }
  return true;
};

var equals = exports.equals = function equals() {
  return boolOp.apply(undefined, [function (val1, val2) {
    return val1 === val2;
  }].concat(Array.prototype.slice.call(arguments)));
};

var notEquals = exports.notEquals = function notEquals() {
  return boolOp.apply(undefined, [function (val1, val2) {
    return val1 !== val2;
  }].concat(Array.prototype.slice.call(arguments)));
};

var greaterThan = exports.greaterThan = function greaterThan() {
  return boolOp.apply(undefined, [function (val1, val2) {
    return val1 > val2;
  }].concat(Array.prototype.slice.call(arguments)));
};

var lesserThan = exports.lesserThan = function lesserThan() {
  return boolOp.apply(undefined, [function (val1, val2) {
    return val1 < val2;
  }].concat(Array.prototype.slice.call(arguments)));
};

var greaterOrEqualsThan = exports.greaterOrEqualsThan = function greaterOrEqualsThan() {
  return boolOp.apply(undefined, [function (val1, val2) {
    return val1 >= val2;
  }].concat(Array.prototype.slice.call(arguments)));
};

var lesserOrEqualsThan = exports.lesserOrEqualsThan = function lesserOrEqualsThan() {
  return boolOp.apply(undefined, [function (val1, val2) {
    return val1 <= val2;
  }].concat(Array.prototype.slice.call(arguments)));
};