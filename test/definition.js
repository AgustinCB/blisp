'use strict'

import chai from 'chai'
import {statment} from '../lib/language'

const should = chai.should()

describe('#definition', function () {
  it('should be able to define a variable', function () {
    statment.parse('(def \'(one two) 1 2)').get().should.equal('')
    statment.parse('(list one two)').get().should.deep.equal([ 1, 2 ])
  })

  it('should be able to define a global variable', function () {
    statment.parse('(def \'(one two) 1 2)').get().should.equal('')
    statment.parse('(list one two)').get().should.deep.equal([ 1, 2 ])
  })

  it('should be able to define a function', function () {
    statment.parse('((# \'(x y) \'(+ x y)) 1 2)').get().should.deep.equal(3)
  })

  it('should be able to define a partial function', function () {
    statment.parse('((partial + 1 2) 3)').get().should.deep.equal(6)
  })
})
