import { useQuery } from '@tanstack/react-query';
import {
  getCoins,
  getCoinDetails,
  getMarketChart,
  getGlobalData,
  getTrendingCoins,
  getCoinsList,
  CACHE_CONFIG,
  TIME_RANGES,
  type GetCoinsParams,
  type CoinDetails,
  type GlobalMarketData,
  type TrendingCoins,
} from '@/lib/api';
import type { Coin, CoinSimple, MarketChart, Currency, TimeRange } from '@/types';

/**
 * Query Keys — ключи для кеширования
 * Структура: ['домен', 'сущность', параметры]
 */
export const queryKeys = {
  coins: {
    all: ['coins'] as const,
    lists: () => [...queryKeys.coins.all, 'list'] as const,
    list: (params: GetCoinsParams) =>
      [...queryKeys.coins.lists(), params] as const,
    details: () => [...queryKeys.coins.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.coins.details(), id] as const,
    charts: () => [...queryKeys.coins.all, 'chart'] as const,
    chart: (id: string, currency: Currency, days: number | 'max') =>
      [...queryKeys.coins.charts(), id, currency, days] as const,
    simple: () => [...queryKeys.coins.all, 'simple'] as const,
  },
  global: ['global'] as const,
  trending: ['trending'] as const,
} as const;

/**
 * useCoins — получение списка монет
 *
 * @example
 * const { data, isLoading, error } = useCoins({ perPage: 20 });
 */
export function useCoins(params: GetCoinsParams = {}) {
  return useQuery<Coin[], Error>({
    queryKey: queryKeys.coins.list(params),
    queryFn: () => getCoins(params),
    ...CACHE_CONFIG.PRICES,
  });
}

/**
 * useCoinDetails — детальная информация о монете
 *
 * @example
 * const { data } = useCoinDetails('bitcoin');
 */
export function useCoinDetails(coinId: string, enabled = true) {
  return useQuery<CoinDetails, Error>({
    queryKey: queryKeys.coins.detail(coinId),
    queryFn: () => getCoinDetails(coinId),
    enabled: enabled && Boolean(coinId),
    ...CACHE_CONFIG.COIN_DETAILS,
  });
}

/**
 * useMarketChart — данные для графика цены
 *
 * @example
 * const { data } = useMarketChart('bitcoin', 'usd', '7D');
 */
export function useMarketChart(
  coinId: string,
  currency: Currency = 'usd',
  timeRange: TimeRange = '7D',
  enabled = true
) {
  const days = TIME_RANGES[timeRange].days;

  return useQuery<MarketChart, Error>({
    queryKey: queryKeys.coins.chart(coinId, currency, days),
    queryFn: () => getMarketChart({ coinId, currency, days }),
    enabled: enabled && Boolean(coinId),
    ...CACHE_CONFIG.CHART_DATA,
  });
}

/**
 * useGlobalData — глобальные данные рынка
 */
export function useGlobalData() {
  return useQuery<GlobalMarketData, Error>({
    queryKey: queryKeys.global,
    queryFn: getGlobalData,
    ...CACHE_CONFIG.GLOBAL,
  });
}

/**
 * useTrendingCoins — трендовые монеты
 */
export function useTrendingCoins() {
  return useQuery<TrendingCoins, Error>({
    queryKey: queryKeys.trending,
    queryFn: getTrendingCoins,
    ...CACHE_CONFIG.PRICES,
  });
}

/**
 * useCoinsList — полный список монет (для поиска)
 */
export function useCoinsList(enabled = true) {
  return useQuery<CoinSimple[], Error>({
    queryKey: queryKeys.coins.simple(),
    queryFn: getCoinsList,
    enabled,
    ...CACHE_CONFIG.COINS_LIST,
  });
}
