'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processList = exports.executeElement = exports.processElement = undefined;

var _expressions = require('../expressions');

var _symbol = require('../symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processElement = exports.processElement = function processElement(execution, item) {
  if (execution && item instanceof _expressions.SExpression) return item.run();
  if (execution && item instanceof _symbol2.default) return item.value;
  return item;
};

var executeElement = exports.executeElement = processElement.bind(processElement, true);

var processList = exports.processList = function processList(list) {
  if (list.length === 1 && (list[0].length !== undefined && typeof list[0] !== 'string' || list[0] instanceof _symbol2.default)) {
    list = list[0] instanceof _symbol2.default ? list[0].value : list[0];
  }
  if (list instanceof _expressions.SExpression) {
    list = list.run();
  }
  list = (0, _util.toArray)(list);
  return list.map(processElement.bind(null, !(list instanceof _expressions.QExpression)));
};