'use strict'

import fs from 'fs'
import path from 'path'
import * as lang from './language'
import {promisify} from './util'

export default class Interpreter {
  constructor (prompt) {
    if (prompt === undefined) prompt = '> '
    if (typeof prompt !== 'string') prompt = ''
    this.prompt = '' + prompt
    this.history = []
  }

  loadStandardLib () {
    const lib = './src/language/stdlib'
    const readFile = (file) => {
      return promisify(fs.readFile, path.join(lib, file))
    }
    const loadCode = (code) => {
      code.toString().split('\n').forEach((codeLine) =>
        this.interpret(codeLine)
      )
    }
    const handleErr = (err) => console.log('Error: ', err)

    return promisify(fs.readdir, lib)
      .then((files) =>
        files
          .filter((file) => file.endsWith('.blisp'))
          .forEach((file) =>
            readFile(file).then(loadCode).catch(handleErr)
          )
      )
      .catch(handleErr)
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
