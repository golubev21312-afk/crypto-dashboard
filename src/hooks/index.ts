/**
 * Custom Hooks
 * 
 * Переиспользуемые хуки приложения
 * Reusable application hooks
 */

// API хуки / API hooks
export {
  useCoins,
  useCoinDetails,
  useMarketChart,
  useGlobalData,
  useTrendingCoins,
  useCoinsList,
  queryKeys,
} from './use-coins';

// Портфель / Portfolio
export { usePortfolio } from './use-portfolio';

// Утилиты / Utilities
export { useDebounce } from './use-debounce';
export { useLocalStorage } from './use-local-storage';
export { useMediaQuery, useBreakpoint, breakpoints } from './use-media-query';
