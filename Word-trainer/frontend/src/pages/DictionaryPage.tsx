import React, { useMemo, useState } from 'react'
import type {
  DictionaryEntry,
  DictionaryDeck,
  Difficulty
} from '../types'
import {
  clearDictionaryStorage,
  saveDictionary
} from '../storage'

type DictionaryPageProps = {
  dictionary: DictionaryEntry[]
  decks: DictionaryDeck[]
  onUpdateDictionary: (entries: DictionaryEntry[]) => void
  onUpdateDecks: (decks: DictionaryDeck[]) => void
  hasError: boolean
}

type FilterDifficulty = Difficulty | 'all'

type FormState = {
  id: string | null
  term: string
  translation: string
  example: string
  exampleTranslation: string
  difficulty: Difficulty
}

type DeckSelectionState = {
  [wordId: string]: string
}

const buildEmptyFormState = (): FormState => ({
  id: null,
  term: '',
  translation: '',
  example: '',
  exampleTranslation: '',
  difficulty: 'easy'
})

const getDeckNamesForWord = (
  wordId: string,
  decks: DictionaryDeck[]
): string[] =>
  decks
    .filter(deck => deck.wordIds.includes(wordId))
    .map(deck => deck.name)

export const DictionaryPage: React.FC<DictionaryPageProps> = ({
  dictionary,
  decks,
  onUpdateDictionary,
  onUpdateDecks,
  hasError
}) => {
  const [filter, setFilter] = useState<FilterDifficulty>('all')
  const [formState, setFormState] = useState<FormState>(
    buildEmptyFormState()
  )
  const [deckSelections, setDeckSelections] =
    useState<DeckSelectionState>({})

  const filteredDictionary = useMemo(() => {
    if (filter === 'all') {
      return dictionary
    }

    return dictionary.filter(
      entry => entry.difficulty === filter
    )
  }, [dictionary, filter])

  const handleChangeFilter = (
    value: FilterDifficulty
  ): void => {
    setFilter(value)
  }

  const handleChangeForm = (
    field: keyof FormState,
    value: string
  ): void => {
    if (field === 'difficulty') {
      setFormState(previous => ({
        ...previous,
        difficulty: value as Difficulty
      }))
      return
    }

    setFormState(previous => ({
      ...previous,
      [field]: value
    }))
  }

  const handleEdit = (entry: DictionaryEntry): void => {
    setFormState({
      id: entry.id,
      term: entry.term,
      translation: entry.translation,
      example: entry.example,
      exampleTranslation: entry.exampleTranslation,
      difficulty: entry.difficulty
    })
  }

  const handleDelete = (id: string): void => {
    const updated = dictionary.filter(entry => entry.id !== id)
    onUpdateDictionary(updated)
  }

  const handleClearStorage = (): void => {
    clearDictionaryStorage()
    onUpdateDictionary([])
    onUpdateDecks(
      decks.map(deck => ({
        ...deck,
        wordIds: []
      }))
    )
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    if (!formState.term.trim() || !formState.translation.trim()) {
      return
    }

    let updated: DictionaryEntry[]

    if (formState.id) {
      updated = dictionary.map(entry =>
        entry.id === formState.id
          ? {
              ...entry,
              term: formState.term.trim(),
              translation: formState.translation.trim(),
              example: formState.example.trim(),
              exampleTranslation:
                formState.exampleTranslation.trim(),
              difficulty: formState.difficulty
            }
          : entry
      )
    } else {
      const newEntry: DictionaryEntry = {
        id: `d-${Date.now().toString()}`,
        term: formState.term.trim(),
        translation: formState.translation.trim(),
        example: formState.example.trim(),
        exampleTranslation:
          formState.exampleTranslation.trim(),
        difficulty: formState.difficulty
      }

      updated = [...dictionary, newEntry]
    }

    onUpdateDictionary(updated)
    saveDictionary(updated)
    setFormState(buildEmptyFormState())
  }

  const handleDeckSelectionChange = (
    wordId: string,
    deckId: string
  ): void => {
    setDeckSelections(previous => ({
      ...previous,
      [wordId]: deckId
    }))
  }

  const handleAddWordToDeck = (wordId: string): void => {
    const deckId = deckSelections[wordId]
    if (!deckId) {
      return
    }

    const updatedDecks = decks.map(deck =>
      deck.id === deckId
        ? deck.wordIds.includes(wordId)
          ? deck
          : { ...deck, wordIds: [...deck.wordIds, wordId] }
        : deck
    )

    onUpdateDecks(updatedDecks)

    setDeckSelections(previous => ({
      ...previous,
      [wordId]: ''
    }))
  }

  return (
    <div className='dictionary'>
      <div className='dictionary__header'>
        <div>
          <h2 className='section-title'>
            Dictionary
          </h2>
          <p className='section-subtitle'>
            Список всех слов и выражений, как в браузере Anki
          </p>
        </div>

        <div className='dictionary__filter'>
          <span>Сложность:</span>
          <select
            value={filter}
            onChange={event =>
              handleChangeFilter(
                event.target.value as FilterDifficulty
              )
            }
          >
            <option value='all'>Все</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
      </div>

      {hasError && (
        <div className='dictionary__error'>
          Не удалось корректно прочитать словарь или колоды из
          локального хранилища. Вы можете очистить их и начать
          заново.
          <button
            type='button'
            className='button button--danger'
            onClick={handleClearStorage}
          >
            Очистить словарь
          </button>
        </div>
      )}

      <section className='dictionary__form-section'>
        <h3 className='section-title section-title--small'>
          {formState.id
            ? 'Редактирование слова'
            : 'Добавить новое слово'}
        </h3>

        <form
          className='dictionary-form'
          onSubmit={handleSubmit}
        >
          <div className='dictionary-form__row'>
            <input
              type='text'
              placeholder='Слово'
              value={formState.term}
              onChange={event =>
                handleChangeForm(
                  'term',
                  event.target.value
                )
              }
            />
            <input
              type='text'
              placeholder='Перевод'
              value={formState.translation}
              onChange={event =>
                handleChangeForm(
                  'translation',
                  event.target.value
                )
              }
            />
          </div>

          <div className='dictionary-form__row'>
            <input
              type='text'
              placeholder='Контекстное предложение'
              value={formState.example}
              onChange={event =>
                handleChangeForm(
                  'example',
                  event.target.value
                )
              }
            />
            <input
              type='text'
              placeholder='Перевод предложения'
              value={formState.exampleTranslation}
              onChange={event =>
                handleChangeForm(
                  'exampleTranslation',
                  event.target.value
                )
              }
            />
          </div>

          <div className='dictionary-form__row dictionary-form__row--last'>
            <select
              value={formState.difficulty}
              onChange={event =>
                handleChangeForm(
                  'difficulty',
                  event.target.value
                )
              }
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>

            <button
              type='submit'
              className='button button--primary'
            >
              {formState.id ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </section>

      <section className='dictionary__list'>
        {filteredDictionary.length === 0 && (
          <div className='dictionary__empty'>
            В словаре нет слов с таким фильтром
          </div>
        )}

        <div className='dictionary__cards'>
          {filteredDictionary.map(entry => {
            const deckNames = getDeckNamesForWord(
              entry.id,
              decks
            )

            const availableDecks = decks.filter(
              deck => !deck.wordIds.includes(entry.id)
            )

            const selectedDeckId =
              deckSelections[entry.id] ?? ''

            return (
              <article
                key={entry.id}
                className='word-card'
              >
                <header className='word-card__header'>
                  <div>
                    <div className='word-card__term'>
                      {entry.term}
                    </div>
                    <div className='word-card__translation'>
                      {entry.translation}
                    </div>
                  </div>

                  <span className={`badge badge--${entry.difficulty}`}>
                    {entry.difficulty}
                  </span>
                </header>

                {(entry.example || entry.exampleTranslation) && (
                  <div className='word-card__example'>
                    {entry.example && (
                      <div className='word-card__example-text'>
                        {entry.example}
                      </div>
                    )}
                    {entry.exampleTranslation && (
                      <div className='word-card__example-translation'>
                        {entry.exampleTranslation}
                      </div>
                    )}
                  </div>
                )}

                <div className='word-card__meta'>
                  <span>
                    Decks:{' '}
                    {deckNames.length === 0
                      ? '—'
                      : deckNames.join(', ')}
                  </span>
                </div>

                {/* Добавление существующего слова в колоду */}
                {availableDecks.length > 0 && (
                  <div className='word-card__add-to-deck'>
                    <select
                      value={selectedDeckId}
                      onChange={event =>
                        handleDeckSelectionChange(
                          entry.id,
                          event.target.value
                        )
                      }
                    >
                      <option value=''>
                        Добавить в колоду...
                      </option>
                      {availableDecks.map(deck => (
                        <option
                          key={deck.id}
                          value={deck.id}
                        >
                          {deck.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type='button'
                      className='button button--primary'
                      onClick={() =>
                        handleAddWordToDeck(entry.id)
                      }
                    >
                      Добавить
                    </button>
                  </div>
                )}

                <footer className='word-card__footer'>
                  <button
                    type='button'
                    className='button button--ghost'
                    onClick={() => handleEdit(entry)}
                  >
                    Редактировать
                  </button>
                  <button
                    type='button'
                    className='button button--danger-ghost'
                    onClick={() =>
                      handleDelete(entry.id)
                    }
                  >
                    Удалить
                  </button>
                </footer>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
