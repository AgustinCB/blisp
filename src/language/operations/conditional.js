'use strict'

import {processElement} from './util'

export const ifcond = function () {
  const args = [...arguments]

  if (args.length < 2) throw new Error('Conditions needs at least two arguments')

  if (processElement(true, args[0])) return args[1].run ? args[1].run() : args[1]
  else if (args[2]) return args[2].run ? args[2].run() : args[2]
}

export const unless = function () {
  const args = [...arguments]
  return ifcond(!args[0], ...args.slice(1))
}
