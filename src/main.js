'use strict'

import Reader from './reader'

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
    return input
  }
}

const main = () => {
  const interpreter = new Interpreter(),
    rl = new Reader(),
    read = function () {
      return rl.ask(interpreter.prompt)
        .then((res) => {
          console.log(interpreter.interpret(res))
          return read()
        })
    }

  return read()
}

if (require.main === module) {
  main()
    .catch((err) => console.log('An error happened!', err))
}
