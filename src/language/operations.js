'use strict'

import {SExpression, QExpression} from './expressions'
import Symbol from './symbol'
import environment from './environment'
import {toArray} from '../util'

const processElement = (execution, item) => {
  if (execution && item instanceof SExpression) return item.run()
  if (execution && item instanceof Symbol) return item.value
  return item
}
const processList = (list) => {
  if (list.length === 1 &&
    ((list[0].length !== undefined && typeof list[0] !== 'string') || list[0] instanceof Symbol)) {
    list = list[0] instanceof Symbol ? list[0].value : list[0]
  }
  if (list instanceof SExpression) {
    list = list.run()
  }
  list = toArray(list)
  return list.map(processElement.bind(null, !(list instanceof QExpression)))
}

export const int = {
  plus: function () {
    const args = processList([...arguments])
    return args.reduce((acc, prev) => acc + prev, 0)
  },
  rest: function () {
    let args = processList([...arguments])
    if (args.length === 1) args = [ 0, args[0] ]
    return args.slice(1).reduce((acc, prev) => acc - prev, args[0])
  },
  mult: function () {
    const args = processList([...arguments])
    return args.reduce((acc, prev) => acc * prev, 1)
  },
  div: function () {
    let args = processList([...arguments])
    if (args.length === 1) args = [ 1, args[0] ]
    if (args.slice(1).find((c) => c === 0) === 0) return new Error('Division by zero')
    return args.slice(1).reduce((acc, prev) => acc / prev, args[0])
  }
}

export const list = {
  list: function () {
    return processList([...arguments])
  },
  head: function () {
    const args = processList([...arguments])

    if (args.length === undefined) return new Error('Head takes arguments!')

    return args[0]
  },
  tail: function () {
    const args = processList([...arguments])

    if (args.length === undefined) return new Error('Tail takes arguments!')

    return args.slice(1)
  },
  last: function () {
    const args = processList([...arguments])

    if (args.length === undefined) return new Error('Last takes arguments!')

    return args.slice(-1)[0]
  },
  init: function () {
    const args = processList([...arguments])

    if (args.length === undefined) return new Error('Init takes arguments!')

    return args.slice(0, -1)
  },
  join: function () {
    const args = processList([...arguments])

    if (args.length === undefined) return new Error('Join takes arguments!')

    return args.reduce((acc, next) => acc.concat(next.list ? next.list : next), [])
  },
  eval: function () {
    const args = [...arguments]

    if (!args.length) return new Error('Eval takes one argument!')

    if (args[0] instanceof Symbol) {
      args[0] = args[0].value
    }

    if (args[0] instanceof SExpression) {
      args[0] = args[0].run()
    }

    if (args[0].length !== undefined && typeof args[0] !== 'string' && typeof args[0] !== 'function') {
      return SExpression.run(args[0])
    }

    return args[0]
  },
  length: function () {
    const args = processList([...arguments])

    if (!args || args.length === undefined) return 0

    return args.length
  }
}

const boolOp = function (condition) {
  const args = [...arguments].slice(1)

  if (!args.length) return new Error('Equals function needs arguments')
  for (let i in args) {
    const val = args[i]
    if (i > 0 && !condition(args[i - 1], val)) return false
  }
  return true
}
export const comparison = {
  equals: function () {
    return boolOp((val1, val2) => val1 === val2, ...arguments)
  },
  notEquals: function () {
    return boolOp((val1, val2) => val1 !== val2, ...arguments)
  },
  greaterThan: function () {
    return boolOp((val1, val2) => val1 > val2, ...arguments)
  },
  lesserThan: function () {
    return boolOp((val1, val2) => val1 < val2, ...arguments)
  },
  greaterOrEqualsThan: function () {
    return boolOp((val1, val2) => val1 >= val2, ...arguments)
  },
  lesserOrEqualsThan: function () {
    return boolOp((val1, val2) => val1 <= val2, ...arguments)
  }
}

export const boolean = {
  and: function () {
    const args = processList([...arguments])

    if (!args.length) return new Error('And function needs arguments')
    return args.findIndex((val) => !val) === -1
  },
  or: function () {
    const args = processList([...arguments])

    if (!args.length) return new Error('Or function needs arguments')
    return args.findIndex((val) => !!val) >= 0
  },
  not: function () {
    const args = [...arguments]

    if (!args.length) return new Error('Not function needs arguments')
    return !processElement(true, args[0])
  }
}

export const conditionals = {
  'if': function () {
    const args = [...arguments]

    if (args.length < 2) return new Error('Conditions needs at least two arguments')

    if (processElement(true, args[0])) return args[1].run()
    else if (args[2]) return args[2].run()
  },
  unless: function () {
    const args = [...arguments]
    return conditionals.if(!args[0], ...args.slice(1))
  }
}

export const def = function () {
  const args = [...arguments]

  if (args.length < 2) return new Error('You should pass at least two arguments')

  const symbols = (function () {
    if (args[0] instanceof Symbol) return args[0].value
    if (args[0].constructor === SExpression) return args[0].run()
    return args[0]
  })()
  const values = args.slice(1)

  if (symbols instanceof Symbol) {
    return def(new QExpression([ symbols ]), ...values)
    //return environment.set(symbols.name, values[0], values[1])
  }

  if (!(symbols instanceof QExpression)) {
    return new Error('First paramenter should be a QExpression')
  }

  const env = values.length - symbols.length === 1
    ? values.pop()
    : undefined

  if (symbols.length !== values.length) {
    return new Error('You should pass equal number of symbols and values')
  }

  symbols.list.forEach((symbol, index) => {
    const val = values[index].constructor === QExpression
      ? values[index]
      : processElement(true, values[index])
    environment.set(symbol.name, val, env)
  })
}

export const global = function () {
  def(...arguments, 'global')
}

export const func = function () {
  const args = [...arguments]

  if (args.length < 2) return new Error('You should pass at least two arguments')

  const argList = args[0].constructor === SExpression ? new QExpression(args[0].run()) : args[0]
  const body = args[1] instanceof Symbol ? args[1].value : args[1]

  if (!(argList instanceof QExpression) || !(body instanceof QExpression)) {
    throw new Error('Paramenters should be instance of QExpression')
  }

  if (!argList.list.reduce((acc, next) => acc && next instanceof Symbol, true)) {
    throw new Error('List of paramenters should be symbols')
  }

  // Check for dynamic arguments
  const dynArgs = argList.list.filter((symbol) => symbol.name[0] === '&')
  if (dynArgs.length > 1) {
    throw new Error('Only one dynamic arguments name is allowed')
  }
  if (dynArgs[0] && argList.list.indexOf(dynArgs[0]) !== argList.length - 1) {
    throw new Error('Dynamic arguments name should be the last one')
  }

  const result = function () {
    const extraArgs = dynArgs[0]
    const funcArgs = [...arguments].map((arg) => arg instanceof Symbol ? arg.value : arg)

    if (funcArgs.length > argList.length && !extraArgs) {
      return new Error('Passing too many arguments!')
    }
    if (funcArgs.length < argList.length) {
      return this.bind(this, ...funcArgs)
    }
    if (extraArgs) {
      funcArgs[argList.length - 1] = new QExpression(funcArgs.slice(argList.length - 1))
    }

    environment.addNamespace(body.toString())

    argList.list.forEach((symbol, index) =>
      environment.set(symbol.name, funcArgs[index])
    )

    const result = body.execute()

    environment.popNamespace()
    return result
  }
  return result.bind(result)
}
