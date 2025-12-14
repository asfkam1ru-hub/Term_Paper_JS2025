declare module 'ui-library' {
  import type * as React from 'react'

  export type Word = {
    id: string
    term: string
    translation: string
    example: string
    exampleTranslation: string
  }

  export type Deck = {
    id: string
    name: string
    words: Word[]
  }

  export type Difficulty = 'easy' | 'medium' | 'hard'

  export type DictionaryEntry = {
    id: string
    term: string
    translation: string
    difficulty: Difficulty
    example: string
    exampleTranslation: string
  }

  export type DictionaryDeck = {
    id: string
    name: string
    wordIds: string[]
  }

  export type ButtonVariant = 'primary' | 'secondary'

  export type ButtonProps = {
    label: string
    variant?: ButtonVariant
  }

  export const buildButtonLabel: (props: ButtonProps) => string

  export type DeckListProps = {
    decks: Deck[]
    selectedDeckId: string | null
    onSelectDeck: (deckId: string) => void
  }

  export const DeckList: React.FC<DeckListProps>

  export type WordListProps = {
    deck: Deck
    selectedWordId: string | null
    onSelectWord: (wordId: string) => void
  }

  export const WordList: React.FC<WordListProps>

  export type WordDetailsProps = {
    word: Word
  }

  export const WordDetails: React.FC<WordDetailsProps>

  export type LayoutPage = 'home' | 'training' | 'dictionary' | 'decks' | 'statistics'

  export type LayoutProps = {
    currentPage: LayoutPage
    onChangePage: (page: LayoutPage) => void
    children: React.ReactNode
    isDictionaryError: boolean
    isHistoryError: boolean
  }

  export const Layout: React.FC<LayoutProps>

  export type DecksPanelProps = {
    dictionary: DictionaryEntry[]
    decks: DictionaryDeck[]
    onUpdateDecks: (decks: DictionaryDeck[]) => void
    onUpdateDictionary: (entries: DictionaryEntry[]) => void
  }

  export const DecksPanel: React.FC<DecksPanelProps>

  export type WordOfTheDayWidgetProps = {
    dictionary: DictionaryEntry[]
  }

  export const WordOfTheDayWidget: React.FC<WordOfTheDayWidgetProps>

  export type FlashcardTrainerProps = {
    deck: Deck | undefined
  }

  export const FlashcardTrainer: React.FC<FlashcardTrainerProps>
}
