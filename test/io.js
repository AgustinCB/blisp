'use strict'

import chai from 'chai'
import {statment} from '../lib/language'

const should = chai.should()

describe('#io', function() {
  it('should print', function () {
    statment.parse('(print "holaaaa")').get().should.equal('')
  })

  it('should error', function () {
    try {
      statment.parse('(error "holaaaa")')
    } catch (e) {
      e.should.exist
      e.toString().should.equal('Error: holaaaa')
    }
  })

  describe('#load', function () {
    it('should load', function () {
      statment.parse(`(load "${__dirname}/test.blisp")`)
      statment.parse('(eval the-answer)').get().should.equal(42)
    })

    it('should load with multiline', function () {
      statment.parse(`(load "${__dirname}/test_multiline.blisp")`)
      statment.parse('(eval the-new-answer)').get().should.equal(42)
    })
  })
})
