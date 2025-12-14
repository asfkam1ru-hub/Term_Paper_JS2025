import React from 'react'
import type { DictionaryEntry, TrainingSession } from '../types'
import { WordOfTheDayWidget, buildButtonLabel } from 'ui-library'

type HomePageProps = {
  dictionary: DictionaryEntry[]
  history: TrainingSession[]
  onStartTraining: () => void
}

const getAverageAccuracy = (
  history: TrainingSession[]
): number => {
  if (history.length === 0) {
    return 0
  }

  const sum = history.reduce(
    (total, session) => total + session.accuracy,
    0
  )

  return Math.round(sum / history.length)
}

const getLearnedWordsCount = (
  history: TrainingSession[]
): number => {
  const learnedIds = new Set<string>()

  history.forEach(session => {
    session.correctWordIds.forEach(id => {
      learnedIds.add(id)
    })
  })

  return learnedIds.size
}

export const HomePage: React.FC<HomePageProps> = ({
  dictionary,
  history,
  onStartTraining
}) => {
  const learnedCount = getLearnedWordsCount(history)
  const averageAccuracy = getAverageAccuracy(history)

  const trainingButtonLabel = buildButtonLabel({
    label: 'Начать тренировку'
  })

  return (
    <div className='home'>
      <section className='home__hero'>
        <div className='home__hero-left'>
          <h2 className='home__title'>
            Карточки для запоминания слов
          </h2>
          <p className='home__subtitle'>
            Как в Anki, только под ваши слова: тренируйте
            словарный запас, повторяйте сложные слова и следите
            за прогрессом каждый день.
          </p>

          <button
            type='button'
            className='home__start-button'
            onClick={onStartTraining}
          >
            {trainingButtonLabel}
          </button>
        </div>

        <div className='home__hero-right home-hero-card'>
          <div className='home-hero-card__label'>
            Пример карточки
          </div>
          <div className='home-hero-card__front'>
            apple
          </div>
          <div className='home-hero-card__back'>
            <div className='home-hero-card__translation'>
              яблоко
            </div>
            <div className='home-hero-card__example'>
              I eat an apple every morning
            </div>
            <div className='home-hero-card__example-translation'>
              Я ем яблоко каждое утро
            </div>
          </div>
        </div>
      </section>

      <section className='home__stats'>
        <div className='stat-card'>
          <div className='stat-card__label'>
            Слов в словаре
          </div>
          <div className='stat-card__value'>
            {dictionary.length}
          </div>
        </div>

        <div className='stat-card'>
          <div className='stat-card__label'>
            Выученные слова
          </div>
          <div className='stat-card__value'>
            {learnedCount}
          </div>
        </div>

        <div className='stat-card'>
          <div className='stat-card__label'>
            Средняя точность
          </div>
          <div className='stat-card__value'>
            {averageAccuracy}%
          </div>
        </div>
      </section>

      <section className='home__word-of-day'>
        <h3 className='section-title'>
          Слово дня
        </h3>
        <div className='home__word-of-day-card'>
          <WordOfTheDayWidget dictionary={dictionary} />
        </div>
      </section>
    </div>
  )
}
