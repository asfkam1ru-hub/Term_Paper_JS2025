import React, { useEffect, useState } from 'react'
import { initialDictionary } from './dictionaryData'
import {
  loadDictionary,
  loadHistory,
  saveDictionary,
  saveHistory,
  loadDecks,
  saveDecks
} from './storage'
import type {
  DictionaryEntry,
  TrainingSession,
  DictionaryDeck
} from './types'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { TrainingPage } from './pages/TrainingPage'
import { DictionaryPage } from './pages/DictionaryPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { DecksPage } from './pages/DecksPage'

type Page = 'home' | 'training' | 'dictionary' | 'decks' | 'statistics'

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [dictionary, setDictionary] = useState<DictionaryEntry[]>([])
  const [history, setHistory] = useState<TrainingSession[]>([])
  const [decks, setDecks] = useState<DictionaryDeck[]>([])
  const [dictionaryError, setDictionaryError] = useState<boolean>(false)
  const [historyError, setHistoryError] = useState<boolean>(false)
  const [decksError, setDecksError] = useState<boolean>(false)

  useEffect(() => {
    const dictionaryResult = loadDictionary(initialDictionary)
    setDictionary(dictionaryResult.data)
    setDictionaryError(dictionaryResult.error)

    const historyResult = loadHistory()
    setHistory(historyResult.data)
    setHistoryError(historyResult.error)

    const decksResult = loadDecks()
    setDecks(decksResult.data)
    setDecksError(decksResult.error)
  }, [])

  const handleChangePage = (page: Page): void => {
    setCurrentPage(page)
  }

  const handleStartTraining = (): void => {
    setCurrentPage('training')
  }

  const handleUpdateDictionary = (
    entries: DictionaryEntry[]
  ): void => {
    setDictionary(entries)
    saveDictionary(entries)

    // очищаем из колод ссылки на удалённые слова
    const cleanedDecks = decks.map(deck => ({
      ...deck,
      wordIds: deck.wordIds.filter(wordId =>
        entries.some(entry => entry.id === wordId)
      )
    }))

    setDecks(cleanedDecks)
    saveDecks(cleanedDecks)
  }

  const handleUpdateDecks = (
    updatedDecks: DictionaryDeck[]
  ): void => {
    setDecks(updatedDecks)
    saveDecks(updatedDecks)
  }

  const handleFinishSession = (
    session: TrainingSession
  ): void => {
    const updatedHistory = [...history, session]
    setHistory(updatedHistory)
    saveHistory(updatedHistory)
  }

  const renderPage = (): React.ReactNode => {
    if (currentPage === 'home') {
      return (
        <HomePage
          dictionary={dictionary}
          history={history}
          onStartTraining={handleStartTraining}
        />
      )
    }

    if (currentPage === 'training') {
      return (
        <TrainingPage
          dictionary={dictionary}
          onFinishSession={handleFinishSession}
          onGoToDictionary={() => handleChangePage('dictionary')}
          onGoToStatistics={() => handleChangePage('statistics')}
        />
      )
    }

    if (currentPage === 'dictionary') {
      return (
        <DictionaryPage
          dictionary={dictionary}
          decks={decks}
          onUpdateDictionary={handleUpdateDictionary}
          onUpdateDecks={handleUpdateDecks}
          hasError={dictionaryError || decksError}
        />
      )
    }

    if (currentPage === 'decks') {
      return (
        <DecksPage
          dictionary={dictionary}
          decks={decks}
          onUpdateDictionary={handleUpdateDictionary}
          onUpdateDecks={handleUpdateDecks}
          hasError={decksError}
        />
      )
    }

    return (
      <StatisticsPage
        dictionary={dictionary}
        history={history}
      />
    )
  }

  return (
    <Layout
      currentPage={currentPage}
      onChangePage={handleChangePage}
      isDictionaryError={dictionaryError}
      isHistoryError={historyError}
    >
      {renderPage()}
    </Layout>
  )
}
