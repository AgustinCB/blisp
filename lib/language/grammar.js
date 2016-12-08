'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keywords = exports.chars = exports.symbolName = undefined;

var _happyParser = require('happy-parser');

var parsec = _interopRequireWildcard(_happyParser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var symbolName = exports.symbolName = parsec.letter.or(parsec.symbol, parsec.int).satisfy(function (c) {
  return c !== '(' && c !== ')' && c !== '\'';
}).many().satisfy(function (c) {
  return !c.split('').reduce(function (acc, v) {
    return acc && !isNaN(parseInt(v));
  }, true);
}).trim();

var chars = exports.chars = {
  parenthesis: [parsec.char('('), parsec.char(')')],
  singleQuote: parsec.char("'"),
  plus: parsec.char('+'),
  minus: parsec.char('-'),
  times: parsec.char('*'),
  slash: parsec.char('/')
};

var keywords = exports.keywords = {
  list: parsec.item.startsWith('list').then(parsec.space.many()),
  head: parsec.item.startsWith('head').then(parsec.space.many()),
  tail: parsec.item.startsWith('tail').then(parsec.space.many()),
  last: parsec.item.startsWith('last').then(parsec.space.many()),
  init: parsec.item.startsWith('init').then(parsec.space.many()),
  join: parsec.item.startsWith('join').then(parsec.space.many()),
  eval: parsec.item.startsWith('eval').then(parsec.space.many()),
  length: parsec.item.startsWith('length').then(parsec.space.many()),
  def: parsec.item.startsWith('def').then(parsec.space.many()),
  global: parsec.item.startsWith('global').then(parsec.space.many()),
  equals: parsec.item.startsWith('=').then(parsec.space.many()),
  notEquals: parsec.item.startsWith('!=').then(parsec.space.many()),
  greaterThan: parsec.item.startsWith('>').then(parsec.space.many()),
  lesserThan: parsec.item.startsWith('<').then(parsec.space.many()),
  greaterOrEqualsThan: parsec.item.startsWith('>=').then(parsec.space.many()),
  lesserOrEqualsThan: parsec.item.startsWith('<=').then(parsec.space.many()),
  and: parsec.item.startsWith('and').then(parsec.space.many()),
  or: parsec.item.startsWith('or').then(parsec.space.many()),
  not: parsec.item.startsWith('not').then(parsec.space.many()),
  if: parsec.item.startsWith('if').then(parsec.space.many()),
  unless: parsec.item.startsWith('unless').then(parsec.space.many()),
  'false': parsec.item.startsWith('false').trim().then(false),
  'true': parsec.item.startsWith('true').trim().then(true),
  func: parsec.item.startsWith('#').then(parsec.space.many()),
  partial: parsec.item.startsWith('partial').then(parsec.space.many())
};