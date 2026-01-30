/**
 * Portfolio asset entry
 */
export interface PortfolioAsset {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: string;
  notes?: string;
}

/**
 * Portfolio asset with calculated values
 */
export interface PortfolioAssetWithValue extends PortfolioAsset {
  currentPrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  image: string;
}

/**
 * Portfolio summary statistics
 */
export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
  assetsCount: number;
}

/**
 * Transaction types
 */
export type TransactionType = 'buy' | 'sell' | 'transfer_in' | 'transfer_out';

/**
 * Transaction record
 */
export interface Transaction {
  id: string;
  coinId: string;
  symbol: string;
  type: TransactionType;
  amount: number;
  price: number;
  totalValue: number;
  date: string;
  notes?: string;
}
