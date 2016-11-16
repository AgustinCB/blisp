'use strict'

import fs from 'fs'
import path from 'path'
import * as lang from './language'
import {list} from './language/operations'
import {promisify} from './util'

export default class Interpreter {
  constructor (prompt) {
    if (prompt === undefined) prompt = '> '
    if (typeof prompt !== 'string') prompt = ''
    this.prompt = '' + prompt
    this.history = []

    //this.loadStandardLib()
  }

  loadStandardLib () {
    const lib = './src/language/stdlib',
      readFile = (file) => {
        console.log('asd', file, lib)
        return promisify(fs.readFile, path.join(lib, file))
      }, loadCode = (code) => {
        this.interpret(code)
      }

    return promisify(fs.readdir, )
      .then((files) =>
        files
          .filter((file) => file.endsWith('.blisp'))
          .forEach((file) => readFile(file).then(loadCode))
      )
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
