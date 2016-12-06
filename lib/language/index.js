'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statment = exports.builtins = undefined;

var _happyParser = require('happy-parser');

var parsec = _interopRequireWildcard(_happyParser);

var _operations = require('./operations');

var operations = _interopRequireWildcard(_operations);

var _grammar = require('./grammar');

var grammar = _interopRequireWildcard(_grammar);

var _symbol = require('./symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _expressions = require('./expressions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var builtins = exports.builtins = parsec.Parser.operations([grammar.chars.plus, operations.int.plus], [grammar.chars.minus, operations.int.rest], [grammar.chars.times, operations.int.mult], [grammar.chars.slash, operations.int.div], [grammar.keywords.list, operations.list.list], [grammar.keywords.head, operations.list.head], [grammar.keywords.tail, operations.list.tail], [grammar.keywords.last, operations.list.last], [grammar.keywords.init, operations.list.init], [grammar.keywords.join, operations.list.join], [grammar.keywords.eval, operations.list.eval], [grammar.keywords.length, operations.list.length], [grammar.keywords.func, operations.func], [grammar.keywords.def, operations.def], [grammar.keywords.global, operations.global], [grammar.keywords.equals, operations.comparison.equals], [grammar.keywords.notEquals, operations.comparison.notEquals], [grammar.keywords.greaterThan, operations.comparison.graterThan], [grammar.keywords.lesserThan, operations.comparison.lesserThan], [grammar.keywords.greaterOrEqualsThan, operations.comparison.graterOrEqualsThan], [grammar.keywords.lesserOrEqualsThan, operations.comparison.lesserOrEqualsThan], [grammar.keywords.and, operations.boolean.and], [grammar.keywords.or, operations.boolean.or], [grammar.keywords.not, operations.boolean.not], [grammar.keywords.if, operations.conditionals.if], [grammar.keywords.unless, operations.conditionals.unless]).trim();

var booleans = grammar.keywords.false.or(grammar.keywords.true).trim();

var symbol = grammar.symbolName.then(function (symbolName) {
  return new _symbol2.default(symbolName);
});

var factor = parsec.lazy(function () {
  return parsec.int.or(list, unevaluatedStatment);
});

var list = parsec.lazy(function () {
  var _builtins$or$trim$man;

  return (_builtins$or$trim$man = builtins.or(booleans, symbol, factor).trim().many()).between.apply(_builtins$or$trim$man, _toConsumableArray(grammar.chars.parenthesis)).then(function (elements) {
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