'use strict'

import chai from 'chai'
import Interpreter from '../lib/interpreter'

const should = chai.should()

describe('#interpret', function() {
  it('should interpret a simple statment', function () {
    const interpreter = new Interpreter()

    interpreter.interpret('(eval 4)').get().should.equal(4)
  })

  it('should handle syntax errors', function () {
    const interpreter = new Interpreter()

    console.log(interpreter.interpret('(eval 4'))
  })
})
