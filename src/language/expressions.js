import Symbol from './symbol'
import {toArray} from '../util'

export class SExpression {
  constructor (list) {
    this.list = list instanceof SExpression ? list.list : list
  }

  run () {
    let lead = this.list[0] instanceof Symbol ? this.list[0].value : this.list[0]

    if (lead instanceof SExpression && !(lead instanceof QExpression)) {
      lead = lead.run()
    }

    if (typeof lead === 'function') {
      return lead(...this.slice(1))
    }

    if (!this.list || !this.list.constructor === Array) return toArray(this.list)
    return this.map((v) => v instanceof Symbol ? v.value : v)
  }

  execute () {
    return this.run()
  }

  get last () {
    if (!this.list.length) return undefined
    return this.list[this.list.length-1]
  }

  get length () {
    return this.list.length
  }

  map (fn) {
    return this.list.map(fn)
  }

  forEach (fn) {
    return this.list.forEach(fn)
  }

  reduce (fn, init) {
    return this.list.reduce(fn, init)
  }

  slice (from, to) {
    return this.list.slice(from, to)
  }
}

SExpression.run = function (list) {
  return (new SExpression(list)).run()
}

export class QExpression extends SExpression {
  run () {
    return this
  }

  execute () {
    return SExpression.run(this.list)
  }
}
