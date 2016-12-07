'use strict'

import {processList} from './util'

export const plus = function () {
  const args = processList([...arguments])
  return args.reduce((acc, prev) => acc + prev, 0)
}

export const rest = function () {
  const args = processList([...arguments])
  if (args.length === 1) return rest([ 0, args[0] ])
  return args.slice(1).reduce((acc, prev) => acc - prev, args[0])
}

export const mult = function () {
  const args = processList([...arguments])
  return args.reduce((acc, prev) => acc * prev, 1)
}

export const div = function () {
  const args = processList([...arguments])
  if (args.length === 1) return div([ 1, args[0] ])
  if (args.slice(1).find((c) => c === 0) === 0) throw new Error('Division by zero')
  return args.slice(1).reduce((acc, prev) => acc / prev, args[0])
}
