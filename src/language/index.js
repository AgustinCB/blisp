'use strict'

import * as parsec from 'happy-parser'
import * as operations from './operations'
import * as grammar from './grammar'
import {SExpression, QExpression} from './expressions'

const lazyList = parsec.lazy(() => list)

const evaluationStatment = grammar.chars.graveAccent.then(lazyList.or(grammar.types.symbol)).then((elements) => operations.list.evaluate(elements))
const unevaluatedStatment = grammar.chars.singleQuote.then(lazyList).then((elements) => new QExpression(elements))
const evaluatedStatment = lazyList.then((elements) => new SExpression(elements))

export const statment =
  evaluatedStatment
    .or(unevaluatedStatment, grammar.comment)
    .then((expression) => expression.run())
    .or(evaluationStatment)

const builtins = parsec.Parser.operations(
  [ grammar.chars.plus, operations.number.plus ],
  [ grammar.chars.minus, operations.number.rest ],
  [ grammar.chars.times, operations.number.mult ],
  [ grammar.chars.slash, operations.number.div ],
  [ grammar.keywords.filter, operations.list.filter ],
  [ grammar.keywords.map, operations.list.map ],
  [ grammar.keywords.foreach, operations.list.foreach ],
  [ grammar.keywords.reduce, operations.list.reduce ],
  [ grammar.keywords.list, operations.list.list ],
  [ grammar.keywords.head, operations.list.head ],
  [ grammar.keywords.tail, operations.list.tail ],
  [ grammar.keywords.last, operations.list.last ],
  [ grammar.keywords.init, operations.list.init ],
  [ grammar.keywords.join, operations.list.join ],
  [ grammar.keywords.eval, operations.list.evaluate ],
  [ grammar.keywords.length, operations.list.length ],
  [ grammar.keywords.func, operations.definition.func ],
  [ grammar.keywords.partial, operations.definition.partial ],
  [ grammar.keywords.def, operations.definition.def ],
  [ grammar.keywords.defmacro, operations.definition.defmacro ],
  [ grammar.keywords.global, operations.definition.global ],
  [ grammar.keywords.print, operations.io.print ],
  [ grammar.keywords.error, operations.io.error ],
  [ grammar.keywords.load, operations.io.load.bind(operations.io.load, statment) ],
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

const list = builtins.or(
    grammar.types.boolean, grammar.keywords.nil, grammar.types.symbol,
    grammar.types.string, grammar.types.float, parsec.int,
    unevaluatedStatment, evaluatedStatment, evaluationStatment
  ).trim()
  .many(Array)
  .between(...grammar.chars.parenthesis)
