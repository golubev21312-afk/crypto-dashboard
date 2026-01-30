/**
 * Basic cryptocurrency data from CoinGecko
 */
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

/**
 * Simplified coin data for lists
 */
export interface CoinSimple {
  id: string;
  symbol: string;
  name: string;
}

/**
 * Price history data point
 */
export interface PriceDataPoint {
  timestamp: number;
  price: number;
}

/**
 * Market chart data from CoinGecko
 */
export interface MarketChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

/**
 * Time range options for charts
 */
export type TimeRange = '1D' | '7D' | '1M' | '3M' | '1Y' | 'ALL';

/**
 * Currency options
 */
export type Currency = 'usd' | 'eur' | 'gbp' | 'jpy' | 'rub';
