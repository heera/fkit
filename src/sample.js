import curry from './curry'
import sample from './uncurried/sample'

/**
 * Samples random elements from a list.
 *
 * @function
 * @param {Number} n The number of elements to sample.
 * @param {Array|String} as The list.
 * @returns {Array|String} A list of `n` elements randomly sampled from the
 * list of `as`.
 * @example
 *
 * import { sample } from 'fkit'
 * sample(2, [1, 2, 3]) // [3, 1]
 * sample(2, 'abc') // 'ca'
 */
export default curry(sample)
