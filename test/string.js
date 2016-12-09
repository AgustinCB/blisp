'use strict'

import chai from 'chai'
import {statment} from '../lib/language'

const should = chai.should()

describe('#string', function() {
  it('should accept strings', function () {
    statment.parse('(eval "asd")').get().should.equal('asd')
  })

  it('should concatenate strings', function () {
    statment.parse('(+ "asd" "asd")').get().should.equal('asdasd')
  })
})
