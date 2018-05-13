# trimmest [![Build Status][travis-badge]][travis]

Trims leading and trialing whitespace off of a string, with optional
specified start and end indices.

Semantically equivalent to [String.prototype.trim][trim], but much
faster for strings with little or no whitespace.

Also provides `trimStart`/`trimLeft` and `trimEnd`/`trimRight` methods.

## Installation

```bash
npm install trimmest
```

## Usage

```javascript
var trimmest = require('trimmest')

trimmest('   ') // => ''
trimmest(' \n\t\r') // => ''
trimmest(' test ') // => 'test'

trimmest.trimStart(' test ') // => 'test '
trimmest.trimLeft(' test ') // => 'test '

trimmest.trimEnd(' test ') // => ' test'
trimmest.trimRight(' test ') // => ' test'


// Optional start and end indices, which is convenient for trimming
// during string parsing.
// Whitespace will be trimmed around these indices.
trimmest('test1,   test2', /* start */ 6) // => 'test2'
trimmest('test1,   test2', undefined, /* end */ 7) // => 'test1'
```

## License

MIT

[travis-badge]: https://img.shields.io/travis/jridgewell/trimmest.svg
[travis]: https://travis-ci.org/jridgewell/trimmest
[trim]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
