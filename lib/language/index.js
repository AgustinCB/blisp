'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statment = undefined;

var _builtins$or$trim$man;

var _happyParser = require('happy-parser');

var parsec = _interopRequireWildcard(_happyParser);

var _operations = require('./operations');

var operations = _interopRequireWildcard(_operations);

var _grammar = require('./grammar');

var grammar = _interopRequireWildcard(_grammar);

var _expressions = require('./expressions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var lazyList = parsec.lazy(function () {
  return list;
});

var evaluationStatment = grammar.chars.graveAccent.then(lazyList.or(grammar.types.symbol)).then(function (elements) {
  return operations.list.evaluate(elements);
});
var unevaluatedStatment = grammar.chars.singleQuote.then(lazyList).then(function (elements) {
  return new _expressions.QExpression(elements);
});
var evaluatedStatment = lazyList.then(function (elements) {
  return new _expressions.SExpression(elements);
});

var statment = exports.statment = evaluatedStatment.or(unevaluatedStatment, grammar.comment).then(function (expression) {
  return expression.run();
}).or(evaluationStatment);

var builtins = parsec.Parser.operations([grammar.chars.plus, operations.number.plus], [grammar.chars.minus, operations.number.rest], [grammar.chars.times, operations.number.mult], [grammar.chars.slash, operations.number.div], [grammar.keywords.list, operations.list.list], [grammar.keywords.head, operations.list.head], [grammar.keywords.tail, operations.list.tail], [grammar.keywords.last, operations.list.last], [grammar.keywords.init, operations.list.init], [grammar.keywords.join, operations.list.join], [grammar.keywords.eval, operations.list.evaluate], [grammar.keywords.length, operations.list.length], [grammar.keywords.func, operations.definition.func], [grammar.keywords.partial, operations.definition.partial], [grammar.keywords.def, operations.definition.def], [grammar.keywords.global, operations.definition.global], [grammar.keywords.print, operations.io.print], [grammar.keywords.error, operations.io.error], [grammar.keywords.load, operations.io.load.bind(operations.io.load, statment)], [grammar.keywords.greaterThan, operations.comparison.greaterThan], [grammar.keywords.lesserThan, operations.comparison.lesserThan], [grammar.keywords.greaterOrEqualsThan, operations.comparison.greaterOrEqualsThan], [grammar.keywords.lesserOrEqualsThan, operations.comparison.lesserOrEqualsThan], [grammar.keywords.equals, operations.comparison.equals], [grammar.keywords.notEquals, operations.comparison.notEquals], [grammar.keywords.and, operations.logical.and], [grammar.keywords.or, operations.logical.or], [grammar.keywords.not, operations.logical.not], [grammar.keywords.if, operations.conditional.ifcond], [grammar.keywords.unless, operations.conditional.unless]).trim();

var list = (_builtins$or$trim$man = builtins.or(grammar.types.boolean, grammar.keywords.nil, grammar.types.symbol, grammar.types.string, grammar.types.float, parsec.int, unevaluatedStatment, evaluatedStatment, evaluationStatment).trim().many(Array)).between.apply(_builtins$or$trim$man, _toConsumableArray(grammar.chars.parenthesis));