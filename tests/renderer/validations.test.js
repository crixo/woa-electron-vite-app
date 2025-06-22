// src/utils/__tests__/math.test.ts
import { describe, it, expect } from 'vitest'

const add = (n1, n2) => {return n1+n2}

describe('math utils', () => {
  it('adds numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
