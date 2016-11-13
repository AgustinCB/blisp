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
      var result = interpreter.interpret(input);

      if (!result.length) throw new Error('Wrong syntax!!');

      var response = result.get();

      if (response instanceof Error) throw response;

      console.log(response);

      return read();
    }).catch(function (err) {
      console.log(err);
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