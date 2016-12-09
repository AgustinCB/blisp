'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statment = undefined;

var _happyParser = require('happy-parser');

var parsec = _interopRequireWildcard(_happyParser);

var _operations = require('./operations');

var operations = _interopRequireWildcard(_operations);

var _grammar = require('./grammar');

var grammar = _interopRequireWildcard(_grammar);

var _expressions = require('./expressions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var builtins = parsec.Parser.operations([grammar.chars.plus, operations.number.plus], [grammar.chars.minus, operations.number.rest], [grammar.chars.times, operations.number.mult], [grammar.chars.slash, operations.number.div], [grammar.keywords.list, operations.list.list], [grammar.keywords.head, operations.list.head], [grammar.keywords.tail, operations.list.tail], [grammar.keywords.last, operations.list.last], [grammar.keywords.init, operations.list.init], [grammar.keywords.join, operations.list.join], [grammar.keywords.eval, operations.list.evaluate], [grammar.keywords.length, operations.list.length], [grammar.keywords.func, operations.definition.func], [grammar.keywords.partial, operations.definition.partial], [grammar.keywords.def, operations.definition.def], [grammar.keywords.global, operations.definition.global], [grammar.keywords.greaterThan, operations.comparison.greaterThan], [grammar.keywords.lesserThan, operations.comparison.lesserThan], [grammar.keywords.greaterOrEqualsThan, operations.comparison.greaterOrEqualsThan], [grammar.keywords.lesserOrEqualsThan, operations.comparison.lesserOrEqualsThan], [grammar.keywords.equals, operations.comparison.equals], [grammar.keywords.notEquals, operations.comparison.notEquals], [grammar.keywords.and, operations.logical.and], [grammar.keywords.or, operations.logical.or], [grammar.keywords.not, operations.logical.not], [grammar.keywords.if, operations.conditional.ifcond], [grammar.keywords.unless, operations.conditional.unless]).trim();

var factor = parsec.lazy(function () {
  return builtins.or(grammar.types.boolean, grammar.types.symbol, grammar.types.string, parsec.int, list, unevaluatedStatment).trim();
});

var list = parsec.lazy(function () {
  var _factor$many;

  return (_factor$many = factor.many(Array)).between.apply(_factor$many, _toConsumableArray(grammar.chars.parenthesis)).then(function (elements) {
    return new _expressions.SExpression(elements);
  });
}).trim();

var unevaluatedStatment = parsec.lazy(function () {
  return grammar.chars.singleQuote.then(list).then(function (sexp) {
    return new _expressions.QExpression(sexp.list);
  });
});
var evaluatedStatment = list.then(function (expr) {
  return expr.run();
}).or(unevaluatedStatment);

var statment = exports.statment = evaluatedStatment;