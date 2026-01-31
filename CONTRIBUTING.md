# Contributing / Вклад в проект

---

## 🇬🇧 English

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/crypto-dashboard.git
   cd crypto-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development

```bash
# Start dev server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type check
npm run type-check

# Lint
npm run lint
```

### Code Style

- Use TypeScript strict mode
- Follow ESLint and Prettier rules
- Write JSDoc comments for public APIs
- Use meaningful variable names

### Commit Messages

Follow conventional commits:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance
```

### Pull Requests

1. Update tests if needed
2. Run `npm test` and ensure all tests pass
3. Run `npm run lint` and fix any issues
4. Create PR with clear description

---

## 🇷🇺 Русский

### Начало работы

1. Сделайте форк репозитория
2. Клонируйте форк:
   ```bash
   git clone https://github.com/yourusername/crypto-dashboard.git
   cd crypto-dashboard
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Создайте ветку:
   ```bash
   git checkout -b feature/название-фичи
   ```

### Разработка

```bash
# Запуск dev-сервера
npm run dev

# Запуск тестов
npm test

# Тесты с покрытием
npm run test:coverage

# Проверка типов
npm run type-check

# Линтинг
npm run lint
```

### Стиль кода

- Используйте TypeScript strict mode
- Следуйте правилам ESLint и Prettier
- Пишите JSDoc комментарии
- Используйте понятные имена переменных

### Сообщения коммитов

Используйте conventional commits:

```
feat: новая функциональность
fix: исправление бага
docs: обновление документации
style: форматирование
refactor: рефакторинг кода
test: добавление тестов
chore: обслуживание
```

### Pull Requests

1. Обновите тесты при необходимости
2. Запустите `npm test` — все тесты должны пройти
3. Запустите `npm run lint` — исправьте ошибки
4. Создайте PR с понятным описанием

---

## Project Structure / Структура проекта

```
src/
├── app/                    # Next.js pages / Страницы
├── components/
│   ├── ui/                # UI components / UI-компоненты
│   ├── features/          # Business logic / Бизнес-логика
│   └── layout/            # Layout / Лейаут
├── hooks/                  # Custom hooks / Кастомные хуки
├── lib/
│   ├── api/              # API client / API клиент
│   ├── i18n/             # Translations / Переводы
│   ├── providers/        # React providers / Провайдеры
│   └── utils/            # Utilities / Утилиты
├── types/                  # TypeScript types / Типы
└── __tests__/             # Tests / Тесты
```

---

## Testing Guidelines / Рекомендации по тестам

### What to test / Что тестировать

- Component rendering / Рендеринг компонентов
- User interactions / Взаимодействие пользователя
- Edge cases / Граничные случаи
- Error states / Состояния ошибок

### Test structure / Структура тестов

```tsx
describe('ComponentName', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      // ...
    });
  });

  describe('behavior', () => {
    it('handles click', () => {
      // ...
    });
  });
});
```

---

## Questions? / Вопросы?

Open an issue or contact maintainers.

Откройте issue или свяжитесь с мейнтейнерами.
