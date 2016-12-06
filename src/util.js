'use strict'

import {QExpression} from './language/expressions'

const whitespaces = ' \n\t\v\f\r'

/**
 * Alias for promisify where the callback receives (res)
 */
export function promisifyInverse () {
  return invertPromise(promisify(...arguments))
}

/**
 * Function to promisify a typical callback
 * Expects first argument to be the async function
 * The rest of arguments to be the arguments of the function, except for the callback
 * And the callback to receive paramenters (error, res)
 */
export function promisify () {
  const args = [...arguments]
  const fn = args[0]
  const fnArgs = args.slice(1)

  return new Promise((resolve, reject) => {
    fnArgs.push((err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
    fn(...fnArgs)
  })
}

/**
 * Function to invert a promise
 * @param {Promise} promise to invert
 * @return {Promise}
 */
export function invertPromise (promise) {
  return promise
    .then((res) => Promise.reject(res))
    .catch((err) => Promise.resolve(err))
}

export const isSpace = (str) =>
  whitespaces.includes(str)

export const toArray = (value) => {
  if (value === undefined) return value
  if (value.constructor === Array) return value
  if (value.constructor === QExpression) return value
  return [ value ]
}
