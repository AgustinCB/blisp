'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.func = exports.global = exports.def = undefined;

var _util = require('./util');

var _expressions = require('../expressions');

var _symbol = require('../symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _environment = require('../environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var def = exports.def = function def() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (args.length < 2) throw new Error('You should pass at least two arguments');

  var symbols = args[0];
  var values = args.slice(1);

  if (symbols.constructor === _expressions.SExpression) {
    return def.apply(undefined, [new _expressions.QExpression([symbols.run()])].concat(_toConsumableArray(values)));
  }

  if (symbols instanceof _symbol2.default) {
    return def.apply(undefined, [symbols.value].concat(_toConsumableArray(values)));
  }

  if (!(symbols instanceof _expressions.QExpression)) {
    throw new Error('First paramenter should be a QExpression');
  }

  var env = values.length - symbols.length === 1 ? values.pop() : undefined;

  if (symbols.length !== values.length) {
    throw new Error('You should pass equal number of symbols and values');
  }

  symbols.forEach(function (symbol, index) {
    _environment2.default.set(symbol.name, (0, _util.executeElement)(values[index]), env);
  });
};

var global = exports.global = function global() {
  def.apply(undefined, Array.prototype.slice.call(arguments).concat(['global']));
};

var func = exports.func = function func() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (args.length < 2) throw new Error('You should pass two arguments');

  var argList = args[0].constructor === _expressions.SExpression ? new _expressions.QExpression(args[0].run()) : args[0];
  var body = args[1] instanceof _symbol2.default ? args[1].value : args[1];

  if (!(argList instanceof _expressions.QExpression) || !(body instanceof _expressions.QExpression)) {
    throw new Error('Paramenters should be instance of QExpression');
  }

  if (!argList.reduce(function (acc, next) {
    return acc && next instanceof _symbol2.default;
  }, true)) {
    throw new Error('List of paramenters should be symbols');
  }

  // Check for dynamic arguments
  var extraArgs = argList.last.name[0] === '&' ? argList.last : false;

  var result = function result() {
    var funcArgs = [].concat(Array.prototype.slice.call(arguments)).map(function (arg) {
      return arg instanceof _symbol2.default ? arg.value : arg;
    });

    if (funcArgs.length > argList.length && !extraArgs) {
      throw new Error('Passing too many arguments!');
    }
    if (funcArgs.length < argList.length) {
      return this.bind.apply(this, [this].concat(_toConsumableArray(funcArgs)));
    }
    if (extraArgs) {
      funcArgs[argList.length - 1] = new _expressions.QExpression(funcArgs.slice(argList.length - 1));
    }

    _environment2.default.addNamespace(body.toString());

    argList.forEach(function (symbol, index) {
      return _environment2.default.set(symbol.name, funcArgs[index]);
    });

    var result = body.execute();

    _environment2.default.popNamespace();
    return result;
  };
  return result.bind(result);
};