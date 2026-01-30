Crypto Dashboard / Крипто Дашборд
Современный трекер криптовалютного портфеля на Next.js, TypeScript и TanStack Query.
A modern cryptocurrency portfolio tracker built with Next.js, TypeScript, and TanStack Query.

https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js
https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript
https://img.shields.io/badge/TanStack_Query-5.x-red?style=flat-square
https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css

🚀 Features / Возможности
📊 Real-time cryptocurrency prices (CoinGecko API) / Реальные курсы криптовалют (CoinGecko API)

💼 Portfolio management with localStorage persistence / Управление портфелем с сохранением в localStorage

📈 Interactive price charts / Интерактивные графики цен

🌙 Dark & light themes / Тёмная и светлая тема

📱 Fully responsive design / Полностью адаптивный дизайн

⚡ Optimized performance with caching / Оптимизированная производительность с кешированием

🛠 Technologies / Технологии
Категория / Category	Технология / Technology
Framework	Next.js 14 (App Router)
Language	TypeScript (strict mode)
Styling	Tailwind CSS
State Management	TanStack Query v5
API	CoinGecko (free tier)
Testing	Jest + React Testing Library
Linting	ESLint + Prettier
📦 Installation / Установка
bash
# Clone repository / Клонировать репозиторий
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard

# Install dependencies / Установить зависимости
npm install

# Start dev server / Запустить dev-сервер
npm run dev
Open http://localhost:3000 / Открой http://localhost:3000

📜 Scripts / Скрипты
Command / Команда	Description / Описание
npm run dev	Development server / Dev-сервер
npm run build	Production build / Production сборка
npm run start	Production server / Production сервер
npm run lint	ESLint check / Проверка ESLint
npm run type-check	TypeScript check / Проверка TypeScript
npm test	Run tests / Запуск тестов
npm run test:coverage	Tests with coverage / Тесты с покрытием
📁 Project Structure / Структура проекта
text
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout / Корневой layout
│   ├── page.tsx            # Home page / Главная страница
│   └── globals.css         # Global styles / Глобальные стили
│
├── components/
│   ├── ui/                 # UI components / UI-компоненты
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Table/
│   │   ├── Skeleton/
│   │   ├── Badge/
│   │   └── Spinner/
│   ├── features/           # Business components / Бизнес-компоненты
│   └── layout/             # Layout components / Layout-компоненты
│
├── hooks/                  # React hooks
│   ├── use-coins.ts        # TanStack Query hooks / TanStack Query хуки
│   └── use-portfolio.ts    # Portfolio management / Управление портфелем
│
├── lib/
│   ├── api/                # API client
│   │   ├── client.ts       # HTTP client / HTTP клиент
│   │   ├── coins.ts        # API functions / API функции
│   │   └── config.ts       # Configuration / Конфигурация
│   ├── providers/          # React providers / React провайдеры
│   └── utils/              # Utilities / Утилиты
│
├── types/                  # TypeScript types / TypeScript типы
│   ├── coin.ts
│   └── portfolio.ts
│
└── __tests__/              # Tests / Тесты
🧩 UI Components / UI-компоненты
Component / Компонент	Description / Описание
Button	6 variants, 3 sizes, loading state / 6 вариантов, 3 размера, состояние загрузки
Input	Label, errors, helper text, icons / Label, ошибки, helper text, иконки
Card	Compound: Header, Content, Footer / Составной: Header, Content, Footer
Modal	Portal, animations, keyboard / Portal, анимации, клавиатура
Table	Typed columns, sorting / Типизированные колонки, сортировка
Skeleton	Loading states / Загрузочные состояния
Badge	Labels & statuses / Метки и статусы
Spinner	Loading indicators / Индикаторы загрузки
🔌 API Hooks / API Хуки
typescript
// Coin list / Список монет
const { data, isLoading, error } = useCoins({ perPage: 20 });

// Coin details / Детали монеты
const { data } = useCoinDetails('bitcoin');

// Price chart / График цены
const { data } = useMarketChart('bitcoin', 'usd', '7D');

// Global data / Глобальные данные
const { data } = useGlobalData();

// Trending coins / Трендовые монеты
const { data } = useTrendingCoins();
📊 Testing / Тестирование
bash
# Run tests / Запуск тестов
npm test

# With coverage / С покрытием
npm run test:coverage
Test Coverage / Покрытие тестами:

Button: 100%

Input: 100%

Badge: 100%

Utilities: 100%

🗺 Roadmap / План развития
Project setup / Настройка проекта

UI components / UI-компоненты

API integration / API интеграция

Dashboard page / Dashboard страница

Portfolio management / Управление портфелем

Transaction history / История транзакций

Price charts / Графики цен

Optimization / Оптимизация

📄 License / Лицензия
MIT

Made with ❤️ as a portfolio project / Сделано с ❤️ как портфолио-проект