import environment from './environment'
import {SExpression} from './expressions'

export default class {
  constructor (name, value) {
    this.name = name
    environment.set(this.name, value, 'macros')
  }

  get value () {
    const _value = environment.get(this.name, 'macros')
    if (_value === undefined) throw new Error(this.name + ' is not defined')
    if (_value instanceof SExpression) return _value.run()
    return _value
  }
}
