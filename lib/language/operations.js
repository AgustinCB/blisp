'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.func = exports.global = exports.def = exports.conditionals = exports.boolean = exports.comparison = exports.list = exports.int = undefined;

var _expressions = require('./expressions');

var _symbol = require('./symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var processList = function processList(list) {
  if (list.length === 1 && (list[0].length !== undefined && typeof list[0] !== 'string' || list[0] instanceof _symbol2.default)) {
    list = list[0] instanceof _symbol2.default ? list[0].value : list[0];
  }
  if (list instanceof _expressions.QExpression) {
    return list.run();
  }
  if (list instanceof _expressions.SExpression) {
    list = list.run();
  }
  list = (0, _util.toArray)(list);
  return list.map(function (item) {
    if (item instanceof _expressions.SExpression) return item.run();
    if (item instanceof _symbol2.default) return item.value;
    return item;
  });
};

var int = exports.int = {
  plus: function plus() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));
    return args.reduce(function (acc, prev) {
      return acc + prev;
    }, 0);
  },
  rest: function rest() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));
    if (args.length == 1) args = [0, args[0]];
    return args.slice(1).reduce(function (acc, prev) {
      return acc - prev;
    }, args[0]);
  },
  mult: function mult() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));
    return args.reduce(function (acc, prev) {
      return acc * prev;
    }, 1);
  },
  div: function div() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));
    if (args.length === 1) args = [1, args[0]];
    if (args.slice(1).find(function (c) {
      return c === 0;
    }) === 0) return new Error('Division by zero');
    return args.slice(1).reduce(function (acc, prev) {
      return acc / prev;
    }, args[0]);
  }
};

var list = exports.list = {
  list: function list() {
    return processList([].concat(Array.prototype.slice.call(arguments)));
  },
  head: function head() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));

    if (args.length === undefined) return new Error('Head takes arguments!');

    return args[0];
  },
  tail: function tail() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));

    if (args.length === undefined) return new Error('Tail takes arguments!');

    return args.slice(1);
  },
  last: function last() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));

    if (args.length === undefined) return new Error('Last takes arguments!');

    return args.slice(-1)[0];
  },
  init: function init() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));

    if (args.length === undefined) return new Error('Init takes arguments!');

    return args.slice(0, -1);
  },
  join: function join() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));

    if (args.length === undefined) return new Error('Join takes arguments!');

    return args.reduce(function (acc, next) {
      return acc.concat(next);
    }, []);
  },
  eval: function _eval() {
    var args = [].concat(Array.prototype.slice.call(arguments));

    if (!args.length) return new Error('Eval takes one argument!');

    if (args[0] instanceof _symbol2.default) {
      args[0] = args[0].value;
    }

    if (args[0] instanceof _expressions.SExpression) {
      args[0] = args[0].run();
    }

    if (args[0].length !== undefined && typeof args[0] !== 'string' && typeof args[0] !== 'function') {
      return _expressions.SExpression.run(args[0]);
    }

    return args[0];
  },
  length: function length() {
    var args = processList([].concat(Array.prototype.slice.call(arguments)));

    if (!args || args.length === undefined) return 0;

    return args.length;
  }
};

var boolOp = function boolOp(condition) {
  var args = [].concat(Array.prototype.slice.call(arguments)).slice(1);

  if (!args.length) return new Error('Equals function needs arguments');
  for (var i in args) {
    var val = args[i];
    if (i > 0 && !condition(args[i - 1], val)) return false;
  }
  return true;
};
var comparison = exports.comparison = {
  equals: function equals() {
    return boolOp.apply(undefined, [function (val1, val2) {
      return val1 === val2;
    }].concat(Array.prototype.slice.call(arguments)));
  },
  notEquals: function notEquals() {
    return boolOp.apply(undefined, [function (val1, val2) {
      return val1 !== val2;
    }].concat(Array.prototype.slice.call(arguments)));
  },
  greaterThan: function greaterThan() {
    return boolOp.apply(undefined, [function (val1, val2) {
      return val1 > val2;
    }].concat(Array.prototype.slice.call(arguments)));
  },
  lesserThan: function lesserThan() {
    return boolOp.apply(undefined, [function (val1, val2) {
      return val1 < val2;
    }].concat(Array.prototype.slice.call(arguments)));
  },
  greaterOrEqualsThan: function greaterOrEqualsThan() {
    return boolOp.apply(undefined, [function (val1, val2) {
      return val1 >= val2;
    }].concat(Array.prototype.slice.call(arguments)));
  },
  lesserOrEqualsThan: function lesserOrEqualsThan() {
    return boolOp.apply(undefined, [function (val1, val2) {
      return val1 <= val2;
    }].concat(Array.prototype.slice.call(arguments)));
  }
};

