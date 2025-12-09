import { buildButtonLabel } from './index'

describe('buildButtonLabel', () => {
  it('builds label with default variant', () => {
    const result = buildButtonLabel({ label: 'Click me' })
    expect(result).toBe('PRIMARY: Click me')
  })
})
