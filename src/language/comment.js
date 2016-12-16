'use strict'

const FORMAT = '\x1b[36m'
const NORMAL = '\x1b[0m'

export default class {
  constructor (content) {
    this.content = content
  }

  run () {
    return this
  }

  toString () {
    return FORMAT + this.content + NORMAL
  }
}
