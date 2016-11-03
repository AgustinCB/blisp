'use strict'

import {expr} from './language'

export default class Interpreter {
  constructor () {
    this.prompt = '> '
    this.history = []
  }

  addHistory (input) {
    this.history.push(input)
  }

  interpret (input) {
    this.addHistory(input)
    return expr.parse(input)
  }
}
