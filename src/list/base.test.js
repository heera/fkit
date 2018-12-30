import * as base from '../../src/list/base'

describe('list.base', () => {
  describe('#init', () => {
    it('handles an empty array', () => {
      expect(base.init([])).toEqual([])
    })

    it('handles an empty string', () => {
      expect(base.init('')).toBe('')
    })

    it('handles an array', () => {
      expect(base.init([1, 2, 3])).toEqual([1, 2])
    })

    it('handles a string', () => {
      expect(base.init('foo')).toBe('fo')
    })
  })

  describe('#tail', () => {
    it('handles an empty array', () => {
      expect(base.tail([])).toEqual([])
    })

    it('handles an empty string', () => {
      expect(base.tail('')).toBe('')
    })

    it('handles an array', () => {
      expect(base.tail([1, 2, 3])).toEqual([2, 3])
    })

    it('handles a string', () => {
      expect(base.tail('foo')).toBe('oo')
    })
  })

  describe('#inits', () => {
    it('handles an empty array', () => {
      expect(base.inits([])).toEqual([[]])
    })

    it('handles an empty string', () => {
      expect(base.inits('')).toEqual([''])
    })

    it('handles an array', () => {
      expect(base.inits([1, 2, 3])).toEqual([[], [1], [1, 2], [1, 2, 3]])
    })

    it('handles a string', () => {
      expect(base.inits('foo')).toEqual(['', 'f', 'fo', 'foo'])
    })
  })

  describe('#tails', () => {
    it('handles an empty array', () => {
      expect(base.tails([])).toEqual([[]])
    })

    it('handles an empty string', () => {
      expect(base.tails('')).toEqual([''])
    })

    it('handles an array', () => {
      expect(base.tails([1, 2, 3])).toEqual([[1, 2, 3], [2, 3], [3], []])
    })

    it('handles a string', () => {
      expect(base.tails('foo')).toEqual(['foo', 'oo', 'o', ''])
    })
  })
})
