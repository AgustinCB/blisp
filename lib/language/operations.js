'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.func = exports.def = exports.conditionals = exports.boolean = exports.comparison = exports.list = exports.int = undefined;

var _sexpression = require('./sexpression');

var _symbol = require('./symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var processList = function processList(list) {
  var first_list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (first_list && list.length && list[0].length !== undefined && typeof list[0] !== 'string') {
    list = list[0];
  }
  if (first_list && list.length && list[0] instanceof _sexpression.QExpression) {
    list = list[0].list;
  }
  if (first_list && list instanceof _sexpression.QExpression) {
    list = list.list;
  }
  if (first_list && list.length && list[0] instanceof _sexpression.SExpression) {
    list = list[0].run();
  }
  if (first_list && list instanceof _sexpression.SExpression) {
    list = list.run();
  }
  if (list.length === undefined) return [list];
  return list.map(function (item) {
    if (item instanceof _sexpression.QExpression) return item.list;
    if (item instanceof _sexpression.SExpression) return item.run();
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
    return processList([].concat(Array.prototype.slice.call(arguments)), false);
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
    var args = processList([].concat(Array.prototype.slice.call(arguments)), false).filter(function (list) {
      return list.length && list !== 'string';
    });

    if (args.length === undefined) return new Error('Join takes arguments!');

    return args.reduce(function (acc, next) {
      return acc.concat(next);
    }, []);
  },
  eval: function _eval() {
    var args = [].concat(Array.prototype.slice.call(arguments));

    if (!args.length) return new Error('Eval takes one argument!');

    if (args[0] instanceof _sexpression.SExpression) {
      args[0] = args[0].run();
    }

    if (args[0] instanceof _sexpression.QExpression) {
      args[0] = args[0].list;
    }

    if (args[0].length !== undefined && typeof args[0] !== 'string' && typeof args[0] !== 'function') {
      return new _sexpression.SExpression(args[0]).run();
    }

    if (args.length > 1) {
      return new _sexpression.SExpression(args).run();
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

  var symbols = args[0] instanceof _symbol2.default ? args[0].dry_value : args[0],
      values = args.slice(1);

  if (!(symbols instanceof _sexpression.SExpression)) {
    return new Error('First paramenter should be a SExpression');
  }

  if (symbols.length !== values.length) {
    return new Error('You should pass equal number of symbols and values');
  }

  symbols.list.forEach(function (symbol, index) {
    _environment2.default.set(symbol.name, values[index]);
  });
};

var func = exports.func = function func() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (args.length < 2) return new Error('You should pass at least two arguments');

  var arg_list = args[0],
      body = args[1];

  if (!(arg_list instanceof _sexpression.QExpression) || !(body instanceof _sexpression.QExpression)) {
    return new Error('Paramenters should be instance of SExpression');
  }

  if (!arg_list.list.reduce(function (acc, next) {
    return acc && next instanceof _symbol2.default;
  }, true)) {
    return new Error('List of paramenters should be symbols');
  }

  return function () {
    var funcArgs = [].concat(Array.prototype.slice.call(arguments)).map(function (arg) {
      return arg instanceof _symbol2.default ? arg.value : arg;
    });

    if (funcArgs.length > arg_list.length) {
      return new Error('Passing too many arguments!');
    }
    if (funcArgs.length < arg_list.length) {
      return this.bind.apply(this, [this].concat(_toConsumableArray(funcArgs)));
    }

    _environment2.default.addNamespace(body.toString());

    arg_list.list.forEach(function (symbol, index) {
      return _environment2.default.set(symbol.name, funcArgs[index]);
    });

    //console.log('aca', environment.namespacesPile, body.list)
    var result = body.run();

    _environment2.default.popNamespace();
    return result;
  };
};