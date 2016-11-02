'use strict';

/**
 * Alias for promisify where the callback receives (res)
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisifyInverse = promisifyInverse;
exports.promisify = promisify;
exports.invertPromise = invertPromise;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function promisifyInverse() {
  return invertPromise(promisify.apply(undefined, arguments));
}

/**
 * Function to promisify a typical callback
 * Expects first argument to be the async function
 * The rest of arguments to be the arguments of the function, except for the callback
 * And the callback to receive paramenters (error, res)
 */
function promisify() {
  var args = [].concat(Array.prototype.slice.call(arguments)),
      fn = args[0],
      fnArgs = args.slice(1);

  return new Promise(function (resolve, reject) {
    fnArgs.push(function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });
    fn.apply(undefined, _toConsumableArray(fnArgs));
  });
}

/**
 * Function to invert a promise
 * @param {Promise} promise to invert
 * @return {Promise}
 */
function invertPromise(promise) {
  return promise.then(function (res) {
    return Promise.reject(res);
  }).catch(function (err) {
    return Promise.resolve(err);
  });
}