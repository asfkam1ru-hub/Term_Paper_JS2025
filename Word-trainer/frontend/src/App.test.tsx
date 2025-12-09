import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders header text for trainer', () => {
    render(<App />)
    expect(screen.getByText('Карточки для запоминания')).toBeInTheDocument()
  })
})
