import { fetchApi } from './client';
import { API_ENDPOINTS, DEFAULTS } from './config';
import type { Coin, CoinSimple, MarketChart, Currency } from '@/types';

/**
 * Детальная информация о монете
 */
export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  market_data: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    high_24h: Record<string, number>;
    low_24h: Record<string, number>;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap_rank: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: Record<string, number>;
    ath_date: Record<string, string>;
    atl: Record<string, number>;
    atl_date: Record<string, string>;
  };
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    repos_url: {
      github: string[];
    };
  };
  last_updated: string;
}

/**
 * Глобальные данные рынка
 */
export interface GlobalMarketData {
  data: {
    active_cryptocurrencies: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
  };
}

/**
 * Трендовые монеты
 */
export interface TrendingCoins {
  coins: Array<{
    item: {
      id: string;
      coin_id: number;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      small: string;
      large: string;
      slug: string;
      price_btc: number;
      score: number;
    };
  }>;
}

/**
 * Параметры для получения списка монет
 */
export interface GetCoinsParams {
  currency?: Currency;
  perPage?: number;
  page?: number;
  order?: string;
  ids?: string;
  sparkline?: boolean;
  priceChangePercentage?: string;
}

/**
 * Получить список монет с рыночными данными
 *
 * @example
 * const coins = await getCoins({ perPage: 20 });
 */
export async function getCoins(params: GetCoinsParams = {}): Promise<Coin[]> {
  const {
    currency = DEFAULTS.CURRENCY,
    perPage = DEFAULTS.PER_PAGE,
    page = 1,
    order = 'market_cap_desc',
    ids,
    sparkline = false,
    priceChangePercentage = '24h',
  } = params;

  return fetchApi<Coin[]>(API_ENDPOINTS.COINS_MARKETS, {
    params: {
      vs_currency: currency,
      order,
      per_page: perPage,
      page,
      sparkline,
      price_change_percentage: priceChangePercentage,
      ...(ids && { ids }),
    },
  });
}

/**
 * Получить детальную информацию о монете
 */
export async function getCoinDetails(coinId: string): Promise<CoinDetails> {
  return fetchApi<CoinDetails>(API_ENDPOINTS.COIN_DETAILS(coinId), {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });
}

/**
 * Параметры для получения данных графика
 */
export interface GetMarketChartParams {
  coinId: string;
  currency?: Currency;
  days: number | 'max';
}

/**
 * Получить данные для графика цены
 */
export async function getMarketChart(
  params: GetMarketChartParams
): Promise<MarketChart> {
  const { coinId, currency = DEFAULTS.CURRENCY, days } = params;

  return fetchApi<MarketChart>(API_ENDPOINTS.COIN_MARKET_CHART(coinId), {
    params: {
      vs_currency: currency,
      days,
    },
  });
}

/**
 * Получить простые цены для нескольких монет
 */
export async function getSimplePrices(
  coinIds: string[],
  currency: Currency = DEFAULTS.CURRENCY as Currency
): Promise<Record<string, Record<string, number>>> {
  return fetchApi<Record<string, Record<string, number>>>(
    API_ENDPOINTS.SIMPLE_PRICE,
    {
      params: {
        ids: coinIds.join(','),
        vs_currencies: currency,
        include_24hr_change: true,
      },
    }
  );
}

/**
 * Получить полный список поддерживаемых монет
 */
export async function getCoinsList(): Promise<CoinSimple[]> {
  return fetchApi<CoinSimple[]>(API_ENDPOINTS.COINS_LIST);
}

/**
 * Получить глобальные данные рынка
 */
export async function getGlobalData(): Promise<GlobalMarketData> {
  return fetchApi<GlobalMarketData>(API_ENDPOINTS.GLOBAL);
}

/**
 * Получить трендовые монеты
 */
export async function getTrendingCoins(): Promise<TrendingCoins> {
  return fetchApi<TrendingCoins>(API_ENDPOINTS.TRENDING);
}
