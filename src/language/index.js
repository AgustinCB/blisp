'use strict'

import * as parsec from 'happy-parser'
import * as operations from './operations'
import * as grammar from './grammar'
import Symbol from './symbol'
import {SExpression, QExpression} from './expressions'

const builtins = parsec.Parser.operations(
  [ grammar.chars.plus, operations.number.plus ],
  [ grammar.chars.minus, operations.number.rest ],
  [ grammar.chars.times, operations.number.mult ],
  [ grammar.chars.slash, operations.number.div ],
  [ grammar.keywords.list, operations.list.list ],
  [ grammar.keywords.head, operations.list.head ],
  [ grammar.keywords.tail, operations.list.tail ],
  [ grammar.keywords.last, operations.list.last ],
  [ grammar.keywords.init, operations.list.init ],
  [ grammar.keywords.join, operations.list.join ],
  [ grammar.keywords.eval, operations.list.evaluate ],
  [ grammar.keywords.length, operations.list.length ],
  [ grammar.keywords.func, operations.definition.func ],
  [ grammar.keywords.def, operations.definition.def ],
  [ grammar.keywords.global, operations.definition.global ],
  [ grammar.keywords.greaterThan, operations.comparison.greaterThan ],
  [ grammar.keywords.lesserThan, operations.comparison.lesserThan ],
  [ grammar.keywords.greaterOrEqualsThan, operations.comparison.greaterOrEqualsThan ],
  [ grammar.keywords.lesserOrEqualsThan, operations.comparison.lesserOrEqualsThan ],
  [ grammar.keywords.equals, operations.comparison.equals ],
  [ grammar.keywords.notEquals, operations.comparison.notEquals ],
  [ grammar.keywords.and, operations.logical.and ],
  [ grammar.keywords.or, operations.logical.or ],
  [ grammar.keywords.not, operations.logical.not ],
  [ grammar.keywords.if, operations.conditional.ifcond ],
  [ grammar.keywords.unless, operations.conditional.unless ]
).trim()

const booleans = grammar.keywords.false.or(grammar.keywords.true).trim()

const symbol = grammar.symbolName.then((symbolName) => new Symbol(symbolName))

const factor = parsec.lazy(() =>
  parsec.int.or(list, unevaluatedStatment)
)

const list = parsec.lazy(() =>
  builtins.or(booleans, symbol, factor).trim().many()
  .between(...grammar.chars.parenthesis).then((elements) => new SExpression(elements))
).trim()

const unevaluatedStatment = parsec.lazy(() => grammar.chars.singleQuote.then(list).then((sexp) => new QExpression(sexp.list)))
const evaluatedStatment = list.then((expr) => expr.run()).or(unevaluatedStatment)

export const statment = evaluatedStatment
