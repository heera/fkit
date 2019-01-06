import curry from './curry'

/**
 * Determines the largest of two numbers.
 *
 * @param {Number} a A number.
 * @param {Number} b A number.
 * @returns {Number} The largest of the numbers `a` and `b`.
 */
export function max (a, b) {
  return b > a ? b : a
}

export default curry(max)