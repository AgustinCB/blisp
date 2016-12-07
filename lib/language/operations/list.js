'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.length = exports.evaluate = exports.join = exports.init = exports.last = exports.tail = exports.head = exports.list = undefined;

var _util = require('./util');

var _expressions = require('../expressions');

var list = exports.list = function list() {
  return (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));
};

var head = exports.head = function head() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));

  if (args.length === undefined) throw new Error('Head takes arguments!');

  return args[0];
};

var tail = exports.tail = function tail() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));

  if (args.length === undefined) throw new Error('Tail takes arguments!');

  return args.slice(1);
};

var last = exports.last = function last() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));

  if (args.length === undefined) throw new Error('Last takes arguments!');

  return args.slice(-1)[0];
};

var init = exports.init = function init() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));

  if (args.length === undefined) throw new Error('Init takes arguments!');

  return args.slice(0, -1);
};

var join = exports.join = function join() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));

  if (args.length === undefined) throw new Error('Join takes arguments!');

  return args.reduce(function (acc, next) {
    return acc.concat(next.list ? next.list : next);
  }, []);
};

var evaluate = exports.evaluate = function evaluate() {
  var val = (0, _util.executeElement)([].concat(Array.prototype.slice.call(arguments))[0]);

  if (!val) throw new Error('Eval takes one argument!');

  if (val instanceof _expressions.SExpression) {
    return val.execute();
  }

  if (val.constructor === Array) {
    return _expressions.SExpression.run(val);
  }

  return val;
};

var length = exports.length = function length() {
  var args = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments)));

  if (!args || args.length === undefined) return 0;

  return args.length;
};