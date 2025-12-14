import React from 'react'
import type {
  TrainingSession
} from '../types'

type StatisticsPageProps = {
  history: TrainingSession[]
}

const calculateAverageAccuracy = (
  history: TrainingSession[]
): number => {
  if (history.length === 0) {
    return 0
  }

  const sum = history.reduce(
    (accumulator, session) => accumulator + session.accuracy,
    0
  )

  return Math.round(sum / history.length)
}

const calculateLearnedWords = (
  history: TrainingSession[]
): number => {
  const learned = new Set<string>()

  history.forEach(session => {
    session.correctWordIds.forEach(id => {
      learned.add(id)
    })
  })

  return learned.size
}

export const StatisticsPage: React.FC<
  StatisticsPageProps
> = ({ history }) => {
  const averageAccuracy =
    calculateAverageAccuracy(history)
  const learnedWordsCount =
    calculateLearnedWords(history)

  return (
    <div className='statistics-page'>
      <h2>Статистика</h2>

      <section className='statistics-page__summary'>
        <div className='statistics-page__card'>
          <h3>Всего тренировок</h3>
          <p>{history.length}</p>
        </div>
        <div className='statistics-page__card'>
          <h3>Средняя точность</h3>
          <p>{averageAccuracy}%</p>
        </div>
        <div className='statistics-page__card'>
          <h3>Выученные слова</h3>
          <p>{learnedWordsCount}</p>
        </div>
      </section>

      <section className='statistics-page__history'>
        <h3>История тренировок</h3>

        {history.length === 0 ? (
          <p>Вы ещё не проходили тренировки.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Вопросов</th>
                <th>Правильных</th>
                <th>Точность</th>
              </tr>
            </thead>
            <tbody>
              {history.map(session => (
                <tr key={session.id}>
                  <td>
                    {new Date(
                      session.date
                    ).toLocaleString()}
                  </td>
                  <td>{session.totalQuestions}</td>
                  <td>{session.correctAnswers}</td>
                  <td>{session.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
