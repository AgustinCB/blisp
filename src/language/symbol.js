import environment from './environment'
import {SExpression, QExpression} from './expressions'

export default class Symbol {
  constructor (name, value) {
    this.name = name
  }

  get value () {
    const _value = environment.get(this.name)
    if (_value === undefined) throw new Error(this.name + ' is not defined')
    if (_value instanceof SExpression) return _value.run()
    return _value
  }
}
