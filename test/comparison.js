'use strict'

import chai from 'chai'
import {statment} from '../lib/language'

const should = chai.should()

describe('#comparison', function() {
  it('should have a equal', function () {
    statment.parse('(= true true)').get().should.deep.equal(true)
    statment.parse('(= true false)').get().should.deep.equal(false)
  })

  it('should have a not equal', function () {
    statment.parse('(!= true true)').get().should.deep.equal(false)
    statment.parse('(!= true false)').get().should.deep.equal(true)
  })

  it('should have a greater than', function () {
    statment.parse('(> 10 0)').get().should.deep.equal(true)
    statment.parse('(> 10 20)').get().should.deep.equal(false)
    statment.parse('(> 10 10)').get().should.deep.equal(false)
  })

  it('should have a greater or equals than', function () {
    statment.parse('(>= 10 0)').get().should.deep.equal(true)
    statment.parse('(>= 10 20)').get().should.deep.equal(false)
    statment.parse('(>= 10 10)').get().should.deep.equal(true)
  })

  it('should have a lesser than', function () {
    statment.parse('(< 10 0)').get().should.deep.equal(false)
    statment.parse('(< 10 20)').get().should.deep.equal(true)
    statment.parse('(< 10 10)').get().should.deep.equal(false)
  })

  it('should have a lesser or equals than', function () {
    statment.parse('(<= 10 0)').get().should.deep.equal(false)
    statment.parse('(<= 10 20)').get().should.deep.equal(true)
    statment.parse('(<= 10 10)').get().should.deep.equal(true)
  })
})
