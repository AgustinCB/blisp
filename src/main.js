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
  const interpreter = new Interpreter(prompt),
    inputStream = file? fs.createReadStream(file) : process.stdout

  if (command) {
    console.log(getResponse(interpreter, command))
    return Promise.resolve()
  }

  const rl = new Reader(inputStream),
    read = function () {
      return rl.ask(interpreter.prompt)
        .then((input) => {
          if (!input) return
          input = input.toString().trim()

          input.split('\n').forEach((line) =>
            console.log(getResponse(interpreter, line))
          )

          return read()
        })
        .catch((err) => {
          console.log(err)
          return read()
        })
    }

  return read()
}

if (require.main === module) {
  const argv = minimist(process.argv.slice(2)),
    command = argv._[0],
    file = argv.file || argv.f,
    prompt = argv.prompt || argv.p
  main(command, file, prompt)
    .catch((err) => console.log('An error happened!', err))
}
