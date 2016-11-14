'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keywords = exports.chars = exports.symbol_name = undefined;

var _happyParser = require('happy-parser');

var parsec = _interopRequireWildcard(_happyParser);

var _util = require('../util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var symbol_name = exports.symbol_name = parsec.letter.or(parsec.symbol, parsec.int).satisfy(function (c) {
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
  list: parsec.item.startsWith('list').then(parsec.spaces),
  head: parsec.item.startsWith('head').then(parsec.spaces),
  tail: parsec.item.startsWith('tail').then(parsec.spaces),
  last: parsec.item.startsWith('last').then(parsec.spaces),
  init: parsec.item.startsWith('init').then(parsec.spaces),
  join: parsec.item.startsWith('join').then(parsec.spaces),
  eval: parsec.item.startsWith('eval').then(parsec.spaces),
  length: parsec.item.startsWith('length').then(parsec.spaces),
  def: parsec.item.startsWith('def').then(parsec.spaces),
  func: parsec.item.startsWith('#').then(parsec.spaces)
};