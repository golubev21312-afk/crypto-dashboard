'use client';

import { useState } from 'react';
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

  // Фильтрация по поиску
  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="rounded-lg border border-danger-200 bg-danger-50 p-4 text-danger-600 dark:border-danger-800 dark:bg-danger-950 dark:text-danger-400">
        {t('common.errorLoading')}: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Поиск */}
      {showSearch && (
        <Input
          placeholder={t('coins.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {/* Заголовок таблицы */}
      <div className="flex items-center gap-4 border-b border-dark-200 px-4 py-2 text-sm font-medium text-dark-500 dark:border-dark-700">
        <span className="w-8 text-center">{t('coins.rank')}</span>
        <span className="flex-1">{t('coins.coin')}</span>
        <span className="text-right">{t('coins.price')}</span>
        <span className="w-24 text-right">{t('coins.change24h')}</span>
        <span className="hidden w-32 text-right md:block">{t('coins.marketCap')}</span>
      </div>

      {/* Список */}
      <div className="divide-y divide-dark-100 dark:divide-dark-800">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => <CoinRowSkeleton key={i} />)
        ) : filteredCoins && filteredCoins.length > 0 ? (
          filteredCoins.map((coin, index) => (
            <CoinRow key={coin.id} coin={coin} index={index} />
          ))
        ) : (
          <div className="py-12 text-center text-dark-500">
            {search ? t('coins.noCoins') : t('coins.noAvailable')}
          </div>
        )}
      </div>

      {/* Кнопка "Загрузить ещё" */}
      {showLoadMore && !isLoading && coins && coins.length >= perPage && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => setPerPage((prev) => prev + 20)}
          >
            {t('coins.loadMore')}
          </Button>
        </div>
      )}
    </div>
  );
}
