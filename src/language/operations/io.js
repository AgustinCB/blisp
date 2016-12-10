'use strict'

// import fs from 'fs'

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

  console.log(statment, files, args)
}
