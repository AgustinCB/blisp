import Symbol from './symbol'

export class SExpression {
  constructor(list) {
    this.list = list instanceof SExpression? list.list : list
  }

  run() {
    let lead = this.list[0] instanceof Symbol? this.list[0].value : this.list[0]

    if (lead instanceof SExpression && !(lead instanceof QExpression)) {
      lead = lead.run()
    }

    if (typeof lead === "function") {
      return lead(...this.list.slice(1))
    }

    if (!this.list.map) return [ this.list ]
    return this.list.map((v) => v instanceof Symbol? v.value : v)
  }

  get length() {
    return this.list.length
  }
}

SExpression.run = function (list) {
  return (new SExpression(list)).run()
}

export class QExpression extends SExpression {
  run() {
    return this.list
  }
}
