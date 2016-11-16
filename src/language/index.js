'use strict'

import * as parsec from 'happy-parser'
import * as operations from './operations'
import * as grammar from './grammar'
import Symbol from './symbol'
import {SExpression, QExpression} from './expressions'

export const builtins = parsec.Parser.operations(
  [ grammar.chars.plus, operations.int.plus ],
  [ grammar.chars.minus, operations.int.rest ],
  [ grammar.chars.times, operations.int.mult ],
  [ grammar.chars.slash, operations.int.div ],
  [ grammar.keywords.list, operations.list.list ],
  [ grammar.keywords.head, operations.list.head ],
  [ grammar.keywords.tail, operations.list.tail ],
  [ grammar.keywords.last, operations.list.last ],
  [ grammar.keywords.init, operations.list.init ],
  [ grammar.keywords.join, operations.list.join ],
  [ grammar.keywords.eval, operations.list.eval ],
  [ grammar.keywords.length, operations.list.length ],
  [ grammar.keywords.func, operations.func ],
  [ grammar.keywords.def, operations.def ]
).trim()

const symbol = grammar.symbol_name.then((symbol_name) => {
  return new Symbol(symbol_name)
})

const factor = parsec.lazy(() =>
  parsec.int.or(list, unevaluatedStatment)
)

const list = parsec.lazy(() =>
  builtins.or(symbol, factor).trim().many()
  .between(...grammar.chars.parenthesis).then((elements) => new SExpression(elements))
).trim()

const unevaluatedStatment = parsec.lazy(() => grammar.chars.singleQuote.then(list).then((sexp) => new QExpression(sexp.list)))
const evaluatedStatment = list.then((expr) => expr.run()).or(unevaluatedStatment)

export const statment = evaluatedStatment
