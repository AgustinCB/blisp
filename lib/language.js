'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expr = undefined;

var _happyParser = require('happy-parser');

var parsec = _interopRequireWildcard(_happyParser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var operations = {
  plus: function plus() {
    return [].concat(Array.prototype.slice.call(arguments)).reduce(function (acc, prev) {
      return acc + prev;
    }, 0);
  },
  rest: function rest() {
    var args = [].concat(Array.prototype.slice.call(arguments));
    if (args.length == 1) args = [0, args[0]];
    return args.slice(1).reduce(function (acc, prev) {
      return acc - prev;
    }, args[0]);
  },
  mult: function mult() {
    return [].concat(Array.prototype.slice.call(arguments)).reduce(function (acc, prev) {
      return acc * prev;
    }, 1);
  },
  div: function div() {
    var args = [].concat(Array.prototype.slice.call(arguments));
    if (args.length == 1) args = [1, args[0]];
    return args.slice(1).reduce(function (acc, prev) {
      return acc / prev;
    }, args[0]);
  }
};

var parenthesis = [parsec.char('('), parsec.char(')')];

var operators = parsec.Parser.operations([parsec.char('+'), operations.plus], [parsec.char('-'), operations.rest], [parsec.char('*'), operations.mult], [parsec.char('/'), operations.div]);

var factor = parsec.lazy(function () {
  return parsec.int.or(expr.between.apply(expr, parenthesis)).then(function (res) {
    return parsec.spaces.orNone().then(res);
  });
});

var expr = exports.expr = parsec.lazy(function () {
  return operators.then(function (op) {
    return parsec.spaces.then(function (_) {
      return factor.many().then(function (factors) {
        return op.apply(undefined, _toConsumableArray(factors));
      });
    });
  });
}).trim();