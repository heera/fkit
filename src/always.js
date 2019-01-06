/**
 * Returns a function that always returns the same value, regardless of the
 * arguments.
 *
 * @param c A value.
 * @returns {Function} A function that always returns the value `c`.
 *
 * @example
 *
 * F.always(1)() // 1
 *
 */
export default function always (c) {
  return () => c
}