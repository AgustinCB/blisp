'use strict'

import * as lang from './language'
import {list} from './language/operations'

export default class Interpreter {
  constructor () {
    this.prompt = '> '
    this.history = []
  }

  addHistory (input) {
    this.history.push(input)
  }

  parseError (res) {
    const input = res.input
    if (res.unconsumedStrings && res.unconsumedStrings[0]) {
      throw new Error(
        `Unexpected input (col ${input.indexOf(res.unconsumedStrings[0])}): "${res.unconsumedStrings[0]}"`
      )
    }
  }

  interpret (input) {
    this.addHistory(input)
    const res = lang.statment.parse(input)

    this.parseError(res)

    return res
  }
}
