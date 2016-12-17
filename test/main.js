'use strict'

import chai from 'chai'
import {statment} from '../lib/language'

const should = chai.should()

describe('#blisp', function() {
  it('should have nil', function () {
    statment.parse('(nil)').get().should.deep.equal([[]])
  })
})