var boolean = exports.boolean = {
  and: function and() {
    var args = [].concat(Array.prototype.slice.call(arguments));

    if (!args.length) return new Error('And function needs arguments');
    return args.findIndex(function (val) {
      return !val;
    }) >= 0;
  },
  or: function or() {
    var args = [].concat(Array.prototype.slice.call(arguments));

    if (!args.length) return new Error('Or function needs arguments');
    return args.findIndex(function (val) {
      return !!val;
    }) >= 0;
  },
  not: function not() {
    var args = [].concat(Array.prototype.slice.call(arguments));

    if (!args.length) return new Error('Not function needs arguments');
    return !args[0];
  }
};

var conditionals = exports.conditionals = {
  'if': function _if() {
    var args = [].concat(Array.prototype.slice.call(arguments));

    if (args.length < 2) return new Error('Conditions needs at least two arguments');

    if (args[0]) return args[1].run();else if (args[2]) return args[2].run();
  },
  'if-not': function ifNot() {
    return this.if.apply(this, [!arguments[0]].concat(_toConsumableArray(arguments[1].slice(1))));
  },
  'unless': function unless() {
    return this['if-not'].apply(this, arguments);
  }
};

var def = exports.def = function def() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (args.length < 2) return new Error('You should pass at least two arguments');

  var symbols = function () {
    if (args[0] instanceof _symbol2.default) return args[0].dry_value;
    if (args[0].constructor === _expressions.SExpression) return args[0].run();
    return args[0];
  }();
  var values = args.slice(1);

  if (symbols instanceof _symbol2.default) {
    return _environment2.default.set(symbols.name, values[0], values[1]);
  }

  if (!(symbols instanceof _expressions.SExpression)) {
    return new Error('First paramenter should be a SExpression');
  }

  var env = values.length - symbols.length === 1 ? values.pop() : undefined;

  if (symbols.length !== values.length) {
    return new Error('You should pass equal number of symbols and values');
  }

  symbols.list.forEach(function (symbol, index) {
    _environment2.default.set(symbol.name, values[index], env);
  });
};

var global = exports.global = function global() {
  def.apply(undefined, Array.prototype.slice.call(arguments).concat(['global']));
};

var func = exports.func = function func() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (args.length < 2) return new Error('You should pass at least two arguments');

  var arg_list = args[0].constructor === _expressions.SExpression ? new _expressions.QExpression(args[0].run()) : args[0],
      body = args[1] instanceof _symbol2.default ? args[1].dry_value : args[1];

  if (!(arg_list instanceof _expressions.QExpression) || !(body instanceof _expressions.SExpression)) {
    return new Error('Paramenters should be instance of SExpression');
  }

  if (!arg_list.list.reduce(function (acc, next) {
    return acc && next instanceof _symbol2.default;
  }, true)) {
    return new Error('List of paramenters should be symbols');
  }

  // Check for dynamic arguments
  var dyn_args = arg_list.list.filter(function (symbol) {
    return symbol.name[0] === '&';
  });
  if (dyn_args.length > 1) {
    return new Error('Only one dynamic arguments name is allowed');
  }
  if (dyn_args[0] && arg_list.list.indexOf(dyn_args[0]) !== arg_list.length - 1) {
    return new Error('Dynamic arguments name should be the last one');
  }

  var result = function result() {
    var extra_args = dyn_args[0],
        funcArgs = [].concat(Array.prototype.slice.call(arguments)).map(function (arg) {
      return arg instanceof _symbol2.default ? arg.value : arg;
    });

    if (funcArgs.length > arg_list.length && !extra_args) {
      return new Error('Passing too many arguments!');
    }
    if (funcArgs.length < arg_list.length) {
      return this.bind.apply(this, [this].concat(_toConsumableArray(funcArgs)));
    }
    if (extra_args) {
      funcArgs[arg_list.length - 1] = new _expressions.QExpression(funcArgs.slice(arg_list.length - 1));
    }

    _environment2.default.addNamespace(body.toString());

    arg_list.list.forEach(function (symbol, index) {
      return _environment2.default.set(symbol.name, funcArgs[index]);
    });

    var result = body.run();

    _environment2.default.popNamespace();
    return result;
  };
  return result.bind(result);
};