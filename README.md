C Crypto Dashboard

Современный трекер криптовалютного портфеля на Next.js, TypeScript и TanStack Query.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-red?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Возможности

- 📊 Реальные курсы криптовалют (CoinGecko API)
- 💼 Управление портфелем с сохранением в localStorage
- 📈 Интерактивные графики цен
- 🌙 Тёмная и светлая тема
- 📱 Полностью адаптивный дизайн
- ⚡ Оптимизированная производительность с кешированием

## 🛠 Технологии

| Категория | Технология |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| State | TanStack Query v5 |
| API | CoinGecko (бесплатный) |
| Testing | Jest + React Testing Library |
| Linting | ESLint + Prettier |

## 📦 Установка

```bash
# Клонировать репозиторий
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000)

## 📜 Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production сборка |
| `npm run start` | Production сервер |
| `npm run lint` | Проверка ESLint |
| `npm run type-check` | Проверка TypeScript |
| `npm test` | Запуск тестов |
| `npm run test:coverage` | Тесты с покрытием |

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Корневой layout
│   ├── page.tsx            # Главная страница
│   └── globals.css         # Глобальные стили
│
├── components/
│   ├── ui/                 # UI-компоненты
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Table/
│   │   ├── Skeleton/
│   │   ├── Badge/
│   │   └── Spinner/
│   ├── features/           # Бизнес-компоненты
│   └── layout/             # Layout-компоненты
│
├── hooks/                  # React хуки
│   ├── use-coins.ts        # TanStack Query хуки
│   └── use-portfolio.ts    # Управление портфелем
│
├── lib/
│   ├── api/                # API клиент
│   │   ├── client.ts       # HTTP клиент
│   │   ├── coins.ts        # API функции
│   │   └── config.ts       # Конфигурация
│   ├── providers/          # React провайдеры
│   └── utils/              # Утилиты
│
├── types/                  # TypeScript типы
│   ├── coin.ts
│   └── portfolio.ts
│
└── __tests__/              # Тесты
```

## 🧩 UI-компоненты

| Компонент | Описание |
|-----------|----------|
| Button | 6 вариантов, 3 размера, состояние загрузки |
| Input | Label, ошибки, helper text, иконки |
| Card | Составной: Header, Content, Footer |
| Modal | Portal, анимации, клавиатура |
| Table | Типизированные колонки, сортировка |
| Skeleton | Загрузочные состояния |
| Badge | Метки и статусы |
| Spinner | Индикаторы загрузки |

## 🔌 API Хуки

```typescript
// Список монет
const { data, isLoading, error } = useCoins({ perPage: 20 });

// Детали монеты
const { data } = useCoinDetails('bitcoin');

// График цены
const { data } = useMarketChart('bitcoin', 'usd', '7D');

// Глобальные данные
const { data } = useGlobalData();

// Трендовые монеты
const { data } = useTrendingCoins();
```

## 📊 Тестирование

```bash
# Запуск тестов
npm test

# С покрытием
npm run test:coverage
```

**Покрытие тестами:**
- Button: 100%
- Input: 100%
- Badge: 100%
- Utilities: 100%

## 🗺 Roadmap

- [x] Настройка проекта
- [x] UI-компоненты
- [x] API интеграция
- [ ] Dashboard страница
- [ ] Управление портфелем
- [ ] История транзакций
- [ ] Графики цен
- [ ] Оптимизация

## 📄 Лицензия

MIT

---

Сделано с ❤️ как портфолио-проект
