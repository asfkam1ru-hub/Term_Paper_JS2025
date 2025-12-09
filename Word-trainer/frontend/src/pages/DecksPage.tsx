import React from 'react'
import type {
  DictionaryEntry,
  DictionaryDeck
} from '../types'
import { DecksPanel } from '../components/DecksPanel'

type DecksPageProps = {
  dictionary: DictionaryEntry[]
  decks: DictionaryDeck[]
  onUpdateDictionary: (entries: DictionaryEntry[]) => void
  onUpdateDecks: (decks: DictionaryDeck[]) => void
  hasError: boolean
}

export const DecksPage: React.FC<DecksPageProps> = ({
  dictionary,
  decks,
  onUpdateDictionary,
  onUpdateDecks,
  hasError
}) => {
  return (
    <div className='dictionary'>
      <div className='dictionary__header'>
        <div>
          <h2 className='section-title'>
            Decks
          </h2>
          <p className='section-subtitle'>
            Управление колодами слов, как в Anki
          </p>
        </div>
      </div>

      {hasError && (
        <div className='dictionary__error'>
          Не удалось корректно прочитать данные колод из
          локального хранилища. Новые колоды будут сохранены
          корректно.
        </div>
      )}

      <section className='dictionary__decks'>
        <DecksPanel
          dictionary={dictionary}
          decks={decks}
          onUpdateDecks={onUpdateDecks}
          onUpdateDictionary={onUpdateDictionary}
        />
      </section>
    </div>
  )
}
