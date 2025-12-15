export type * from './types'

// Components
export { DeckList } from './components/DeckList'
export { DecksPanel } from './components/DecksPanel'
export { FlashcardTrainer } from './components/FlashcardTrainer'
export { Layout } from './components/Layout'
export { WordDetails } from './components/WordDetails'
export { WordList } from './components/WordList'
export { WordOfTheDayWidget } from './components/WordOfTheDayWidget'

// Utils
export function buildButtonLabel(label: string): string {
  return label
}
