import chai from 'chai'
import {statment} from '../lib/language'

const should = chai.should()

describe('#list', function() {
  it('should filter a list', function () {
    statment.parse("(filter (# '(x) '(= 1 x)) (list 1 2))").get().should.deep.equal([ 1 ])
  })

  it('should map a list', function () {
    statment.parse("(map (# '(x) '(+ 1 x)) (list 1 2))").get().should.deep.equal([ 2, 3 ])
  })

  it.only('should go over a list', function () {
    statment.parse("(global '(x) (list 3))").get()
    statment.parse("(foreach (# '(l) '(global '(x) (join x l))) (list (list 1 2)))").get()
    statment.parse('`x').get().should.deep.equal([ 3, 1, 2 ])
  })

  it('should reduce a list', function () {
    statment.parse("(reduce (# '(acc x) '(+ acc x)) (list 1 2) 0)").get().should.deep.equal(3)
  })

  it('should create a list of elements', function () {
    const res = statment.parse('(list 1 2 3)')
    res.get().should.deep.equal([ 1, 2, 3 ])
  })

  it('should return the head of a list', function () {
    const res = statment.parse('(head (list 1 2 3))')
    res.get().should.equal(1)
  })

  it('should return the tail of a list', function () {
    const res = statment.parse('(tail \'(list 1 2 3))')
    res.get().should.deep.equal([ 1, 2, 3 ])
  })

  it('should return the last of a list', function () {
    const res = statment.parse('(last (list 1 2 3))')
    res.get().should.equal(3)
  })

  it('should return the init of a list', function () {
    const res = statment.parse('(init (list 1 2 3))')
    res.get().should.deep.equal([ 1, 2 ])
  })

  it('should join multiple lists', function () {
    const res = statment.parse("(join (list 1 2 3) (list 12 3) '(1 2 3))")
    res.get().should.deep.equal([ 1, 2, 3, 12, 3, 1, 2, 3 ])
  })

  it('should return the length of a list', function () {
    const res = statment.parse('(length (list 1 2 3))')
    res.get().should.equal(3)
  })

  describe('#eval', function () {
    it('should return the length of a list', function () {
      const res = statment.parse('(eval \'(head (list 1 2 3 4)))')
      res.get().should.equal(1)
    })

    it('should return the length of a list from an expression', function () {
      const res = statment.parse('(eval (tail \'(tail tail \'(5 6 7))))')
      res.get().should.deep.equal([ 6, 7 ])
    })

    it('should return the length of a list from a nested expression', function () {
      const res = statment.parse('(eval (head \'((+ 1 2) (+ 10 20))))')
      res.get().should.equal(3)
    })
  })
})
