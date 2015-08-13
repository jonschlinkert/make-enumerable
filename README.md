# make-enumerable [![NPM version](https://badge.fury.io/js/make-enumerable.svg)](http://badge.fury.io/js/make-enumerable)

> Make all the properties of an object enumberable.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i make-enumerable --save
```

## Usage

```js
var makeEnumerable = require('make-enumerable');
var delegate = require('delegate-properties');

var initial = {
  upper: function(val) {
    return val.toUpperCase();
  },
  lower: function(val) {
    return val.toLowerCase();
  }
};

// make a copy of initial, and make properties non-enumerable
var obj = delegate({}, initial);
console.log(obj.upper) // [function]
console.log(obj.lower) // [function]
console.log(obj); // {}
console.log(Object.keys(obj)); // []

// now, let's make the properties enumerable again
makeEnumerable(obj);

console.log(obj); // {upper: [function], lower: [function]}
console.log(Object.keys(obj)); // ['upper', 'lower']
```

**nested objects**

To make properties on nested objects enumerable, pass `true` as the second argument:

```js
makeEnumerable(obj, true);
```

## Related projects

* [define-property](https://github.com/jonschlinkert/define-property): Define a non-enumerable property on an object.
* [delegate-properties](https://github.com/jonschlinkert/delegate-properties): Copy properties from one object to another and make them non-enumerable, or make existing properties… [more](https://github.com/jonschlinkert/delegate-properties)
* [delegate-object](https://github.com/doowb/delegate-object): Copy properties from an object to another object, where properties with function values will be… [more](https://github.com/doowb/delegate-object)
* [forward-object](https://github.com/doowb/forward-object): Copy properties from an object to another object, where properties with function values will be… [more](https://github.com/doowb/forward-object)
* [mixin-deep](https://github.com/jonschlinkert/mixin-deep): Deeply mix the properties of objects into the first object. Like merge-deep, but doesn't clone.
* [mixin-object](https://github.com/jonschlinkert/mixin-object): Mixin the own and inherited properties of other objects onto the first object. Pass an… [more](https://github.com/jonschlinkert/mixin-object)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/make-enumerable/issues/new)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 12, 2015._