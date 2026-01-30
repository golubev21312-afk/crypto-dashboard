/**
 * API Module
 * Централизованный модуль для работы с CoinGecko API
 */

// Конфигурация
export {
  API_BASE_URL,
  API_ENDPOINTS,
  CACHE_CONFIG,
  SUPPORTED_CURRENCIES,
  TIME_RANGES,
  DEFAULTS,
} from './config';

// HTTP клиент
export { fetchApi, ApiError, getErrorType, getErrorMessage } from './client';
export type { ApiErrorType } from './client';

// API функции
export {
  getCoins,
  getCoinDetails,
  getMarketChart,
  getSimplePrices,
  getCoinsList,
  getGlobalData,
  getTrendingCoins,
} from './coins';

export type {
  CoinDetails,
  GlobalMarketData,
  TrendingCoins,
  GetCoinsParams,
  GetMarketChartParams,
} from './coins';
