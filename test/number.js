'use strict'

import chai from 'chai'
import {statment} from '../lib/language'

const should = chai.should()

describe('#number', function() {
  it('should sum numbers', function () {
    const res = statment.parse('(+ 1 2 3 4)')
    res.get().should.equal(10)
  })

  it('should rest numbers', function () {
    const res = statment.parse('(- 10 5 2 1)')
    res.get().should.equal(2)
  })

  it('should mult numbers', function () {
    const res = statment.parse('(* 10 2 1)')
    res.get().should.equal(20)
  })

  it('should divide numbers', function () {
    const res = statment.parse('(/ 10 2 1)')
    res.get().should.equal(5)
  })

  it('should handle float', function () {
    const res = statment.parse('(/ 5 2.5 1)')
    res.get().should.equal(2)
  })
})
