'use strict'

var assert = require('assert');
var trimmest = require('./');
var Benchmark = require('benchmark');

var regex = /^\s+|\s+$/g;
var leadRegex = /^\s+/g;
var trailRegex = /\s+$/g;


assert.equal(trimmest('    test    '), 'test');
assert.equal(trimmest(' \n test \n '), 'test');
assert.equal(trimmest(' \n test \n '), 'test');
assert.equal(trimmest.trimStart('    test    '), 'test    ');
assert.equal(trimmest.trimStart(' \n test \n '), 'test \n ');
assert.equal(trimmest.trimStart(' \n test \n '), 'test \n ');
assert.equal(trimmest.trimEnd('    test    '), '    test');
assert.equal(trimmest.trimEnd(' \n test \n '), ' \n test');
assert.equal(trimmest.trimEnd(' \n test \n '), ' \n test');


// Start and end indices
assert.equal(trimmest('  test', 0), 'test');
assert.equal(trimmest('  test', 1), 'test');
assert.equal(trimmest('  test', 0, 4), 'te');
assert.equal(trimmest('test  test', 0), 'test  test');
assert.equal(trimmest('test  test', 1), 'est  test');
assert.equal(trimmest('test  test', 4), 'test');
assert.equal(trimmest('test  ', 0, 6), 'test');
assert.equal(trimmest('test  ', 0, 5), 'test');
assert.equal(trimmest('test  ', 0, 3), 'tes');
assert.equal(trimmest('test  test', 0, 10), 'test  test');
assert.equal(trimmest('test  test', 0, 9), 'test  tes');
assert.equal(trimmest('test  test', 0, 6), 'test');


// Assert compliance with native trim
for (var i = 0; i < 0x1000; i++) {
  // Skip this, because Unicode changed it from whitespace to not whitespace
  if (i === 0x180E) {
    continue;
  }

  var char = String.fromCharCode(i);
  assert.equal(trimmest(char), trim(char), i);
  assert.equal(trimmest.trimStart(char), trimStart(char), i);
  assert.equal(trimmest.trimEnd(char), trimEnd(char), i);

  var string = char + 'test' + char;
  assert.equal(trimmest(string), trim(string), i);
  assert.equal(trimmest.trimStart(string), trimStart(string), i);
  assert.equal(trimmest.trimEnd(string), trimEnd(string), i);
}


// Time for benchmarks
// trimSuite('test');
trimSuite(' test');
trimSuite('test ');
trimSuite(' test ');


function trim(str) {
  return str.trim();
}
function trimStart(str) {
  return str.trimLeft ? str.trimLeft() : regexTrimStart(str);
}
function trimEnd(str) {
  return str.trimRight ? str.trimRight() : regexTrimEnd(str);
}

function regexTrim(str) {
  return str.replace(regex, '');
}
function regexTrimStart(str) {
  return str.replace(leadRegex, '');
}
function regexTrimEnd(str) {
  return str.replace(trailRegex, '');
}

function trimSuite(str) {
  var suite = new Benchmark.Suite;

  // add tests
  suite.add('trimmest', function() {
    trimmest(str);
  });

  suite.add('trim', function() {
    trim(str);
  });

  suite.add('regex', function() {
    regexTrim(str);
  });

  suite.add('regex split', function() {
    regexTrimStart(regexTrimEnd(str));
  });

  // add listeners
  suite.on('cycle', function(event) {
    console.log(String(event.target));
  });

  suite.on('complete', function() {
    var fastest = String(this.filter('fastest').map('name'));
    console.log('Fastest is ' + fastest);
    assert.ok(/\btrimmest\b/.test(fastest), fastest);
  });

  // run sync
  suite.run({ 'async': false });
}

function repeat(str, times) {
  return new Array(times + 1).join(str);
}
