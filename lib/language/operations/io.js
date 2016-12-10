'use strict';

// import fs from 'fs'

Object.defineProperty(exports, "__esModule", {
  value: true
});
var print = exports.print = function print() {
  var _console;

  (_console = console).log.apply(_console, arguments);
};

var error = exports.error = function error() {
  throw new Error([].concat(Array.prototype.slice.call(arguments)).join(' '));
};

var load = exports.load = function load() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  var statment = args[0];
  var files = args.slice(1);

  console.log(statment, files, args);
};