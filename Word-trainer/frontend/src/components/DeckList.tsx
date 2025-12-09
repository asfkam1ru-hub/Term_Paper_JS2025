import React from 'react'
import type { Deck } from '../types'

type DeckListProps = {
  decks: Deck[]
  selectedDeckId: string | null
  onSelectDeck: (deckId: string) => void
}

export const DeckList: React.FC<DeckListProps> = ({
  decks,
  selectedDeckId,
  onSelectDeck
}) => {
  return (
    <aside className='deck-list'>
      <h2 className='deck-list__title'>Колоды</h2>
      <ul className='deck-list__items'>
        {decks.map(deck => (
          <li
            key={deck.id}
            className={`deck-list__item ${
              deck.id === selectedDeckId ? 'deck-list__item--active' : ''
            }`}
            onClick={() => onSelectDeck(deck.id)}
          >
            {deck.name}
          </li>
        ))}
      </ul>
    </aside>
  )
}
