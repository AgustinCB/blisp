'use strict'

import fs from 'fs'
import minimist from 'minimist'
import Reader from './reader'
import Interpreter from './interpreter'

const getResponse = (interpreter, input) => {
  const result = interpreter.interpret(input)

  if (!result.length) throw new Error('Wrong syntax!!')

  const response = result.get()

  if (response instanceof Error) throw response

  return response
}

const main = (command, file, prompt) => {
  const inputStream = file ? fs.createReadStream(file) : process.stdin
  const rl = new Reader(inputStream)
  const interpreter = new Interpreter(prompt)

  if (command) {
    console.log(getResponse(interpreter, command))
    return Promise.resolve()
  }

  let done = false

  rl.on('close', _ => { done = true })
  const read = function () {
    return rl.ask(interpreter.prompt)
      .then((input) => {
        input = input.toString().trim()
        if (!input) return read()

        input.split('\n').forEach((line) =>
          console.log(getResponse(interpreter, line))
        )

        if (!done) return read()
      })
      .catch((err) => {
        console.log(err)
        if (!done) return read()
      })
  }

  return read()
}

if (require.main === module) {
  const argv = minimist(process.argv.slice(2))
  const command = argv._[0]
  const file = argv.file || argv.f
  const prompt = argv.prompt || argv.p
  main(command, file, prompt)
    .catch((err) => console.log('An error happened!', err))
}
