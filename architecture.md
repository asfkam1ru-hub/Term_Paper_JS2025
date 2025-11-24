Структура проекта
Обзор

Репозиторий курсовой содержит два отдельных проекта:

frontend — основное приложение (тренажёр слов)
ui-library — библиотека переиспользуемых UI-компонентов

Корень репозитория:

Term_Paper_JS2025/
├── frontend/          # основное приложение
├── ui-library/        # общая UI-библиотека
├── package.json       # (опционально) корневой, без лишних зависимостей
├── README.md
└── .gitignore

Структура frontend
frontend/
├── public/
│   └── index.html
├── src/
│   ├── app/
│   │   ├── routes/
│   │   │   └── AppRouter.tsx          # конфигурация роутинга
│   │   ├── store/                     # (если используем глобальное состояние)
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useTraining.ts         # общий хук для сессии тренировки
│   │   │   └── useDictionary.ts       # общий хук для словаря
│   │   ├── types/
│   │   │   └── index.ts               # общие типы приложения
│   │   └── AppProviders.tsx           # провайдеры (Router, Theme и т.п.)
│   │
│   ├── pages/
│   │   ├── HomePage/
│   │   │   ├── HomePage.tsx           # приветственный экран / выбор режима
│   │   │   └── index.ts
│   │   ├── TrainingPage/
│   │   │   ├── TrainingPage.tsx       # основная тренировка слов
│   │   │   └── index.ts
│   │   ├── DictionaryPage/
│   │   │   ├── DictionaryPage.tsx     # управление словарём
│   │   │   └── index.ts
│   │   ├── StatisticsPage/
│   │   │   ├── StatisticsPage.tsx     # страница статистики
│   │   │   └── index.ts
│   │   └── NotFoundPage/
│   │       ├── NotFoundPage.tsx       # 404
│   │       └── index.ts
│   │
│   ├── features/
│   │   ├── training/
│   │   │   ├── components/
│   │   │   │   ├── TrainingSession.tsx  # логика и UI конкретной сессии
│   │   │   │   ├── QuestionCard.tsx     # карточка с текущим словом/вариантами
│   │   │   │   └── ProgressBar.tsx      # прогресс по сессии
│   │   │   ├── api/
│   │   │   │   └── trainingApi.ts       # работа с хранилищем слов/статистикой
│   │   │   └── types.ts
│   │   ├── dictionary/
│   │   │   ├── components/
│   │   │   │   ├── WordList.tsx         # список/таблица слов
│   │   │   │   └── WordForm.tsx         # форма добавления/редактирования слова
│   │   │   ├── api/
│   │   │   │   └── dictionaryApi.ts
│   │   │   └── types.ts
│   │   └── statistics/
│   │       ├── components/
│   │       │   └── StatsSummary.tsx     # виджет с основными метриками
│   │       └── api/
│   │           └── statisticsApi.ts
│   │
│   ├── widgets/
│   │   ├── Layout/
│   │   │   ├── AppLayout.tsx           # общий layout с хедером/меню
│   │   │   ├── AppHeader.tsx
│   │   │   └── AppSidebar.tsx
│   │   └── WordOfTheDay/
│   │       └── WordOfTheDay.tsx        # виджет "слово дня"
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Loader/
│   │   │   │   └── Loader.tsx          # индикатор загрузки
│   │   │   └── ErrorMessage/
│   │   │       └── ErrorMessage.tsx    # отображение ошибок
│   │   ├── utils/
│   │   │   ├── validators.ts           # валидации форм и т.п.
│   │   │   └── formatters.ts           # форматирование текста, дат и т.п.
│   │   ├── constants/
│   │   │   └── routes.ts               # константы путей роутера
│   │   └── types/
│   │       └── common.ts               # общие типы, enum’ы
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   │
│   ├── tests/
│   │   └── setupTests.ts               # конфиг тестов (RTL, jest-dom)
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.mjs (или .js)
└── jest.config.cjs (или .js)

Структура ui-library
ui-library/
├── src/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.types.ts
│   │   ├── Input.test.tsx
│   │   └── index.ts
│   ├── TextArea/
│   │   ├── TextArea.tsx
│   │   ├── TextArea.types.ts
│   │   ├── TextArea.test.tsx
│   │   └── index.ts
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.types.ts
│   │   ├── Card.test.tsx
│   │   └── index.ts
│   ├── theme/
│   │   ├── palette.ts                  # цвета
│   │   ├── typography.ts               # шрифты/размеры
│   │   └── index.ts
│   ├── types/
│   │   └── common.ts                   # общие типы библиотеки
│   └── index.ts                        # публичный API (реэкспорт компонентов)
│
├── package.json
├── tsconfig.json
├── vite.config.ts                      # демо-стенд / сборка
├── eslint.config.js
├── jest.config.js
└── .gitignore

Используемые библиотеки

Версии в описании должны совпадать с тем, что реально в твоих package.json. Ниже — в том же стиле, что ты показывал.

