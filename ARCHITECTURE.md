# Architecture / Архитектура

---

## 🇬🇧 English

### Overview

Crypto Dashboard is built with modern React patterns and follows a feature-based architecture.

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 14 | SSR, routing, optimization |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| State | TanStack Query | Server state management |
| API | CoinGecko | Cryptocurrency data |

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Dashboard page
│   ├── coins/             # Coins pages
│   └── portfolio/         # Portfolio page
│
├── components/
│   ├── ui/                # Reusable UI primitives
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   └── ...
│   ├── features/          # Feature-specific components
│   │   ├── CoinList/
│   │   ├── StatCard/
│   │   └── ...
│   └── layout/            # Layout components
│       └── Header/
│
├── hooks/                  # Custom React hooks
│   ├── use-coins.ts       # API data hooks
│   ├── use-portfolio.ts   # Portfolio management
│   ├── use-debounce.ts    # Utility hooks
│   └── ...
│
├── lib/
│   ├── api/               # API layer
│   │   ├── client.ts      # HTTP client
│   │   ├── coins.ts       # API functions
│   │   └── config.ts      # Configuration
│   ├── i18n/              # Internationalization
│   ├── providers/         # React context providers
│   └── utils/             # Utility functions
│
├── types/                  # TypeScript types
└── __tests__/             # Test files
```

### Data Flow

```
User Action
    ↓
Component (useCoins hook)
    ↓
TanStack Query (caching, deduplication)
    ↓
API Client (fetchApi)
    ↓
CoinGecko API
    ↓
Response → Cache → UI Update
```

### Key Patterns

#### 1. Component Composition

```tsx
<Card>
  <CardHeader title="..." />
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

#### 2. Custom Hooks for Logic

```tsx
function CoinList() {
  const { data, isLoading } = useCoins();
  // UI only, no business logic
}
```

#### 3. Memoization for Performance

```tsx
const CoinRow = memo(function CoinRow({ coin }) {
  // Prevents unnecessary re-renders
});
```

#### 4. Type Safety

```tsx
interface Coin {
  id: string;
  name: string;
  current_price: number;
}

function useCoinDetails(id: string): UseQueryResult<Coin> {
  // Fully typed
}
```

---

## 🇷🇺 Русский

### Обзор

Crypto Dashboard построен на современных паттернах React с feature-based архитектурой.

### Стек технологий

| Слой | Технология | Назначение |
|------|------------|------------|
| Фреймворк | Next.js 14 | SSR, роутинг, оптимизация |
| Язык | TypeScript | Типобезопасность |
| Стили | Tailwind CSS | Utility-first CSS |
| Состояние | TanStack Query | Серверное состояние |
| API | CoinGecko | Данные криптовалют |

### Структура директорий

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Корневой layout с провайдерами
│   ├── page.tsx           # Страница Dashboard
│   ├── coins/             # Страницы монет
│   └── portfolio/         # Страница портфеля
│
├── components/
│   ├── ui/                # Переиспользуемые UI-примитивы
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   └── ...
│   ├── features/          # Компоненты фич
│   │   ├── CoinList/
│   │   ├── StatCard/
│   │   └── ...
│   └── layout/            # Layout-компоненты
│       └── Header/
│
├── hooks/                  # Кастомные React хуки
│   ├── use-coins.ts       # Хуки для API данных
│   ├── use-portfolio.ts   # Управление портфелем
│   ├── use-debounce.ts    # Утилитарные хуки
│   └── ...
│
├── lib/
│   ├── api/               # API слой
│   │   ├── client.ts      # HTTP клиент
│   │   ├── coins.ts       # API функции
│   │   └── config.ts      # Конфигурация
│   ├── i18n/              # Интернационализация
│   ├── providers/         # React context провайдеры
│   └── utils/             # Утилиты
│
├── types/                  # TypeScript типы
└── __tests__/             # Тесты
```

### Поток данных

```
Действие пользователя
    ↓
Компонент (хук useCoins)
    ↓
TanStack Query (кеширование, дедупликация)
    ↓
API Client (fetchApi)
    ↓
CoinGecko API
    ↓
Ответ → Кеш → Обновление UI
```

### Ключевые паттерны

#### 1. Композиция компонентов

```tsx
<Card>
  <CardHeader title="..." />
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

#### 2. Кастомные хуки для логики

```tsx
function CoinList() {
  const { data, isLoading } = useCoins();
  // Только UI, без бизнес-логики
}
```

#### 3. Мемоизация для производительности

```tsx
const CoinRow = memo(function CoinRow({ coin }) {
  // Предотвращает лишние ре-рендеры
});
```

#### 4. Типобезопасность

```tsx
interface Coin {
  id: string;
  name: string;
  current_price: number;
}

function useCoinDetails(id: string): UseQueryResult<Coin> {
  // Полностью типизировано
}
```

---

## Performance Considerations / Оптимизация производительности

### Implemented / Реализовано

- ✅ React.memo for list items / для элементов списка
- ✅ useMemo for expensive computations / для тяжёлых вычислений
- ✅ useCallback for stable handlers / для стабильных обработчиков
- ✅ TanStack Query caching / кеширование запросов
- ✅ Next.js Image optimization / оптимизация изображений

### Future Improvements / Будущие улучшения

- [ ] Virtual scrolling for long lists / виртуальный скролл
- [ ] Service Worker for offline / для офлайн-режима
- [ ] Bundle analysis / анализ бандла
