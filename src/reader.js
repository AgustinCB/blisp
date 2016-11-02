'use strict'

import readline from 'readline'
import {promisifyInverse as promisify} from './util'

/**
 * Abstraction of readline using promises
 */
export default class Reader {
  constructor (input = process.stdin, output = process.stdout) {
    this.rl = readline.createInterface({ input, output })
  }

  ask (question) {
    return promisify(this.rl.question.bind(this.rl), question)
  }

  close () {
    this.rl.close()
  }
}
