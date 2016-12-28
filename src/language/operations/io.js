'use strict'

import fs from 'fs'

export const print = function () {
  console.log(...arguments)
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
    // content.split('\n').forEach(statment.parse.bind(statment))
  })
}
