'use strict'

import {executeElement} from './util'
import {SExpression, QExpression} from '../expressions'
import Symbol from '../symbol'
import environment from '../environment'

export const def = function () {
  const args = [...arguments]

  if (args.length < 2) throw new Error('You should pass at least two arguments')

  const symbols = args[0]
  const values = args.slice(1)

  if (symbols.constructor === SExpression) {
    return def(new QExpression([ symbols.run() ]), ...values)
  }

  if (symbols instanceof Symbol) {
    return def(symbols.value, ...values)
  }

  if (!(symbols instanceof QExpression)) {
    throw new Error('First paramenter should be a QExpression')
  }

  const env = values.length - symbols.length === 1
    ? values.pop()
    : undefined

  if (symbols.length !== values.length) {
    throw new Error('You should pass equal number of symbols and values')
  }

  symbols.forEach((symbol, index) => {
    environment.set(symbol.name, executeElement(values[index]), env)
  })
}

export const global = function () {
  def(...arguments, 'global')
}

export const func = function () {
  const args = [...arguments]

  if (args.length < 2) throw new Error('You should pass two arguments')

  const argList = args[0].constructor === SExpression ? new QExpression(args[0].run()) : args[0]
  const body = args[1] instanceof Symbol ? args[1].value : args[1]

  if (!(argList instanceof QExpression) || !(body instanceof QExpression)) {
    throw new Error('Paramenters should be instance of QExpression')
  }

  if (!argList.reduce((acc, next) => acc && next instanceof Symbol, true)) {
    throw new Error('List of paramenters should be symbols')
  }

  // Check for dynamic arguments
  const extraArgs = argList.last.name[0] === '&' ? argList.last : false

  const result = function () {
    const funcArgs = [...arguments].map((arg) => arg instanceof Symbol ? arg.value : arg)

    if (funcArgs.length > argList.length && !extraArgs) {
      throw new Error('Passing too many arguments!')
    }
    if (funcArgs.length < argList.length) {
      return this.bind(this, ...funcArgs)
    }
    if (extraArgs) {
      funcArgs[argList.length - 1] = new QExpression(funcArgs.slice(argList.length - 1))
    }

    environment.addNamespace(body.toString())

    argList.forEach((symbol, index) =>
      environment.set(symbol.name, funcArgs[index])
    )

    const result = body.execute()

    environment.popNamespace()
    return result
  }
  return result.bind(result)
}

export const partial = function () {
  const args = [...arguments]

  if (args[0].constructor !== Function) throw new Error('Partial should take a function')
  return args[0].bind(...args)
}
