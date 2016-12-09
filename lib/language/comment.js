'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FORMAT = '\x1b[36m';
var NORMAL = '\x1b[0m';

var _class = function () {
  function _class(content) {
    _classCallCheck(this, _class);

    this.content = content;
  }

  _createClass(_class, [{
    key: 'toString',
    value: function toString() {
      return FORMAT + this.content + NORMAL;
    }
  }]);

  return _class;
}();

exports.default = _class;