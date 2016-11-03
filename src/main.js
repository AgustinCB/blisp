'use strict'

import Reader from './reader'
import Interpreter from './interpreter'

const main = () => {
  const interpreter = new Interpreter(),
    rl = new Reader(),
    read = function () {
      return rl.ask(interpreter.prompt)
        .then((input) => {
          const result = interpreter.interpret(input),
            response = result.length ?
                          result.values[0] : // TODO: Create in the results a getter of values
                          'Ups, wrong syntax!!'
          console.log(response)
          return read()
        })
    }

  return read()
}

if (require.main === module) {
  main()
    .catch((err) => console.log('An error happened!', err))
}
