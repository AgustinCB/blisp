'use strict'

import {processList} from './util'

const boolOp = function (condition) {
  const args = processList([...arguments].slice(1))

  if (!args.length) throw new Error('Equals function needs arguments')
  for (const i in args) {
    const val = args[i]
    if (i > 0 && !condition(args[i - 1], val)) return false
  }
  return true
}

export const equals = function () {
  return boolOp((val1, val2) => val1 === val2, ...arguments)
}

export const notEquals = function () {
  return boolOp((val1, val2) => val1 !== val2, ...arguments)
}

export const greaterThan = function () {
  return boolOp((val1, val2) => val1 > val2, ...arguments)
}

export const lesserThan = function () {
  return boolOp((val1, val2) => val1 < val2, ...arguments)
}

export const greaterOrEqualsThan = function () {
  return boolOp((val1, val2) => val1 >= val2, ...arguments)
}

export const lesserOrEqualsThan = function () {
  return boolOp((val1, val2) => val1 <= val2, ...arguments)
}
