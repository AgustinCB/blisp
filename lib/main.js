'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _reader = require('./reader');

var _reader2 = _interopRequireDefault(_reader);

var _interpreter = require('./interpreter');

var _interpreter2 = _interopRequireDefault(_interpreter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getResponse = function getResponse(interpreter, input) {
  var result = interpreter.interpret(input);

  if (!result.length) throw new Error('Wrong syntax!!');

  var response = result.get();

  if (response instanceof Error) throw response;

  return response;
};

var main = function main(command, file, prompt) {
  var inputStream = file ? _fs2.default.createReadStream(file) : process.stdin;
  var rl = new _reader2.default(inputStream);
  var interpreter = new _interpreter2.default(prompt);

  if (command) {
    console.log(getResponse(interpreter, command));
    return Promise.resolve();
  }

  var done = false;

  rl.on('close', function (_) {
    done = true;
  });
  var read = function read() {
    return rl.ask(interpreter.prompt).then(function (input) {
      input = input.toString().trim();
      if (!input) return read();

      input.split('\n').forEach(function (line) {
        return console.log(getResponse(interpreter, line));
      });

      if (!done) return read();
    }).catch(function (err) {
      console.log(err);
      if (!done) return read();
    });
  };

  return read();
};

if (require.main === module) {
  var argv = (0, _minimist2.default)(process.argv.slice(2));
  var command = argv._[0];
  var file = argv.file || argv.f;
  var prompt = argv.prompt || argv.p;
  main(command, file, prompt).catch(function (err) {
    return console.log('An error happened!', err);
  });
}