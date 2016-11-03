'use strict';

var _reader = require('./reader');

var _reader2 = _interopRequireDefault(_reader);

var _interpreter = require('./interpreter');

var _interpreter2 = _interopRequireDefault(_interpreter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = function main() {
  var interpreter = new _interpreter2.default(),
      rl = new _reader2.default(),
      read = function read() {
    return rl.ask(interpreter.prompt).then(function (input) {
      var result = interpreter.interpret(input),
          response = result.length ? result.values[0] : // TODO: Create in the results a getter of values
      'Ups, wrong syntax!!';
      console.log(response);
      return read();
    });
  };

  return read();
};

if (require.main === module) {
  main().catch(function (err) {
    return console.log('An error happened!', err);
  });
}