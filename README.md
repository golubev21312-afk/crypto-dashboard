# 🚀 CryptoDash — Cryptocurrency Portfolio Tracker

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![React Query](https://img.shields.io/badge/TanStack_Query-5.0-FF4154?style=for-the-badge)

**Современный трекер криптовалютного портфеля с реальными данными**

[English](#-features) • [Русский](#-возможности)

---

## 📸 Screenshots

| Dashboard | Coin Details | Portfolio |
|-----------|--------------|-----------|
| Market overview | Price chart | Transaction grouping |
| Top coins | Statistics | P/L tracking |
| Trending | All-time data | Multi-currency |

---

## ✨ Features

- 📊 **Real-time prices** — Live data from CoinGecko API
- 💼 **Portfolio management** — Track investments with transaction history
- 📈 **Interactive charts** — SVG price charts with multiple time ranges
- 🌍 **Multi-language** — English, Русский, ไทย, 中文
- 🌙 **Dark/Light theme** — System preference detection
- 📱 **Responsive design** — Mobile-first approach
- ⚡ **Optimized performance** — React.memo, useMemo, useCallback
- 🧪 **Tested** — 149+ tests with Jest & RTL

---

## ✨ Возможности

- 📊 **Реальные курсы** — Данные CoinGecko API в реальном времени
- 💼 **Управление портфелем** — Отслеживание инвестиций с историей транзакций
- 📈 **Интерактивные графики** — SVG графики с выбором периода
- 🌍 **Мультиязычность** — English, Русский, ไทย, 中文
- 🌙 **Тёмная/светлая тема** — Автоопределение системных настроек
- 📱 **Адаптивный дизайн** — Mobile-first подход
- ⚡ **Оптимизация** — React.memo, useMemo, useCallback
- 🧪 **Тестирование** — 149+ тестов Jest & RTL

---

## 🛠 Tech Stack / Технологии

### Core / Основа

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2 | React framework with App Router |
| **TypeScript** | 5.0 | Static typing |
| **React** | 18.0 | UI library |

### Styling / Стили

| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework |
| **CSS Variables** | Theme colors |
| **clsx + tailwind-merge** | Conditional classes |

### State Management / Управление состоянием

| Technology | Purpose |
|------------|---------|
| **TanStack Query v5** | Server state, caching, refetching |
| **React Context** | Theme, i18n providers |
| **localStorage** | Portfolio persistence |

### API

| Service | Purpose |
|---------|---------|
| **CoinGecko API** | Free cryptocurrency data |

### Testing / Тестирование

| Technology | Purpose |
|------------|---------|
| **Jest** | Test runner |
| **React Testing Library** | Component testing |
| **jest-dom** | DOM matchers |

---

## 📁 Project Structure / Структура проекта

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout + providers
│   ├── page.tsx                 # Dashboard page
│   ├── coins/
│   │   ├── page.tsx             # Coins list
│   │   └── [id]/
│   │       └── page.tsx         # Coin details + chart
│   └── portfolio/
│       └── page.tsx             # Portfolio management
│
├── components/
│   ├── ui/                      # Reusable UI primitives
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Badge/
│   │   ├── Skeleton/
│   │   ├── Spinner/
│   │   └── Table/
│   ├── features/                # Business components
│   │   ├── CoinList.tsx
│   │   ├── CoinRow.tsx
│   │   ├── StatCard.tsx
│   │   ├── TrendingCoins.tsx
│   │   └── PriceChart.tsx
│   └── layout/
│       └── Header.tsx
│
├── hooks/                       # Custom React hooks
│   ├── use-coins.ts            # API data hooks
│   ├── use-portfolio.ts        # Portfolio management
│   ├── use-debounce.ts         # Delayed updates
│   ├── use-local-storage.ts    # Typed localStorage
│   └── use-media-query.ts      # Responsive helpers
│
├── lib/
│   ├── api/                    # API layer
│   │   ├── client.ts           # HTTP client with retry
│   │   ├── coins.ts            # CoinGecko endpoints
│   │   └── config.ts           # API configuration
│   ├── i18n/                   # Internationalization
│   │   ├── translations.ts     # All translations
│   │   └── i18n-provider.tsx   # Context + hook
│   ├── providers/              # React providers
│   │   ├── query-provider.tsx  # TanStack Query
│   │   └── theme-provider.tsx  # Dark/light theme
│   └── utils/                  # Utilities
│       ├── cn.ts               # Class merging
│       └── format.ts           # Number formatting
│
├── types/                      # TypeScript types
│   └── index.ts
│
└── __tests__/                  # Test files
```

---

## 🔄 Data Flow / Поток данных

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   User      │────▶│  Component   │────▶│  useCoins   │
│   Action    │     │  (UI Layer)  │     │   (Hook)    │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
                    ┌──────────────┐            │
                    │   UI Update  │◀───────────┤
                    └──────────────┘            │
                           ▲                    ▼
                    ┌──────┴──────┐     ┌─────────────┐
                    │    Cache    │◀────│ TanStack    │
                    │  (5 min)    │     │   Query     │
                    └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  fetchApi   │
                                        │  (Client)   │
                                        └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  CoinGecko  │
                                        │    API      │
                                        └─────────────┘
```

---

## 🎨 Component Architecture / Архитектура компонентов

### UI Components (Primitive)

```tsx
// Базовые компоненты без бизнес-логики
// Base components without business logic

<Button variant="primary" size="md" />
<Input label="Email" error="Required" />
<Card hoverable>
  <CardHeader title="..." />
  <CardContent>...</CardContent>
</Card>
<Modal isOpen onClose>...</Modal>
<Badge variant="success">+5.5%</Badge>
<Skeleton width={100} height={20} />
<Spinner size="lg" />
```

### Feature Components (Smart)

```tsx
// Компоненты с бизнес-логикой и данными
// Components with business logic and data

<CoinList />          // Fetches & displays coins
<CoinRow coin={...} /> // Single coin display
<StatCard />          // Statistics card
<TrendingCoins />     // Trending widget
<PriceChart />        // Interactive chart
```

---

## 🔧 Key Patterns / Ключевые паттерны

### 1. Custom Hooks for Data

```tsx
// Вся логика данных в хуках
// All data logic in hooks

function CoinList() {
  const { data, isLoading, error } = useCoins({ perPage: 20 });
  
  if (isLoading) return <Skeleton />;
  if (error) return <Error />;
  
  return data.map(coin => <CoinRow key={coin.id} coin={coin} />);
}
```

### 2. Memoization for Performance

```tsx
// React.memo предотвращает лишние ре-рендеры
// React.memo prevents unnecessary re-renders

const CoinRow = memo(function CoinRow({ coin }) {
  return <div>...</div>;
});

// useMemo для тяжёлых вычислений
// useMemo for expensive computations

const filteredCoins = useMemo(() => {
  return coins.filter(c => c.name.includes(search));
}, [coins, search]);

// useCallback для стабильных функций
// useCallback for stable functions

const handleClick = useCallback(() => {
  setOpen(true);
}, []);
```

### 3. Compound Components

```tsx
// Составные компоненты для гибкости
// Compound components for flexibility

<Card>
  <CardHeader title="Bitcoin" action={<Button>Edit</Button>} />
  <CardContent>Price: $45,000</CardContent>
  <CardFooter>
    <Button>Buy</Button>
  </CardFooter>
</Card>
```

### 4. Provider Pattern

```tsx
// Провайдеры для глобального состояния
// Providers for global state

<ThemeProvider>
  <I18nProvider>
    <QueryProvider>
      <App />
    </QueryProvider>
  </I18nProvider>
</ThemeProvider>
```

---

## 🌍 Internationalization / Интернационализация

```tsx
// Использование / Usage
const { t, locale, setLocale } = useI18n();

return (
  <div>
    <h1>{t('dashboard.title')}</h1>
    <select onChange={e => setLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="th">ไทย</option>
      <option value="zh">中文</option>
    </select>
  </div>
);
```

**Supported languages:** English, Русский, ไทย, 中文

---

## 📊 API Integration / API интеграция

### CoinGecko Endpoints

| Endpoint | Hook | Purpose |
|----------|------|---------|
| `/coins/markets` | `useCoins()` | Coin list with prices |
| `/coins/{id}` | `useCoinDetails()` | Single coin data |
| `/coins/{id}/market_chart` | `useMarketChart()` | Price history |
| `/global` | `useGlobalData()` | Market overview |
| `/search/trending` | `useTrendingCoins()` | Trending coins |

### Caching Strategy

| Data Type | Stale Time | Cache Time |
|-----------|------------|------------|
| Prices | 30 seconds | 5 minutes |
| Coin Details | 1 minute | 10 minutes |
| Chart Data | 2 minutes | 15 minutes |
| Global Data | 1 minute | 5 minutes |

---

## 🧪 Testing / Тестирование

```bash
# Run tests / Запуск тестов
npm test

# With coverage / С покрытием
npm run test:coverage

# Watch mode / Режим наблюдения
npm run test:watch
```

### Coverage

| Category | Coverage |
|----------|----------|
| UI Components | ~100% |
| Utilities | ~97% |
| Hooks | ~80% |
| **Total Tests** | **149** |

---

## 🚀 Getting Started / Начало работы

```bash
# Clone / Клонирование
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard

# Install / Установка
npm install

# Development / Разработка
npm run dev

# Build / Сборка
npm run build

# Production / Продакшн
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📜 Scripts / Скрипты

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npm run test:coverage` | Tests with coverage |
| `npm run lint` | ESLint check |
| `npm run type-check` | TypeScript check |

---

## 📝 Environment Variables / Переменные окружения

```env
# .env.local (optional)
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
```

---

## 🎯 What This Project Demonstrates

### For Employers / Для работодателей

1. **Modern React** — Hooks, Context, Suspense patterns
2. **TypeScript** — Strict mode, generics, type guards
3. **Next.js** — App Router, SSR concepts
4. **State Management** — TanStack Query, local state
5. **Testing** — Unit tests, integration tests
6. **Performance** — Memoization, lazy loading
7. **i18n** — Multi-language support
8. **API Integration** — REST, error handling, retry logic
9. **Responsive Design** — Mobile-first, Tailwind CSS
10. **Clean Code** — SOLID, DRY, documentation

## 📄 License

**Made with ❤️ for learning and portfolio**

⭐ Star this repo if you find it helpful!
