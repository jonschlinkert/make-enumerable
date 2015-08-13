'use strict';

/* deps: mocha */
var assert = require('assert');
var delegate = require('delegate-properties');
var makeEnumerable = require('./');

var init = {
  upper: function(val) {
    return val.toUpperCase();
  },
  lower: function(val) {
    return val.toLowerCase();
  },
  foo: {bar: {baz: {a: 'aaa', b: 'bbb', c: 'ccc'}}}
};

var provider = delegate({}, init);
delegate(provider.foo);
delegate(provider.foo.bar);
delegate(provider.foo.bar.baz);

describe('makeEnumerable', function () {
  // first, make sure that our properties are non-enumerable
  it('delegate should make properties non-enumerable:', function () {
    assert.deepEqual(provider, {});
    assert.deepEqual(provider.foo, {});
    assert.deepEqual(provider.foo.bar, {});
    assert.deepEqual(provider.foo.bar.baz, {});
    assert.deepEqual(provider.foo.bar.baz.a, 'aaa');
  });

  it('should make shallow properties enumerable:', function () {
    var obj = makeEnumerable(provider);
    assert.equal(obj.upper, init.upper);
    assert.equal(obj.lower, init.lower);
    assert.deepEqual(obj.foo, {});
    assert.deepEqual(obj.foo, provider.foo);
  });

  it('should not make deep properties enumerable by default:', function () {
    var obj = makeEnumerable(provider);
    assert.deepEqual(obj.foo, {});
    assert.notDeepEqual(obj.foo, init.foo);

    assert.deepEqual(obj.foo.bar, {});
    assert.notDeepEqual(obj.foo.bar, init.foo.bar);

    assert.deepEqual(obj.foo.bar.baz, {});
    assert.notDeepEqual(obj.foo.bar.baz, init.foo.bar.baz);
  });

  it('should make deep properties enumerable when `true` is defined:', function () {
    var obj = makeEnumerable(provider, true);

    assert.deepEqual(obj, init);
    assert.deepEqual(obj.foo, init.foo);
    assert.deepEqual(obj.foo.bar, init.foo.bar);
    assert.deepEqual(obj.foo.bar.baz, init.foo.bar.baz);
  });
});
