import apply from './apply'
import apply2 from './apply2'
import curry from './curry'
import { slice } from './util'

/**
 * This module defines basic operations on functions.
 *
 * @module fkit/fn
 * @summary Core Functions
 */

/**
 * Flattens the list of `as`.
 *
 * @private
 */
export function flatten (as) {
  return as.reduce((a, b) => a.concat(b), [])
}

/**
 * Returns the result of the function `f` applied to the values `a`, `b`, and
 * `c`.
 *
 * @summary Applies a function to three values.
 *
 * @example
 *
 * function sayHi (a, b, c) { return ['Hi', a, b, c, '!'].join(' ') }
 * F.apply3(sayHi, 'Ms', 'Jane', 'Appleseed') // Hi Ms Jane Appleseed!
 *
 * @curried
 * @function
 * @param f A function.
 * @param a A value.
 * @param b A value.
 * @param c A value.
 * @returns The result of `f(a, b, c)`.
 */
export const apply3 = curry((f, a, b, c) => f(a, b, c))

/**
 * Returns the result of the function `f` applied to the value `a`.
 *
 * This is similar to `apply`, however the order of the arguments is flipped.
 *
 * @summary Applies a function to a value.
 *
 * @example
 *
 * function sayHi (a) { return ['Hi', a, '!'].join(' ') }
 * F.applyRight('Jane', sayHi) // Hi Jane!
 *
 * @curried
 * @function
 * @param a A value.
 * @param f A function.
 * @returns The result of `f(a)`.
 */
export const applyRight = curry((a, f) => f(a))

/**
 * Returns a function that is the composition of the list of functions `fs`.
 *
 * @summary Composes a list of functions.
 *
 * @example
 *
 * F.compose(f, g, h)(a) // f(g(h(a)))
 *
 * @function
 * @param fs A list of functions.
 * @returns A new function.
 */
export const compose = variadic(fs => a => fs.reduceRight((a, f) => f(a), a))

/**
 * Returns the result of applying the function `f` to the values `b` and `a`.
 *
 * @summary Flips the order of the arguments to a function.
 *
 * @example
 *
 * function f (a, b) { ... }
 * var g = F.flip(f)
 * g(1, 2) // f(2, 1)
 *
 * @function
 * @param f A function.
 * @param a A value.
 * @param b A value.
 * @returns A new function.
 */
export const flip = curry((f, a, b) => f(b, a))

/**
 * Returns a function that always returns the value `c`, regardless of the
 * arguments.
 *
 * @summary The constant function.
 *
 * @example
 *
 * F.always(1)(2, 3) // 1
 *
 * @param c A value.
 * @returns A new function.
 */
export function always (a) { return () => a }

/**
 * Returns a function that wraps the binary function `f` to accept a pair.
 *
 * @summary Converts a binary function to a function on pairs.
 *
 * @example
 *
 * var add = F.uncurry((a, b) => a + b)
 * add([1, 2]) // 3
 *
 * @function
 * @param f A function.
 * @returns A new function.
 */
export const uncurry = curry((f, p) => f(p[0], p[1]))

/**
 * Returns a function that wraps the function `f` to accept only one argument.
 * Any other arguments will be ignored.
 *
 * @summary Converts a function to a unary function.
 *
 * @example
 *
 * function f () { ... }
 * const g = F.unary(f)
 * g(1, 2, 3) // f(1)
 *
 * @param f A function.
 * @returns A new function.
 */
export function unary (f) {
  return (f.length === 1) ? f : apply(f)
}

/**
 * Returns a function that wraps the function `f` to accept only two arguments.
 * Any other arguments will be ignored.
 *
 * @summary Converts a function to a binary function.
 *
 * @example
 *
 * function f () { ... }
 * const g = F.binary(f)
 * g(1, 2, 3) // f(1, 2)
 *
 * @param f A function.
 * @returns A new function.
 */
export function binary (f) {
  return (f.length === 2) ? f : apply2(f)
}

/**
 * Returns a function that wraps the function `f` to accept any number of
 * arguments.
 *
 * The last named parameter will be given an array of arguments.
 *
 * @summary Converts a function to a variadic function.
 *
 * @example
 *
 * function f (head, tail) { ... }
 * F.variadic(f)(1, 2, 3) // f(1, [2, 3])
 *
 * @param f A function.
 * @returns A new function.
 */
export function variadic (f) {
  const arity = f.length

  if (arity < 1) {
    return f
  } else if (arity === 1) {
    return (...args) => {
      const newArgs = (args.length === 1) ? flatten(args) : args

      return f.call(this, newArgs)
    }
  } else {
    return (...args) => {
      const numMissingArgs = Math.max(arity - args.length - 1, 0)
      const missingArgs = new Array(numMissingArgs)
      const namedArgs = slice.call(args, 0, arity - 1)
      const variadicArgs = slice.call(args, f.length - 1)

      return f.apply(this, namedArgs.concat(missingArgs).concat([variadicArgs]))
    }
  }
}

/**
 * Applies the function `f` to the value `a` and returns the value `a`
 * unchanged.
 *
 * @summary Applies a side-effecting function to a value.
 *
 * @example
 *
 * function f (a) { console.log(a) }
 * F.tap(f)(1) // 1
 *
 * @curried
 * @function
 * @param f A function.
 * @param a A value.
 * @returns The value `a`.
 */
export const tap = curry((f, a) => {
  f(a)
  return a
})

/**
 * Returns `true` if the value `a` is strictly equal (`===`) to the value `b`,
 * false otherwise.
 *
 * @summary The strict equality operator.
 *
 * @example
 *
 * F.equal(1, 1) // true
 * F.equal(1, 2) // false
 *
 * @curried
 * @function
 * @param a A value.
 * @param b A value.
 * @returns A boolean value.
 */
export const equal = curry((a, b) => b === a)

/**
 * Returns `true` if the value `a` is strictly not equal (`!==`) to the value
 * `b`, false otherwise.
 *
 * @summary The strict inequality operator.
 *
 * F.notEqual(1, 1) // false
 * F.notEqual(1, 2) // true
 *
 * @curried
 * @function
 * @param a A value.
 * @param b A value.
 * @returns A boolean value.
 */
export const notEqual = curry((a, b) => b !== a)

/**
 * Returns the ordering of the two values `a` and `b`.
 *
 * @summary Compares two values using natural ordering.
 *
 * @example
 *
 * F.compare(1, 2) // -1
 * F.compare(2, 1) // 1
 * F.compare(2, 2) // 0
 *
 * @curried
 * @function
 * @param a A value.
 * @param b A value.
 * @returns A number.
 */
export const compare = curry((a, b) => {
  if (a > b) {
    return 1
  } else if (a < b) {
    return -1
  } else {
    return 0
  }
})
