/**
 * Конфигурация API
 *
 * CoinGecko предоставляет бесплатный API для получения данных о криптовалютах.
 * Лимиты бесплатного плана: 10-30 запросов в минуту.
 *
 * Документация: https://www.coingecko.com/en/api/documentation
 */

/**
 * Базовый URL API CoinGecko
 * Используем бесплатную версию без API ключа
 */
export const API_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Эндпоинты API
 * Централизованное хранение путей для удобства поддержки
 */
export const API_ENDPOINTS = {
  /** Список монет с рыночными данными */
  COINS_MARKETS: '/coins/markets',

  /** Детальная информация о монете */
  COIN_DETAILS: (id: string) => `/coins/${id}`,

  /** История цен для графика */
  COIN_MARKET_CHART: (id: string) => `/coins/${id}/market_chart`,

  /** Простые цены (только цена, без деталей) */
  SIMPLE_PRICE: '/simple/price',

  /** Список всех поддерживаемых монет */
  COINS_LIST: '/coins/list',

  /** Глобальные данные рынка */
  GLOBAL: '/global',

  /** Список трендовых монет */
  TRENDING: '/search/trending',
} as const;

/**
 * Настройки кеширования для TanStack Query
 *
 * staleTime — время, после которого данные считаются "устаревшими"
 * и будут перезапрошены при следующем обращении.
 *
 * gcTime (раньше cacheTime) — время хранения данных в кеше
 * после того как компонент размонтирован.
 */
export const CACHE_CONFIG = {
  /** Цены обновляются часто — кешируем на 30 секунд */
  PRICES: {
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  },

  /** Список монет меняется редко — кешируем на 5 минут */
  COINS_LIST: {
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  },

  /** Детали монеты — кешируем на 1 минуту */
  COIN_DETAILS: {
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
  },

  /** Данные графика — кешируем на 2 минуты */
  CHART_DATA: {
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  },

  /** Глобальные данные — кешируем на 1 минуту */
  GLOBAL: {
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  },
} as const;

/**
 * Поддерживаемые валюты для отображения цен
 */
export const SUPPORTED_CURRENCIES = [
  { id: 'usd', symbol: '$', name: 'US Dollar' },
  { id: 'eur', symbol: '€', name: 'Euro' },
  { id: 'gbp', symbol: '£', name: 'British Pound' },
  { id: 'jpy', symbol: '¥', name: 'Japanese Yen' },
  { id: 'rub', symbol: '₽', name: 'Russian Ruble' },
] as const;

/**
 * Временные диапазоны для графиков
 * days — количество дней для API запроса
 */
export const TIME_RANGES = {
  '1D': { days: 1, label: '24H' },
  '7D': { days: 7, label: '7D' },
  '1M': { days: 30, label: '1M' },
  '3M': { days: 90, label: '3M' },
  '1Y': { days: 365, label: '1Y' },
  ALL: { days: 'max', label: 'All' },
} as const;

/**
 * Дефолтные значения
 */
export const DEFAULTS = {
  CURRENCY: 'usd',
  PER_PAGE: 20,
  TIME_RANGE: '7D',
} as const;
