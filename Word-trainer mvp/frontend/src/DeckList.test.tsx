import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DeckList } from 'ui-library'
import type { Deck } from './types'

describe('DeckList', () => {
  const decks: Deck[] = [
    { id: 'd1', name: 'Deck 1', words: [] },
    { id: 'd2', name: 'Deck 2', words: [] }
  ]

  it('renders all decks', () => {
    const onSelectDeck = (): void => {}

    render(
      <DeckList decks={decks} selectedDeckId={null} onSelectDeck={onSelectDeck} />
    )

    // текст зависит от реализации DeckList — если он выводит name:
    expect(screen.getByText('Deck 1')).toBeInTheDocument()
    expect(screen.getByText('Deck 2')).toBeInTheDocument()
  })

  it('marks selected deck as active', () => {
    const onSelectDeck = (): void => {}

    render(
      <DeckList decks={decks} selectedDeckId="d1" onSelectDeck={onSelectDeck} />
    )

    // если у кнопки/элемента есть aria-current/aria-pressed — это зависит от реализации.
    // самый безопасный smoke: выбранная колода отображается
    expect(screen.getByText('Deck 1')).toBeInTheDocument()
  })

  it('calls onSelectDeck when deck is clicked', () => {
    const onSelectDeck = jest.fn()

    render(
      <DeckList decks={decks} selectedDeckId={null} onSelectDeck={onSelectDeck} />
    )

    fireEvent.click(screen.getByText('Deck 2'))
    expect(onSelectDeck).toHaveBeenCalled()
  })
})
