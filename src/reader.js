'use strict'

import EventEmitter from 'events'
import * as rlp from 'readline-promise'

/**
 * Abstraction of readline using promises
 */
export default class Reader extends EventEmitter {
  constructor (input = process.stdin, output = process.stdout) {
    super()
    this.cache = []
    this.errors = []
    this.output = output
    this.completed = false

    this.interface = rlp.createInterface({ input, output })
    this.interface.each(this.newData.bind(this))
      .caught(this.newError.bind(this))
      .then(() => this.completed = true)
  }

  ask (question) {
    if (question) this.output.write(question)
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (!this.errors.length && !this.cache.length && this.completed) {
          clearInterval(interval)
          this.emit('close')
        }
        if (this.errors.length) {
          clearInterval(interval)
          reject(this.errors.shift())
        }
        if (this.cache.length) {
          clearInterval(interval)
          resolve(this.cache.shift())
        }
      }, 5)
    })
  }

  newData(data) {
    this.cache.push(data.toString())
  }

  newError(error) {
    this.errors.push(data.toString())
  }
}
