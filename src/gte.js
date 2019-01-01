import curry from './curry'

export function gte (a, b) {
  return b >= a
}

/**
 * Returns `true` if the value `a` is greater than or equal to the value `b`
 * false otherwise.
 *
 * @summary The greater than or equal operator.
 *
 * @curried
 * @function
 * @param a A number.
 * @param b A number.
 * @returns A boolean value.
 */
export default curry(gte)
