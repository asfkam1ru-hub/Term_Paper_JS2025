import React, { useMemo, useState } from 'react'
import type {
  DictionaryEntry,
  TrainingQuestion,
  TrainingSession
} from '../types'

type TrainingPageProps = {
  dictionary: DictionaryEntry[]
  onFinishSession: (session: TrainingSession) => void
  onGoToDictionary: () => void
  onGoToStatistics: () => void
}

type TrainingStep = 'questions' | 'summary'

type QuestionState = {
  currentIndex: number
  selectedOption: string | null
  isCorrect: boolean | null
}

const MIN_WORDS_FOR_TRAINING = 3

const shuffleArray = <TData,>(items: TData[]): TData[] => {
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    )
    const temporary = copy[index]
    copy[index] = copy[randomIndex]
    copy[randomIndex] = temporary
  }

  return copy
}

const buildQuestions = (
  dictionary: DictionaryEntry[]
): TrainingQuestion[] => {
  const shuffledWords = shuffleArray(dictionary)

  return shuffledWords.map(word => {
    const otherTranslations = dictionary
      .filter(entry => entry.id !== word.id)
      .map(entry => entry.translation)

    const randomOptions = shuffleArray(otherTranslations).slice(
      0,
      3
    )

    const options = shuffleArray([
      word.translation,
      ...randomOptions
    ])

    return {
      id: `q-${word.id}`,
      wordId: word.id,
      term: word.term,
      correctTranslation: word.translation,
      options
    }
  })
}

export const TrainingPage: React.FC<TrainingPageProps> = ({
  dictionary,
  onFinishSession,
  onGoToDictionary,
  onGoToStatistics
}) => {
  const [step, setStep] = useState<TrainingStep>('questions')
  const [questionState, setQuestionState] =
    useState<QuestionState>({
      currentIndex: 0,
      selectedOption: null,
      isCorrect: null
    })
  const [correctWordIds, setCorrectWordIds] = useState<string[]>(
    []
  )
  const [wrongWordIds, setWrongWordIds] = useState<string[]>([])

  const questions = useMemo(() => {
    if (dictionary.length < MIN_WORDS_FOR_TRAINING) {
      return []
    }

    return buildQuestions(dictionary)
  }, [dictionary])

  const hasEnoughWords =
    dictionary.length >= MIN_WORDS_FOR_TRAINING

  const currentQuestion: TrainingQuestion | undefined =
    questions[questionState.currentIndex]

  const handleSelectOption = (option: string): void => {
    if (!currentQuestion) {
      return
    }

    const isCorrect =
      option === currentQuestion.correctTranslation

    setQuestionState(previous => ({
      ...previous,
      selectedOption: option,
      isCorrect
    }))

    setCorrectWordIds(previous => {
      if (isCorrect) {
        return [...previous, currentQuestion.wordId]
      }

      return previous
    })

    setWrongWordIds(previous => {
      if (!isCorrect) {
        return [...previous, currentQuestion.wordId]
      }

      return previous
    })
  }

  const handleNextQuestion = (): void => {
    if (questions.length === 0) {
      return
    }

    if (questionState.currentIndex === questions.length - 1) {
      const totalQuestions = questions.length
      const correctAnswers = correctWordIds.length
      const accuracy =
        totalQuestions === 0
          ? 0
          : Math.round(
            (correctAnswers / totalQuestions) * 100
          )

      const session: TrainingSession = {
        id: `session-${Date.now().toString()}`,
        date: new Date().toISOString(),
        totalQuestions,
        correctAnswers,
        accuracy,
        correctWordIds,
        wrongWordIds
      }

      onFinishSession(session)
      setStep('summary')
      return
    }

    setQuestionState(previous => ({
      currentIndex: previous.currentIndex + 1,
      selectedOption: null,
      isCorrect: null
    }))
  }

  if (!hasEnoughWords) {
    return (
      <div className='training-page'>
        <h2>Тренировка слов</h2>
        <p>
          Недостаточно слов — добавьте минимум 3 слова в
          словарь.
        </p>
        <button
          type='button'
          onClick={onGoToDictionary}
          className='training-page__link-button'
        >
          Перейти к словарю
        </button>
      </div>
    )
  }

  if (step === 'summary') {
    const totalQuestions = questions.length
    const correctAnswers = correctWordIds.length
    const accuracy =
      totalQuestions === 0
        ? 0
        : Math.round(
          (correctAnswers / totalQuestions) * 100
        )

    return (
      <div className='training-page'>
        <h2>Результат тренировки</h2>
        <p>Всего вопросов: {totalQuestions}</p>
        <p>Правильных ответов: {correctAnswers}</p>
        <p>Точность: {accuracy}%</p>

        <p className='training-page__hint'>
          Рекомендации: потренируйте слова со сложностью
          "medium" и "hard" и те, где вы ошибались.
        </p>

        <div className='training-page__actions'>
          <button
            type='button'
            onClick={() => {
              setStep('questions')
              setQuestionState({
                currentIndex: 0,
                selectedOption: null,
                isCorrect: null
              })
              setCorrectWordIds([])
              setWrongWordIds([])
            }}
          >
            Начать новую тренировку
          </button>

          <button
            type='button'
            onClick={onGoToDictionary}
          >
            Перейти к словарю
          </button>

          <button
            type='button'
            onClick={onGoToStatistics}
          >
            Перейти к статистике
          </button>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className='training-page'>
      <h2>Тренировка слов</h2>

      <p className='training-page__progress'>
        Вопрос {questionState.currentIndex + 1} из{' '}
        {questions.length}
      </p>

      <div className='training-page__question-card'>
        <p className='training-page__term'>
          {currentQuestion.term}
        </p>

        <div className='training-page__options'>
          {currentQuestion.options.map(option => {
            const isSelected =
              questionState.selectedOption === option
            const isCorrectOption =
              option === currentQuestion.correctTranslation

            let optionClass = 'training-page__option'

            if (questionState.selectedOption) {
              if (isCorrectOption) {
                optionClass +=
                  ' training-page__option--correct'
              } else if (isSelected) {
                optionClass +=
                  ' training-page__option--wrong'
              }
            } else if (isSelected) {
              optionClass +=
                ' training-page__option--selected'
            }

            return (
              <button
                key={option}
                type='button'
                className={optionClass}
                onClick={() => handleSelectOption(option)}
                disabled={
                  questionState.selectedOption !== null
                }
              >
                {option}
              </button>
            )
          })}
        </div>

        {questionState.selectedOption !== null && (
          <button
            type='button'
            className='training-page__next-button'
            onClick={handleNextQuestion}
          >
            Далее
          </button>
        )}
      </div>
    </div>
  )
}
