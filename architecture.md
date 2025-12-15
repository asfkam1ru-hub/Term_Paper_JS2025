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

Word-trainer/
├── README.md
├── package-lock.json
│
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── jest.config.mjs
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── types.ts
│       ├── ui-library.d.ts
│       ├── setupTests.ts
│       ├── data.ts
│       ├── dictionaryData.ts
│       ├── storage.ts
│       ├── test/
│       │   └── styleMock.ts
│       ├── pages/
│       │   ├── HomePage.tsx
│       │   ├── DecksPage.tsx
│       │   ├── DictionaryPage.tsx
│       │   ├── TrainingPage.tsx
│       │   └── StatisticsPage.tsx
│       ├── App.test.tsx
│       └── DeckList.test.tsx
│
└── ui-library/
    ├── package.json
    ├── vite.config.ts
    ├── jest.config.mjs
    └── src/
        ├── index.ts
        ├── types.ts
        └── components/
            ├── Layout.tsx
            ├── DecksPanel.tsx
            ├── DeckList.tsx
            ├── DeckList.test.tsx
            ├── WordList.tsx
            ├── WordDetails.tsx
            ├── FlashcardTrainer.tsx
            └── WordOfTheDayWidget.tsx


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





