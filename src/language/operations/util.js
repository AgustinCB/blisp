'use strict'

import {SExpression, QExpression} from '../expressions'
import Symbol from '../symbol'
import {toArray} from '../../util'

export const processElement = (execution, item) => {
  if (execution && item instanceof SExpression) return item.run()
  if (execution && item instanceof Symbol) return item.value
  return item
}

export const executeElement = processElement.bind(processElement, true)

export const processList = (list) => {
  if (list.length === 1 &&
    ((list[0].length !== undefined && typeof list[0] !== 'string') || list[0] instanceof Symbol)) {
    list = list[0] instanceof Symbol ? list[0].value : list[0]
  }
  if (list instanceof SExpression) {
    list = list.run()
  }
  list = toArray(list)
  return list.map(processElement.bind(null, !(list instanceof QExpression)))
}
