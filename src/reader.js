'use strict'

import {promisifyInverse as promisify} from './util'

/**
 * Abstraction of readline using promises
 */
export default class Reader {
  constructor (input = process.stdin, output = process.stdout) {
    this.input = input
    this.output = output
  }

  ask (question) {
    this.output.write(question)
    return new Promise((resolve, reject) => {
      this.input.on('data', resolve)
      this.input.on('error', reject)
      this.input.on('end', resolve)
    })
  }
}
