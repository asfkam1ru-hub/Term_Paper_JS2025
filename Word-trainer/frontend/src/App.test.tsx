import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { jest } from '@jest/globals'

// ESM: мок ДО импорта App
jest.unstable_mockModule('./storage', () => ({
  loadDictionary: () => ({ data: [], error: false }),
  loadHistory: () => ({ data: [], error: false }),
  loadDecks: () => ({ data: [], error: false }),

  saveDictionary: () => ({ error: false }),
  saveHistory: () => ({ error: false }),
  saveDecks: () => ({ error: false }),
}))

jest.unstable_mockModule('ui-library', () => ({
  Layout: ({
    currentPage,
    onChangePage,
    children,
    isDictionaryError,
    isHistoryError,
  }: {
    currentPage: string
    onChangePage: (page: unknown) => void
    children: React.ReactNode
    isDictionaryError: boolean
    isHistoryError: boolean
  }) => (
    <div>
      <div data-testid="layout-current">{currentPage}</div>
      <div data-testid="layout-errors">
        {isDictionaryError ? 'dict-error' : 'dict-ok'}|{isHistoryError ? 'hist-error' : 'hist-ok'}
      </div>

      <button type="button" onClick={() => onChangePage('home')}>
        go-home
      </button>
      <button type="button" onClick={() => onChangePage('training')}>
        go-training
      </button>
      <button type="button" onClick={() => onChangePage('dictionary')}>
        go-dictionary
      </button>
      <button type="button" onClick={() => onChangePage('decks')}>
        go-decks
      </button>
      <button type="button" onClick={() => onChangePage('statistics')}>
        go-statistics
      </button>

      <div data-testid="layout-children">{children}</div>
    </div>
  ),
}))

describe('App', () => {
  it('renders and switches pages (basic smoke + state)', async () => {
    const mod = await import('./App')
    const App = mod.App as React.FC

    render(<App />)

    // стартовая страница (обычно home)
    expect(screen.getByTestId('layout-current')).toBeInTheDocument()

    fireEvent.click(screen.getByText('go-training'))
    expect(screen.getByTestId('layout-current')).toHaveTextContent('training')

    fireEvent.click(screen.getByText('go-dictionary'))
    expect(screen.getByTestId('layout-current')).toHaveTextContent('dictionary')

    fireEvent.click(screen.getByText('go-decks'))
    expect(screen.getByTestId('layout-current')).toHaveTextContent('decks')

    fireEvent.click(screen.getByText('go-statistics'))
    expect(screen.getByTestId('layout-current')).toHaveTextContent('statistics')

    fireEvent.click(screen.getByText('go-home'))
    expect(screen.getByTestId('layout-current')).toHaveTextContent('home')
  })
})
