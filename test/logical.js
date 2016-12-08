'use strict'

import chai from 'chai'
import {statment} from '../lib/language'

const should = chai.should()

describe('#logical', function() {
  it('should have a logical and', function () {
    statment.parse('(and true true true)').get().should.deep.equal(true)
    statment.parse('(and true true false)').get().should.deep.equal(false)
  })

  it('should have a logical or', function () {
    statment.parse('(or true true true)').get().should.deep.equal(true)
    statment.parse('(or true true false)').get().should.deep.equal(true)
    statment.parse('(or false false)').get().should.deep.equal(false)
  })

  it('should have a logical not', function () {
    statment.parse('(not true)').get().should.deep.equal(false)
    statment.parse('(not false)').get().should.deep.equal(true)
  })
})
