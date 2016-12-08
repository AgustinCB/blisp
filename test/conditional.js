'use strict'

import chai from 'chai'
import {statment} from '../lib/language'

const should = chai.should()

describe('#conditional', function() {
  it('should have an if operation', function () {
    statment.parse('(if true 1 2)').get().should.deep.equal(1)
    statment.parse('(if false 1 2)').get().should.deep.equal(2)
  })

  it('should have an unless operation', function () {
    statment.parse('(unless true 1 2)').get().should.deep.equal(2)
    statment.parse('(unless false 1 2)').get().should.deep.equal(1)
  })
})
