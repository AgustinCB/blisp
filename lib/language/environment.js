'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Environment = function () {
  function Environment() {
    _classCallCheck(this, Environment);

    this.namespaces = new Map([['macros', new Map()]]);
    this.namespacesPile = [];
    this.addNamespace('global');
  }

  _createClass(Environment, [{
    key: 'addNamespace',
    value: function addNamespace(name) {
      var namespace = new Map();

      if (this.namespaces.has(name)) {
        name = name + Math.random().toString(36).substring(7);
      }

      namespace.name = name;
      this.namespaces.set(name, namespace);
      this.namespacesPile.push(namespace);

      return name;
    }
  }, {
    key: 'popNamespace',
    value: function popNamespace() {
      if (this.namespaces.length === 1) {
        return null;
      }
      var namespace = this.namespacesPile.pop();
      this.namespaces.delete(namespace.name);
      return namespace;
    }
  }, {
    key: 'set',
    value: function set(name, value, environment) {
      var namespace = environment ? this.namespaces.get(environment) : this.namespacesPile.slice(-1)[0];
      namespace.set(name, value);
    }
  }, {
    key: 'get',
    value: function get(name, environment) {
      if (environment) {
        var namespace = this.namespaces.get(environment);
        if (namespace) {
          return namespace.get(name);
        }
        return;
      }
      for (var i = this.namespacesPile.length - 1; i >= 0; i--) {
        var _namespace = this.namespacesPile[i];
        if (_namespace.has(name)) {
          return _namespace.get(name);
        }
      }
    }
  }]);

  return Environment;
}();

exports.default = new Environment();