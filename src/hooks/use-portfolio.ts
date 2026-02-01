'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Транзакция покупки
 * Purchase transaction
 */
export interface Transaction {
  id: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: string;
}

/**
 * Актив портфеля (группа транзакций одной монеты)
 * Portfolio asset (group of transactions for one coin)
 */
export interface PortfolioAsset {
  coinId: string;
  symbol: string;
  name: string;
  transactions: Transaction[];
}

/**
 * Данные для добавления транзакции
 * Data for adding transaction
 */
export interface AddTransactionData {
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: string;
}

const STORAGE_KEY = 'crypto-portfolio-v2';

/**
 * Генерация уникального ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Загрузка портфеля из localStorage
 */
function loadPortfolio(): PortfolioAsset[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading portfolio:', error);
  }

  return [];
}

/**
 * Сохранение портфеля в localStorage
 */
function savePortfolio(assets: PortfolioAsset[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  } catch (error) {
    console.error('Error saving portfolio:', error);
  }
}

/**
 * usePortfolio — хук для управления портфелем с группировкой по монетам
 * 
 * ---
 * 
 * usePortfolio — portfolio management hook with coin grouping
 */
export function usePortfolio() {
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка при монтировании
  useEffect(() => {
    const loaded = loadPortfolio();
    setAssets(loaded);
    setIsLoaded(true);
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    if (isLoaded) {
      savePortfolio(assets);
    }
  }, [assets, isLoaded]);

  /**
   * Добавление транзакции (группирует по coinId)
   */
  const addTransaction = useCallback((data: AddTransactionData) => {
    const transaction: Transaction = {
      id: generateId(),
      amount: data.amount,
      purchasePrice: data.purchasePrice,
      purchaseDate: data.purchaseDate,
    };

    setAssets((prev) => {
      const existingIndex = prev.findIndex((a) => a.coinId === data.coinId);

      if (existingIndex >= 0) {
        // Добавляем транзакцию к существующему активу
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          transactions: [...updated[existingIndex].transactions, transaction],
        };
        return updated;
      } else {
        // Создаём новый актив
        return [
          ...prev,
          {
            coinId: data.coinId,
            symbol: data.symbol,
            name: data.name,
            transactions: [transaction],
          },
        ];
      }
    });
  }, []);

  /**
   * Удаление транзакции
   */
  const removeTransaction = useCallback(
    (coinId: string, transactionId: string) => {
      setAssets((prev) => {
        return prev
          .map((asset) => {
            if (asset.coinId !== coinId) return asset;

            const filteredTransactions = asset.transactions.filter(
              (t) => t.id !== transactionId
            );

            // Если транзакций не осталось — удаляем актив
            if (filteredTransactions.length === 0) {
              return null;
            }

            return {
              ...asset,
              transactions: filteredTransactions,
            };
          })
          .filter((asset): asset is PortfolioAsset => asset !== null);
      });
    },
    []
  );

  /**
   * Удаление всего актива (всех транзакций монеты)
   */
  const removeAsset = useCallback((coinId: string) => {
    setAssets((prev) => prev.filter((a) => a.coinId !== coinId));
  }, []);

  /**
   * Очистка портфеля
   */
  const clearPortfolio = useCallback(() => {
    setAssets([]);
  }, []);

  /**
   * Получение уникальных coinId
   */
  const getUniqueCoinIds = useCallback((): string[] => {
    return assets.map((a) => a.coinId);
  }, [assets]);

  /**
   * Расчёт суммарных данных по активу
   */
  const getAssetSummary = useCallback(
    (coinId: string) => {
      const asset = assets.find((a) => a.coinId === coinId);
      if (!asset) return null;

      const totalAmount = asset.transactions.reduce(
        (sum, t) => sum + t.amount,
        0
      );
      const totalInvested = asset.transactions.reduce(
        (sum, t) => sum + t.amount * t.purchasePrice,
        0
      );
      const avgPrice = totalAmount > 0 ? totalInvested / totalAmount : 0;

      return {
        totalAmount,
        totalInvested,
        avgPrice,
        transactionCount: asset.transactions.length,
      };
    },
    [assets]
  );

  return {
    assets,
    isLoaded,
    addTransaction,
    removeTransaction,
    removeAsset,
    clearPortfolio,
    getUniqueCoinIds,
    getAssetSummary,
  };
}