Runtime зависимости (frontend)

"react": "^18.x.x" — основная UI-библиотека

"react-dom": "^18.x.x" — рендеринг React-компонентов в DOM

"react-router-dom": "^6.x.x" — маршрутизация между страницами приложения

"@my-app/ui-library": "workspace:*" — локальная библиотека UI-компонентов (наш проект ui-library)

(если используешь что-то ещё из примера преподавателя — добавляешь сюда тем же форматом)

Runtime зависимости (ui-library)

"react": "^18.x.x" — для типов и JSX

"react-dom": "^18.x.x" — для тестов/рендеринга
(обычно как peerDependencies + devDependencies)

Dev зависимости (оба проекта, по примеру)

"typescript": "~5.x.x" — статическая типизация

"vite": "^5.x.x" — сборщик и dev-сервер

"eslint": "^9.x.x" — линтинг

"@eslint/js": "^9.x.x" — базовые правила ESLint

"typescript-eslint": "^8.x.x" (parser + plugin) — поддержка TS в ESLint

"globals": "^15.x.x" — набор глобальных переменных для ESLint

"jest": "^29.x.x" — тестовый раннер

"@testing-library/react": "^14.x.x" — тестирование React-компонентов

"@testing-library/jest-dom": "^6.x.x" — матчеры для jest

"ts-jest" или другой пресет (если нужен для TS-тестов)

Компоненты
UI-библиотека (ui-library)

Button

Назначение: базовая кнопка (primary/secondary, размер, disabled), используется во всех формах и действиях приложения.

Input

Назначение: однострочное поле ввода текста (слово, перевод, фильтры).

TextArea

Назначение: многострочное поле ввода (описание, заметки, комментарии к слову).

Card

Назначение: визуальное оформление блоков (карточка слова, блока статистики, виджет “слово дня”).

Все эти компоненты универсальные и не знают ничего о доменной логике “тренажёра слов”.

Компоненты frontend
Основные UI-блоки

TrainingSession (features/training/components/TrainingSession.tsx)
Логика и оформление одной тренировки: выбор слова, проверка ответа, переход к следующему, обновление статистики.

QuestionCard (features/training/components/QuestionCard.tsx)
Отдельная карточка с текущим заданием: слово/перевод, варианты ответа или поле ввода.

ProgressBar (features/training/components/ProgressBar.tsx)
Отображение прогресса по текущей сессии (сколько слов пройдено, % успеха).

WordList (features/dictionary/components/WordList.tsx)
Список/таблица слов из словаря, с возможностью фильтрации и сортировки.

WordForm (features/dictionary/components/WordForm.tsx)
Форма добавления/редактирования слова (слово, перевод, уровень сложности и т.п.).

StatsSummary (features/statistics/components/StatsSummary.tsx)
Краткий блок статистики по всему времени (выучено слов, точность, активность).

Страницы (pages)

HomePage (/)
Краткое описание тренажёра, кнопка “Начать тренировку”, переход к словарю/статистике.

TrainingPage (/training)
Основной экран тренировки: блок TrainingSession, прогресс, возможно — выбор режима.

DictionaryPage (/dictionary)
Работа со словарём: список слов (WordList), форма добавления (WordForm).

StatisticsPage (/statistics)
Просмотр статистики: StatsSummary, дополнительные графики/таблицы.

NotFoundPage (*)
Отображение 404 для несуществующих маршрутов.

Виджеты и shared

AppLayout (widgets/Layout/AppLayout.tsx)
Общий каркас приложения: шапка, боковое меню/навигация, область контента.

AppHeader, AppSidebar
Навигация по страницам (Training, Dictionary, Statistics), логотип/название приложения.

WordOfTheDay (widgets/WordOfTheDay/WordOfTheDay.tsx)
Небольшой виджет, который показывает “слово дня” на Home/Statistics.

Loader (shared/components/Loader/Loader.tsx)
Индикатор загрузки (спиннер) для страниц/блоков.

ErrorMessage (shared/components/ErrorMessage/ErrorMessage.tsx)
Универсальный блок для отображения ошибок.

Структура роутинга и отображаемых страниц

Маршрутизация настроена через react-router-dom.

Основные маршруты:

/ — HomePage
Краткое описание, кнопки перехода в тренажёр и словарь.

/training — TrainingPage
Основной игровой экран тренировки слов: карточка вопроса, прогресс, управление сессией.

/dictionary — DictionaryPage
Управление словарём: список слов, добавление, редактирование.

/statistics — StatisticsPage
Страница с общей статистикой по обучению.

* — NotFoundPage
Обработка всех несуществующих маршрутов (404).

Реализуется в frontend/src/app/routes/AppRouter.tsx и используется в App.tsx:

AppRouter описывает список роутов и какие страницы на них рендерятся.

AppLayout оборачивает контент и даёт общий хедер/навигацию для всех страниц.





