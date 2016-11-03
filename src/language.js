'use strict'

import * as parsec from 'happy-parser'

const operations = {
  plus: function () {
    return [...arguments].reduce((acc, prev) => acc + prev, 0)
  },
  rest: function () {
    let args = [...arguments]
    if (args.length == 1) args = [ 0, args[0] ]
    return args.slice(1).reduce((acc, prev) => acc - prev, args[0])
  },
  mult: function () {
    return [...arguments].reduce((acc, prev) => acc * prev, 1)
  },
  div: function () {
    let args = [...arguments]
    if (args.length == 1) args = [ 1, args[0] ]
    return args.slice(1).reduce((acc, prev) => acc / prev, args[0])
  }
}

const parenthesis = [
  parsec.char('('),
  parsec.char(')')
]

const operators = parsec.Parser.operations(
  [ parsec.char('+'), operations.plus ],
  [ parsec.char('-'), operations.rest ],
  [ parsec.char('*'), operations.mult ],
  [ parsec.char('/'), operations.div ]
)

const factor = parsec.lazy(() =>
  parsec.int.or(expr.between(...parenthesis)).then((res) =>
    parsec.spaces.orNone().then(res)
  )
)

export const expr = parsec.lazy(() =>
  operators.then((op) =>
    parsec.spaces.then((_) =>
      factor.many().then((factors) =>
        op(...factors)
      )
    )
  )
).trim()
