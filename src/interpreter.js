'use strict'

import fs from 'fs'
import path from 'path'
import {statment} from './language'
import {promisify} from './util'

export default class Interpreter {
  constructor (prompt) {
    if (prompt === undefined) prompt = '> '
    if (typeof prompt !== 'string') prompt = ''
    this.prompt = '' + prompt
    this.history = []
  }

  loadStandardLib () {
    const lib = path.join(__dirname, '../src/language/stdlib')
    const handleErr = (err) => console.log('Error: ', err)

    return promisify(fs.readdir, lib)
      .then((files) =>
        files
          .filter((file) => file.endsWith('.blisp'))
          .forEach((file) =>
            this.interpret(`(load "${path.join(lib, file)}")`)
          )
      )
      .catch(handleErr)
  }

  parseError (res, input) {
    if (res.unconsumedStrings && res.unconsumedStrings[0]) {
      throw new Error(
        `Unexpected input (col ${input.indexOf(res.unconsumedStrings[0])}): "${res.unconsumedStrings[0]}"`
      )
    }
  }

  interpret (input) {
    const res = statment.parse(input)

    this.parseError(res, input)

    return res
  }
}
