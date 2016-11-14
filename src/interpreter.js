'use strict'

import * as lang from './language'
import {list} from './language/operations'

export default class Interpreter {
  constructor (prompt) {
    if (prompt === undefined) prompt = '> '
    if (typeof prompt !== 'string') prompt = ''
    this.prompt = '' + prompt
    this.history = []
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
    const res = lang.statment.parse(input)

    this.parseError(res)

    return res
  }
}
