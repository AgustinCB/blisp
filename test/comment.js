'use strict'

import chai from 'chai'
import {statment} from '../lib/language'
import Comment from '../lib/language/comment'

const should = chai.should()

describe('#comment', function() {
  it('should allow comments', function () {
    statment.parse('; this is comment').get().should.be.instanceof(Comment)
  })
})
