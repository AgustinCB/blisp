'use strict'

import {SExpression, QExpression} from './expressions'
import Symbol from './symbol'
import environment from './environment'
import {toArray} from '../util'

const processList = (list) => {
  if (list.length === 1 &&
    ((list[0].length !== undefined && typeof list[0] !== 'string') || list[0] instanceof Symbol)) {
    list = list[0] instanceof Symbol? list[0].value : list[0]
  }
  if (list instanceof QExpression) {
    return list.run()
  }
  if (list instanceof SExpression) {
    list = list.run()
  }
  list = toArray(list)
  return list.map((item) => {
    if (item instanceof SExpression) return item.run()
    if (item instanceof Symbol) return item.value
    return item
  })
}

export const int = {
  plus: function () {
    const args = processList([...arguments])
    return args.reduce((acc, prev) => acc + prev, 0)
  },
  rest: function () {
    let args = processList([...arguments])
    if (args.length == 1) args = [ 0, args[0] ]
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
    
    return args.reduce((acc, next) => acc.concat(next), [])
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
    const args = [...arguments]

    if (!args.length) return new Error('And function needs arguments')
    return args.findIndex((val) => !val) >= 0
  },
  or: function () {
    const args = [...arguments]

    if (!args.length) return new Error('Or function needs arguments')
    return args.findIndex((val) => !!val) >= 0
  },
  not: function () {
    const args = [...arguments]

    if (!args.length) return new Error('Not function needs arguments')
    return !args[0]
  }
}

export const conditionals = {
  'if': function () {
    const args = [...arguments]

    if (args.length < 2) return new Error('Conditions needs at least two arguments')

    if (args[0]) return args[1].run()
    else if (args[2]) return args[2].run()
  },
  'if-not': function () {
    return this.if(!arguments[0], ...arguments[1].slice(1))
  },
  'unless': function () {
    return this['if-not'](...arguments)
  }
}

export const def = function () {
  const args = [...arguments]

  if (args.length < 2) return new Error('You should pass at least two arguments')

  const symbols = (function () {
    if (args[0] instanceof Symbol) return args[0].dry_value
    if (args[0].constructor === SExpression) return args[0].run()
    return args[0]
  })()
  const values = args.slice(1)

  if (symbols instanceof Symbol) {
    return environment.set(symbols.name, values[0], values[1])
  }

  if (!(symbols instanceof SExpression)) {
    return new Error('First paramenter should be a SExpression')
  }

  const env = values.length - symbols.length === 1?
    values.pop() :
    undefined

  if (symbols.length !== values.length) {
    return new Error('You should pass equal number of symbols and values')
  }

  symbols.list.forEach((symbol, index) => {
    environment.set(symbol.name, values[index], env)
  })
}

export const global = function () {
  def(...arguments, 'global')
}

export const func = function () {
  const args = [...arguments]

  if (args.length < 2) return new Error('You should pass at least two arguments')

  const arg_list = args[0].constructor === SExpression? new QExpression(args[0].run()) : args[0],
        body = args[1] instanceof Symbol? args[1].dry_value : args[1]

  if (!(arg_list instanceof QExpression) || !(body instanceof SExpression)) {
    return new Error('Paramenters should be instance of SExpression')
  }

  if (!arg_list.list.reduce((acc, next) => acc && next instanceof Symbol, true)) {
    return new Error('List of paramenters should be symbols')
  }

  // Check for dynamic arguments
  const dyn_args = arg_list.list.filter((symbol) => symbol.name[0] === '&')
  if (dyn_args.length > 1) {
    return new Error('Only one dynamic arguments name is allowed')
  }
  if (dyn_args[0] && arg_list.list.indexOf(dyn_args[0]) !== arg_list.length - 1) {
    return new Error('Dynamic arguments name should be the last one')
  }

  const result = function () {
    const extra_args = dyn_args[0],
      funcArgs = [...arguments].map((arg) => arg instanceof Symbol? arg.value : arg)

    if (funcArgs.length > arg_list.length && !extra_args) {
      return new Error('Passing too many arguments!')
    }
    if (funcArgs.length < arg_list.length) {
      return this.bind(this, ...funcArgs)
    }
    if (extra_args) {
      funcArgs[arg_list.length - 1] = new QExpression(funcArgs.slice(arg_list.length - 1))
    }

    environment.addNamespace(body.toString())

    arg_list.list.forEach((symbol, index) =>
      environment.set(symbol.name, funcArgs[index])
    )

    const result = body.run()

    environment.popNamespace()
    return result
  }
  return result.bind(result)
}
