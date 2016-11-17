import Symbol from './symbol'

export class SExpression {
  constructor(list) {
    this.list = list
  }

  run() {
    if (this.list instanceof SExpression) return this.list.run()
    let lead = this.list[0] instanceof Symbol? this.list[0].value : this.list[0]

    if (lead instanceof SExpression && !(lead instanceof QExpression)) {
      lead = lead.run()
    }

    if (typeof lead === "function") {
      return lead(...this.list.slice(1))
    }

    return this.list.map((v) => v instanceof Symbol? v.value : v)
  }

  get length() {
    return this.list.length
  }
}

export class QExpression extends SExpression {
}
