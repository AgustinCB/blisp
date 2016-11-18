'use strict'

/**
 * Abstraction of readline using promises
 */
export default class Reader {
  constructor (input = process.stdin, output = process.stdout) {
    this.input = input
    this.output = output
    this.cache = []
    this.errors = []
    this.input.on('data', this.newData.bind(this))
    this.input.on('error', this.newError.bind(this))
    this.input.on('end', this.close.bind(this))
  }

  ask (question) {
    this.output.write(question)
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.errors.length) {
          clearInterval(interval)
          reject(this.errors.pop())
        }
        if (this.cache.length) {
          clearInterval(interval)
          resolve(this.cache.pop())
        }
      }, 100)
    })
  }

  newData(data) {
    this.cache.push(data.toString())
  }

  newError(error) {
    this.errors.push(data.toString())
  }

  close () {
    // Something to do here?
  }
}
