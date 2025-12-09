import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DeckList } from './components/DeckList'
import type { Deck } from './types'

const decks: Deck[] = [
  {
    id: 'd1',
    name: 'Test deck 1',
    words: []
  },
  {
    id: 'd2',
    name: 'Test deck 2',
    words: []
  }
]

describe('DeckList', () => {
  it('renders all decks', () => {
    const handleSelect = (): void => {}

    render(
      <DeckList
        decks={decks}
        selectedDeckId={null}
        onSelectDeck={handleSelect}
      />
    )

    expect(screen.getByText('Test deck 1')).toBeInTheDocument()
    expect(screen.getByText('Test deck 2')).toBeInTheDocument()
  })

  it('marks selected deck as active', () => {
    const handleSelect = (): void => {}

    render(
      <DeckList
        decks={decks}
        selectedDeckId='d1'
        onSelectDeck={handleSelect}
      />
    )

    const activeItem = screen.getByText('Test deck 1')
    expect(activeItem.className).toContain('deck-list__item--active')
  })

  it('calls onSelectDeck when deck is clicked', () => {
    let selectedId: string | null = null

    const handleSelect = (deckId: string): void => {
      selectedId = deckId
    }

    render(
      <DeckList
        decks={decks}
        selectedDeckId={null}
        onSelectDeck={handleSelect}
      />
    )

    fireEvent.click(screen.getByText('Test deck 1'))
    expect(selectedId).toBe('d1')
  })
})
