'use strict'

import * as parsec from 'happy-parser'

export const symbolName = parsec.letter.or(parsec.symbol, parsec.int).satisfy((c) =>
  c !== '(' && c !== ')' && c !== '\''
).many().satisfy((c) =>
  !c.split('').reduce((acc, v) => acc && !isNaN(parseInt(v)), true)
).trim()

export const chars = {
  parenthesis: [
    parsec.char('('),
    parsec.char(')')
  ],
  singleQuote: parsec.char("'"),
  plus: parsec.char('+'),
  minus: parsec.char('-'),
  times: parsec.char('*'),
  slash: parsec.char('/')
}

export const keywords = {
  list: parsec.item.startsWith('list').then(parsec.spaces),
  head: parsec.item.startsWith('head').then(parsec.spaces),
  tail: parsec.item.startsWith('tail').then(parsec.spaces),
  last: parsec.item.startsWith('last').then(parsec.spaces),
  init: parsec.item.startsWith('init').then(parsec.spaces),
  join: parsec.item.startsWith('join').then(parsec.spaces),
  eval: parsec.item.startsWith('eval').then(parsec.spaces),
  length: parsec.item.startsWith('length').then(parsec.spaces),
  def: parsec.item.startsWith('def').then(parsec.spaces),
  global: parsec.item.startsWith('global').then(parsec.spaces),
  equals: parsec.item.startsWith('=').then(parsec.spaces),
  notEquals: parsec.item.startsWith('!=').then(parsec.spaces),
  greaterThan: parsec.item.startsWith('>').then(parsec.spaces),
  lesserThan: parsec.item.startsWith('<').then(parsec.spaces),
  greaterOrEqualsThan: parsec.item.startsWith('>=').then(parsec.spaces),
  lesserOrEqualsThan: parsec.item.startsWith('<=').then(parsec.spaces),
  and: parsec.item.startsWith('and').then(parsec.spaces),
  or: parsec.item.startsWith('or').then(parsec.spaces),
  not: parsec.item.startsWith('not').then(parsec.spaces),
  if: parsec.item.startsWith('if').then(parsec.spaces),
  unless: parsec.item.startsWith('unless').then(parsec.spaces),
  'false': parsec.item.startsWith('false').then(parsec.spaces).then(false),
  'true': parsec.item.startsWith('true').then(parsec.spaces).then(true),
  func: parsec.item.startsWith('#').then(parsec.spaces)
}
