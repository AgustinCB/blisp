'use strict'

import * as parsec from 'happy-parser'
import Symbol from './symbol'
import Comment from './comment'

export const symbolName = parsec.letter.or(parsec.symbol, parsec.digit).satisfy((c) =>
  c !== '(' && c !== ')' && c !== '"' && c !== '\''
).many().satisfy((c) =>
  !c.split('').reduce((acc, v) => acc && !isNaN(parseInt(v)), true) && isNaN(parseFloat(c))
).trim()

export const chars = {
  parenthesis: [
    parsec.char('('),
    parsec.char(')')
  ],
  doubleQuote: parsec.char('"'),
  singleQuote: parsec.char("'"),
  dot: parsec.char('.'),
  plus: parsec.char('+'),
  minus: parsec.char('-'),
  times: parsec.char('*'),
  slash: parsec.char('/')
}

export const keywords = {
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
  print: parsec.item.startsWith('print').then(parsec.space.many()),
  error: parsec.item.startsWith('error').then(parsec.space.many()),
  load: parsec.item.startsWith('load').then(parsec.space.many()),
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
  nil: parsec.item.startsWith('nil').trim().then([]),
  func: parsec.item.startsWith('#').then(parsec.space.many()),
  partial: parsec.item.startsWith('partial').then(parsec.space.many())
}

const stringLiteral = parsec.satisfy((letter) => letter !== '"').many()
const string = stringLiteral.between(chars.doubleQuote).trim()

const boolean = keywords.false.or(keywords.true).trim()

const float = parsec.item.equals('-')
  .then((minus) =>
    parsec.digit
      .or(chars.dot)
      .many()
      .then((f) => parseFloat(minus + f)), true)

const symbol = symbolName.then((symbolName) => new Symbol(symbolName))

export const types = {
  string, boolean, symbol, float
}

export const comment = parsec
                        .satisfy((first) => first === ';')
                        .then(parsec.item.manyOrNone())
                        .then(comment => new Comment(comment))
