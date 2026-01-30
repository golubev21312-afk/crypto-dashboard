import { useState, useEffect, useCallback } from 'react';
import type { PortfolioAsset } from '@/types';

const STORAGE_KEY = 'crypto-dashboard-portfolio';

/**
 * Загрузка портфеля из localStorage
 */
function loadPortfolio(): PortfolioAsset[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Сохранение портфеля в localStorage
 */
function savePortfolio(assets: PortfolioAsset[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  } catch (error) {
    console.error('Failed to save portfolio:', error);
  }
}

/**
 * usePortfolio — управление портфелем криптовалют
 *
 * Хранит данные в localStorage для персистентности.
 *
 * @example
 * const { assets, addAsset, removeAsset, updateAsset } = usePortfolio();
 */
export function usePortfolio() {
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка при монтировании
  useEffect(() => {
    setAssets(loadPortfolio());
    setIsLoaded(true);
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    if (isLoaded) {
      savePortfolio(assets);
    }
  }, [assets, isLoaded]);

  /**
   * Добавить актив в портфель
   */
  const addAsset = useCallback(
    (asset: Omit<PortfolioAsset, 'id'>) => {
      const newAsset: PortfolioAsset = {
        ...asset,
        id: `${asset.coinId}-${Date.now()}`,
      };
      setAssets((prev) => [...prev, newAsset]);
      return newAsset;
    },
    []
  );

  /**
   * Удалить актив из портфеля
   */
  const removeAsset = useCallback((assetId: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== assetId));
  }, []);

  /**
   * Обновить актив
   */
  const updateAsset = useCallback(
    (assetId: string, updates: Partial<PortfolioAsset>) => {
      setAssets((prev) =>
        prev.map((a) => (a.id === assetId ? { ...a, ...updates } : a))
      );
    },
    []
  );

  /**
   * Очистить портфель
   */
  const clearPortfolio = useCallback(() => {
    setAssets([]);
  }, []);

  /**
   * Получить общее количество монеты в портфеле
   */
  const getTotalAmount = useCallback(
    (coinId: string) => {
      return assets
        .filter((a) => a.coinId === coinId)
        .reduce((sum, a) => sum + a.amount, 0);
    },
    [assets]
  );

  /**
   * Получить уникальные ID монет в портфеле
   */
  const getUniqueCoinIds = useCallback(() => {
    return [...new Set(assets.map((a) => a.coinId))];
  }, [assets]);

  return {
    assets,
    isLoaded,
    addAsset,
    removeAsset,
    updateAsset,
    clearPortfolio,
    getTotalAmount,
    getUniqueCoinIds,
  };
}
