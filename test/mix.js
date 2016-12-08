'use strict'

import chai from 'chai'
import {statment} from '../lib/language'
import Symbol from '../lib/language/symbol'
import {QExpression} from '../lib/language/expressions'

const should = chai.should()

describe('#mix', function () {
  it('basic usage of values', function () {
    statment.parse('(def \'(ref) (head \'(list 1 2 3 4)))').get().should.equal('')

    const res = statment.parse('(list ref)').get()
    res.should.be.an.instanceof(Array)
    res[0].should.be.an.instanceof(Function)

    statment.parse('(ref 1 2 3)').get().should.deep.equal([ 1, 2, 3 ])
  })

  it('should be able to handle array of symbols', function () {
    statment.parse('(def \'(arglist) \'(a b x y))').get().should.equal('')

    const res = statment.parse('(list arglist)').get()
    res.length.should.equal(4)
    res.forEach((symbol) => symbol.should.be.an.instanceof(Symbol))

    statment.parse('(def arglist 1 2 3 4)').get().should.equal('')
    statment.parse('(list a b x y)').get().should.deep.equal([ 1, 2, 3, 4 ])
  })

  it('should return a qexpression', function () {
    statment.parse('\'(* x (+ x y))').get().should.be.an.instanceof(QExpression)
  })

  it('should be able to define functions', function () {
    statment.parse('(def \'(add-mult) (# \'(x y) \'(* x (+ x y))))').get().should.equal('')
    statment.parse('(add-mult 10 20)').get().should.equal(300)
    statment.parse('((add-mult 10) 20)').get().should.equal(300)
  })

  it('should be able to pass eval as a set or arguments', function () {
    statment.parse('(+ (eval \'(1 2 3 4)))').get().should.equal(10)
  })

  it('should handle multiple arguments', function () {
    statment.parse('(def \'(add-mult x) (# \'(x &args) \'(* x (+ &args))) 2)').get().should.equal('')
    statment.parse('(add-mult x 1 2 3 4 5)').get().should.equal(30)
    statment.parse('((add-mult x) 1 2 3 4 5)').get().should.equal(30)
  })

  it('should be able to construct the func helper', function () {
    statment.parse('(def \'(args) \'(add-mult2 x y))').get().should.equal('')
    statment.parse('(def \'(body) \'(+ x (* x y)))').get().should.equal('')
    statment.parse('(def (head args) (# (tail args) body))').get().should.equal('')
    statment.parse('(add-mult2 10 20)').get().should.equal(210)
  })
})
