# Crypto Dashboard

A modern cryptocurrency portfolio tracker built with Next.js, TypeScript, and TanStack Query.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-red?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- 📊 Real-time cryptocurrency prices
- 💼 Portfolio tracking and management
- 📈 Interactive price charts
- 🌙 Dark/Light theme support
- 📱 Fully responsive design
- ⚡ Optimized performance with caching

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query v5
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run type-check` | Run TypeScript compiler check |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # Reusable UI components
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/
│   ├── api/              # API client and queries
│   ├── providers/        # React context providers
│   └── utils/            # Utility functions
├── types/                # TypeScript type definitions
└── __tests__/            # Test files
```

## Development Roadmap

- [x] Project setup and configuration
- [ ] UI component library
- [ ] API integration (CoinGecko)
- [ ] Dashboard page
- [ ] Portfolio management
- [ ] Transaction history
- [ ] Performance optimization
- [ ] Unit and integration tests

## License

MIT

---

Built with ❤️ as a portfolio project
