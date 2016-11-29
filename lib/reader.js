'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _readlinePromise = require('readline-promise');

var rlp = _interopRequireWildcard(_readlinePromise);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Abstraction of readline using promises
 */
var Reader = function (_EventEmitter) {
  _inherits(Reader, _EventEmitter);

  function Reader() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.stdin;
    var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.stdout;

    _classCallCheck(this, Reader);

    var _this = _possibleConstructorReturn(this, (Reader.__proto__ || Object.getPrototypeOf(Reader)).call(this));

    _this.cache = [];
    _this.errors = [];
    _this.output = output;
    _this.completed = false;

    _this.interface = rlp.createInterface({ input: input, output: output });
    _this.interface.each(_this.newData.bind(_this)).caught(_this.newError.bind(_this)).then(function () {
      return _this.completed = true;
    });
    return _this;
  }

  _createClass(Reader, [{
    key: 'ask',
    value: function ask(question) {
      var _this2 = this;

      if (question) this.output.write(question);
      return new Promise(function (resolve, reject) {
        var interval = setInterval(function () {
          if (!_this2.errors.length && !_this2.cache.length && _this2.completed) {
            clearInterval(interval);
            _this2.emit('close');
          }
          if (_this2.errors.length) {
            clearInterval(interval);
            reject(_this2.errors.shift());
          }
          if (_this2.cache.length) {
            clearInterval(interval);
            resolve(_this2.cache.shift());
          }
        }, 5);
      });
    }
  }, {
    key: 'newData',
    value: function newData(data) {
      this.cache.push(data.toString());
    }
  }, {
    key: 'newError',
    value: function newError(error) {
      this.errors.push(data.toString());
    }
  }]);

  return Reader;
}(_events2.default);

exports.default = Reader;