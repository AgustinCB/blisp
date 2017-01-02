'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.length = exports.evaluate = exports.join = exports.init = exports.last = exports.tail = exports.head = exports.list = exports.reduce = exports.foreach = exports.map = exports.filter = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('./util');

var _expressions = require('../expressions');

var filter = exports.filter = function filter() {
  var _processList = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments))),
      _processList2 = _slicedToArray(_processList, 2),
      func = _processList2[0],
      list = _processList2[1];

  if (func.constructor !== Function) {
    throw new Error('First argument should be a function');
  }

  if (list.constructor !== Array) {
    throw new Error('Second argument should be a list');
  }

  return list.filter(func);
};

var map = exports.map = function map() {
  var _processList3 = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments))),
      _processList4 = _slicedToArray(_processList3, 2),
      func = _processList4[0],
      list = _processList4[1];

  if (func.constructor !== Function) {
    throw new Error('First argument should be a function');
  }

  if (list.constructor !== Array) {
    throw new Error('Second argument should be a list');
  }

  return list.map(func);
};

var foreach = exports.foreach = function foreach() {
  var _processList5 = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments))),
      _processList6 = _slicedToArray(_processList5, 2),
      func = _processList6[0],
      list = _processList6[1];

  if (func.constructor !== Function) {
    throw new Error('First argument should be a function');
  }

  if (list.constructor !== Array) {
    throw new Error('Second argument should be a list');
  }

  return list.forEach(func);
};

var reduce = exports.reduce = function reduce() {
  var _processList7 = (0, _util.processList)([].concat(Array.prototype.slice.call(arguments))),
      _processList8 = _slicedToArray(_processList7, 3),
      func = _processList8[0],
      list = _processList8[1],
      init = _processList8[2];

  if (func.constructor !== Function) {
    throw new Error('First argument should be a function');
  }

  if (list.constructor !== Array) {
    throw new Error('Second argument should be a list');
  }

  return list.reduce(func, init);
};

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