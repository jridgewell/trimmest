'use strict'

var isWhitespace = require('is-whitespace-code-point');

module.exports = trimmest;
trimmest.trimEnd = trimEnd;
trimmest.trimLeft = trimStart;
trimmest.trimRight = trimEnd;
trimmest.trimStart = trimStart;

/**
 * Trims leading and trialing whitespace off of a string, with specified
 * start and end indices.
 *
 * Semantically equivalent to String.prototype.trim, but much faster for
 * strings with little or no whitespace.
 *
 * @param {string} str
 * @param {number} start
 * @param {number} end
 * @return {string}
 */
function trimmest(str, start, end) {
  start = start === undefined ? 0 : start;
  end = end === undefined ? str.length : end;
  start = startIndex(str, start, end);
  end = endIndex(str, start, end);

  return str.substring(start, end);
}

/**
 * Trims leading whitespace off of a string, with specified start and
 * end indices.
 *
 * Semantically equivalent to String.prototype.trimStart, but much faster for
 * strings with little or no whitespace.
 *
 * @param {string} str
 * @param {number} start
 * @param {number} end
 * @return {string}
 */
function trimStart(str, start, end) {
  start = start === undefined ? 0 : start;
  end = end === undefined ? str.length : end;

  return str.substring(
    startIndex(str, start, end),
    end
  );
}

/**
 * Trims trialing whitespace off of a string, with specified start and
 * end indices.
 *
 * Semantically equivalent to String.prototype.trimEnd, but much faster for
 * strings with little or no whitespace.
 *
 * @param {string} str
 * @param {number} start
 * @param {number} end
 * @return {string}
 */
function trimEnd(str, start, end) {
  start = start === undefined ? 0 : start;
  end = end === undefined ? str.length : end;

  return str.substring(
    start,
    endIndex(str, start, end)
  );
}

function startIndex(str, start, end) {
  while (start < end && isWhitespace(str.charCodeAt(start))) {
    start++;
  }
  return start;
}

function endIndex(str, start, end) {
  while (end > start && isWhitespace(str.charCodeAt(end - 1))) {
    end--;
  }
  return end;
}
