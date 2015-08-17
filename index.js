/*!
 * make-enumerable <https://github.com/jonschlinkert/make-enumerable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

function makeEnumerable(obj, deep) {
  var proto = obj.prototype || {};
  var keys = allKeys(obj);
  var len = keys.length, i = -1;
  var res = {};

  while (++i < len) {
    var key = keys[i];
    if (key in obj) {
      copy(res, key, obj[key], deep);
    } else if (key in proto) {
      copy(res, key, proto[key], deep);
    }
  }
  return res;
}

function copy(res, key, val, deep) {
  if (deep && Array.isArray(val)) {
    define(res, key, copyArray(val, deep));
  } else if (deep && typeof val === 'object') {
    define(res, key, makeEnumerable(val, deep));
  } else {
    define(res, key, val);
  }
}

function copyArray(arr, deep) {
  var len = arr.length, res = [];
  var i = -1;
  while (++i < len) {
    res[i] = makeEnumerable(arr[i], deep);
  }
  return res;
}

function allKeys(obj) {
  var keys = [];

  for(var key in obj) {
    keys.push(key);
  }

  if ('prototype' in obj) {
    for(var key in obj.prototype) {
      keys.push(key);
    }
  } else {
    var props = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < props.length; i++) {
      if (!~keys.indexOf(props[i])) {
        keys.push(props[i]);
      }
    }
  }
  return keys;
}

function define(obj, key, val) {
  return Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    writable: true,
    value: val
  });
}

/**
 * Expose `makeEnumerable`
 */

module.exports = makeEnumerable;
