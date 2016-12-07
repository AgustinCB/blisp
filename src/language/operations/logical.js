'use strict'

import {processList, processElement} from './util'

export const and = function () {
  const args = processList([...arguments])

  if (!args.length) throw new Error('And function needs arguments')
  return args.findIndex((val) => !val) === -1
}

export const or = function () {
  const args = processList([...arguments])

  if (!args.length) throw new Error('Or function needs arguments')
  return args.findIndex((val) => !!val) >= 0
}

export const not = function () {
  const args = [...arguments]

  if (!args.length) throw new Error('Not function needs arguments')
  return !processElement(true, args[0])
}
