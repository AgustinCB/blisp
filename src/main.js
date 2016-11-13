'use strict'

import Reader from './reader'
import Interpreter from './interpreter'

const main = () => {
  const interpreter = new Interpreter(),
    rl = new Reader(),
    read = function () {
      return rl.ask(interpreter.prompt)
        .then((input) => {
          const result = interpreter.interpret(input)

          if (!result.length) throw new Error('Wrong syntax!!')

          const response = result.get()

          if (response instanceof Error) throw response

          console.log(response)

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
  main()
    .catch((err) => console.log('An error happened!', err))
}
