/*!
 * make-enumerable <https://github.com/jonschlinkert/make-enumerable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

function makeEnumerable(obj, deep) {
  var keys = Object.getOwnPropertyNames(obj);
  var len = keys.length, i = -1;
  var res = {};

  while (++i < len) {
    var key = keys[i];
    var val = obj[key];

    if (deep && Array.isArray(val)) {
      define(res, key, copyArray(val, deep));
    } else if (deep && typeof val === 'object') {
      define(res, key, makeEnumerable(val, deep));
    } else {
      define(res, key, val);
    }
  }
  return res;
}

function define(obj, key, val) {
  return Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    writable: true,
    value: val
  });
}

function copyArray(arr, deep) {
  var len = arr.length, res = [];
  var i = -1;
  while (++i < len) {
    res[i] = makeEnumerable(arr[i], deep);
  }
  return res;
}

/**
 * Expose `makeEnumerable`
 */

module.exports = makeEnumerable;
