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
})
