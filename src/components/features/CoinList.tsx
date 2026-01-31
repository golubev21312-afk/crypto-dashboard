'use client';

import { useState, useMemo, useCallback } from 'react';
import { useCoins } from '@/hooks';
import { useI18n } from '@/lib/i18n';
import { Button, Input } from '@/components/ui';
import { CoinRow, CoinRowSkeleton } from './CoinRow';

interface CoinListProps {
  initialPerPage?: number;
  showSearch?: boolean;
  showLoadMore?: boolean;
}

/**
 * CoinList — список криптовалют с поиском и пагинацией
 * 
 * Оптимизации:
 * - useMemo для фильтрации (не пересчитывается при каждом рендере)
 * - useCallback для обработчиков (стабильные ссылки)
 * - Дочерние CoinRow обёрнуты в React.memo
 * 
 * ---
 * 
 * CoinList — cryptocurrency list with search and pagination
 * 
 * Optimizations:
 * - useMemo for filtering (not recalculated on every render)
 * - useCallback for handlers (stable references)
 * - Child CoinRow components wrapped in React.memo
 */
export function CoinList({
  initialPerPage = 20,
  showSearch = true,
  showLoadMore = true,
}: CoinListProps) {
  const { t } = useI18n();
  const [perPage, setPerPage] = useState(initialPerPage);
  const [search, setSearch] = useState('');

  const { data: coins, isLoading, error } = useCoins({ perPage });

  /**
   * Мемоизированная фильтрация
   * Пересчитывается только при изменении coins или search
   * 
   * ---
   * 
   * Memoized filtering
   * Recalculated only when coins or search changes
   */
  const filteredCoins = useMemo(() => {
    if (!coins) return [];
    if (!search.trim()) return coins;

    const searchLower = search.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchLower) ||
        coin.symbol.toLowerCase().includes(searchLower)
    );
  }, [coins, search]);

  /**
   * Стабильный обработчик поиска
   * 
   * ---
   * 
   * Stable search handler
   */
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  /**
   * Стабильный обработчик загрузки
   * 
   * ---
   * 
   * Stable load more handler
   */
  const handleLoadMore = useCallback(() => {
    setPerPage((prev) => prev + 20);
  }, []);

  if (error) {
    return (
      <div className="rounded-lg border border-danger-200 bg-danger-50 p-4 text-danger-600 dark:border-danger-800 dark:bg-danger-950 dark:text-danger-400">
        {t('common.errorLoading')}: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Поиск / Search */}
      {showSearch && (
        <Input
          placeholder={t('coins.search')}
          value={search}
          onChange={handleSearchChange}
          leftElement={
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />
      )}

      {/* Заголовок таблицы / Table header */}
      <div className="flex items-center gap-4 border-b border-dark-200 px-4 py-2 text-sm font-medium text-dark-500 dark:border-dark-700">
        <span className="w-8 text-center">{t('coins.rank')}</span>
        <span className="flex-1">{t('coins.coin')}</span>
        <span className="text-right">{t('coins.price')}</span>
        <span className="w-24 text-right">{t('coins.change24h')}</span>
        <span className="hidden w-32 text-right md:block">
          {t('coins.marketCap')}
        </span>
      </div>

      {/* Список / List */}
      <div className="divide-y divide-dark-100 dark:divide-dark-800">
        {isLoading ? (
          // Скелетоны / Skeletons
          Array.from({ length: 10 }).map((_, i) => <CoinRowSkeleton key={i} />)
        ) : filteredCoins.length > 0 ? (
          // Монеты / Coins
          filteredCoins.map((coin, index) => (
            <CoinRow key={coin.id} coin={coin} index={index} />
          ))
        ) : (
          // Пусто / Empty
          <div className="py-12 text-center text-dark-500">
            {search ? t('coins.noCoins') : t('coins.noAvailable')}
          </div>
        )}
      </div>

      {/* Кнопка "Загрузить ещё" / Load More button */}
      {showLoadMore && !isLoading && coins && coins.length >= perPage && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={handleLoadMore}>
            {t('coins.loadMore')}
          </Button>
        </div>
      )}
    </div>
  );
}
