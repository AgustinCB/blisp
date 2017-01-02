'use strict'

import {processList, executeElement} from './util'
import {SExpression} from '../expressions'

export const filter = function () {
  const [ func, list ] = processList([...arguments])

  if (func.constructor !== Function) {
    throw new Error('First argument should be a function')
  }

  if (list.constructor !== Array) {
    throw new Error('Second argument should be a list')
  }

  return list.filter(func)
}

export const map = function () {
  const [ func, list ] = processList([...arguments])

  if (func.constructor !== Function) {
    throw new Error('First argument should be a function')
  }

  if (list.constructor !== Array) {
    throw new Error('Second argument should be a list')
  }

  return list.map(func)
}

export const foreach = function () {
  const [ func, list ] = processList([...arguments])

  if (func.constructor !== Function) {
    throw new Error('First argument should be a function')
  }

  if (list.constructor !== Array) {
    throw new Error('Second argument should be a list')
  }

  return list.forEach(func)
}

export const reduce = function () {
  const [ func, list, init ] = processList([...arguments])

  if (func.constructor !== Function) {
    throw new Error('First argument should be a function')
  }

  if (list.constructor !== Array) {
    throw new Error('Second argument should be a list')
  }

  return list.reduce(func, init)
}

export const list = function () {
  return processList([...arguments])
}

export const head = function () {
  const args = processList([...arguments])

  if (args.length === undefined) throw new Error('Head takes arguments!')

  return args[0]
}

export const tail = function () {
  const args = processList([...arguments])

  if (args.length === undefined) throw new Error('Tail takes arguments!')

  return args.slice(1)
}

export const last = function () {
  const args = processList([...arguments])

  if (args.length === undefined) throw new Error('Last takes arguments!')

  return args.slice(-1)[0]
}

export const init = function () {
  const args = processList([...arguments])

  if (args.length === undefined) throw new Error('Init takes arguments!')

  return args.slice(0, -1)
}

export const join = function () {
  const args = processList([...arguments])

  if (args.length === undefined) throw new Error('Join takes arguments!')

  return args.reduce((acc, next) => acc.concat(next.list ? next.list : next), [])
}

export const evaluate = function () {
  const val = executeElement([...arguments][0])

  if (!val) throw new Error('Eval takes one argument!')

  if (val instanceof SExpression) {
    return val.execute()
  }

  if (val.constructor === Array) {
    return SExpression.run(val)
  }

  return val
}

export const length = function () {
  const args = processList([...arguments])

  if (!args || args.length === undefined) return 0

  return args.length
}
