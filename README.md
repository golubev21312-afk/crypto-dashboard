# Crypto Dashboard

Современный трекер криптовалютного портфеля на Next.js с оптимизированной производительностью.

A modern cryptocurrency portfolio tracker built with Next.js and optimized for performance.

---

## 🚀 Возможности / Features

- 📊 Реальные курсы криптовалют / Real-time cryptocurrency prices
- 💼 Управление портфелем / Portfolio management
- 🌍 4 языка: EN, RU, TH, ZH / 4 languages
- 🌙 Тёмная/светлая тема / Dark/light theme
- 📱 Адаптивный дизайн / Responsive design
- ⚡ Оптимизированная производительность / Optimized performance

---

## 🛠 Технологии / Tech Stack

| Категория / Category | Технология / Technology |
|---------------------|------------------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| State | TanStack Query v5 |
| API | CoinGecko |
| Testing | Jest + RTL |

---

## ⚡ Оптимизации / Optimizations

### React.memo

Компоненты `CoinRow` и `StatCard` обёрнуты в `React.memo` для предотвращения лишних ре-рендеров.

Components `CoinRow` and `StatCard` wrapped in `React.memo` to prevent unnecessary re-renders.

```tsx
export const CoinRow = memo(function CoinRow({ coin, index }) {
  // ...
});
```

### useMemo & useCallback

Мемоизация вычислений и стабильные ссылки на функции.

Memoized computations and stable function references.

```tsx
const filteredCoins = useMemo(() => {
  return coins?.filter(coin => 
    coin.name.toLowerCase().includes(search)
  );
}, [coins, search]);

const handleSearch = useCallback((e) => {
  setSearch(e.target.value);
}, []);
```

### Custom Hooks

| Хук / Hook | Описание / Description |
|-----------|----------------------|
| `useDebounce` | Отложенное обновление / Delayed updates |
| `useLocalStorage` | Типизированный localStorage / Typed localStorage |
| `useMediaQuery` | Адаптивность / Responsive helpers |

### Error Boundary

Перехват ошибок без падения приложения.

Error catching without app crashes.

```tsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### Lazy Loading

Ленивая загрузка изображений с Intersection Observer.

Lazy image loading with Intersection Observer.

---

## 📦 Установка / Installation

```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
npm install
npm run dev
```

---

## 📜 Скрипты / Scripts

| Команда / Command | Описание / Description |
|------------------|----------------------|
| `npm run dev` | Dev-сервер / Dev server |
| `npm run build` | Production сборка / Production build |
| `npm test` | Запуск тестов / Run tests |
| `npm run lint` | Проверка кода / Code check |

---

## 📁 Структура / Structure

```
src/
├── app/                # Next.js pages
├── components/
│   ├── ui/            # UI components
│   ├── features/      # Business components
│   └── layout/        # Layout components
├── hooks/             # Custom hooks
├── lib/
│   ├── api/          # API client
│   ├── i18n/         # Translations
│   └── providers/    # React providers
└── types/            # TypeScript types
```

---

## ✅ Roadmap

- [x] Настройка проекта / Project setup
- [x] UI-компоненты / UI components
- [x] API интеграция / API integration
- [x] Основные страницы / Main pages
- [x] Мультиязычность / Multi-language
- [x] Оптимизация / Optimization
- [ ] E2E тесты / E2E tests
- [ ] PWA поддержка / PWA support

---

## 📄 Лицензия / License

MIT

---

Сделано с ❤️ / Made with ❤️
