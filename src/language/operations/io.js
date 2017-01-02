'use strict'

import fs from 'fs'

import {processList} from './util'

export const print = function () {
  const args = processList([...arguments])
  console.log(...args)
}

export const error = function () {
  throw new Error([...arguments].join(' '))
}

export const load = function () {
  const args = [...arguments]
  const statment = args[0]
  const files = args.slice(1)

  files.forEach((file) => {
    const content = fs.readFileSync(file).toString()
    statment.many().parse(content)
  })
}
