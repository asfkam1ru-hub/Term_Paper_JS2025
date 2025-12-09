import React from 'react'
import type { ReactNode } from 'react'

type Page = 'home' | 'training' | 'dictionary' | 'decks' | 'statistics'

type LayoutProps = {
  currentPage: Page
  onChangePage: (page: Page) => void
  children: ReactNode
  isDictionaryError: boolean
  isHistoryError: boolean
}

export const Layout: React.FC<LayoutProps> = ({
  currentPage,
  onChangePage,
  children,
  isDictionaryError,
  isHistoryError
}) => {
  const handleNavClick = (page: Page): void => {
    onChangePage(page)
  }

  return (
    <div className='layout'>
      <header className='layout__header'>
        <h1 className='layout__title'>Тренажёр слов</h1>

        <nav className='layout__nav'>
          <button
            type='button'
            className={`layout__nav-button ${
              currentPage === 'home'
                ? 'layout__nav-button--active'
                : ''
            }`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>

          <button
            type='button'
            className={`layout__nav-button ${
              currentPage === 'training'
                ? 'layout__nav-button--active'
                : ''
            }`}
            onClick={() => handleNavClick('training')}
          >
            Training
          </button>

          <button
            type='button'
            className={`layout__nav-button ${
              currentPage === 'dictionary'
                ? 'layout__nav-button--active'
                : ''
            }`}
            onClick={() => handleNavClick('dictionary')}
          >
            Dictionary
          </button>

          <button
            type='button'
            className={`layout__nav-button ${
              currentPage === 'decks'
                ? 'layout__nav-button--active'
                : ''
            }`}
            onClick={() => handleNavClick('decks')}
          >
            Decks
          </button>

          <button
            type='button'
            className={`layout__nav-button ${
              currentPage === 'statistics'
                ? 'layout__nav-button--active'
                : ''
            }`}
            onClick={() => handleNavClick('statistics')}
          >
            Statistics
          </button>
        </nav>
      </header>

      <main className='layout__main'>
        {isDictionaryError && (
          <div className='layout__error'>
            Произошла ошибка при загрузке словаря. Вы можете
            очистить локальное хранилище на странице Dictionary.
          </div>
        )}

        {isHistoryError && (
          <div className='layout__error'>
            Произошла ошибка при загрузке истории тренировок.
            Новые результаты будут сохранены корректно.
          </div>
        )}

        {children}
      </main>
    </div>
  )
}
