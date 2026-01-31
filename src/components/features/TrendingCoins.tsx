'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTrendingCoins } from '@/hooks';
import { useI18n } from '@/lib/i18n';
import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';

/**
 * TrendingCoins — виджет трендовых монет
 */
export function TrendingCoins() {
  const { t } = useI18n();
  const { data, isLoading, error } = useTrendingCoins();

  if (error) {
    return null;
  }

  return (
    <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
      <h3 className="mb-4 flex items-center gap-2 font-semibold text-dark-900 dark:text-dark-50">
        <span className="text-xl">🔥</span>
        {t('trending.title')}
      </h3>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton variant="circular" width={32} height={32} />
                <div className="flex-1">
                  <Skeleton width={100} height={16} />
                  <Skeleton width={50} height={12} className="mt-1" />
                </div>
              </div>
            ))
          : data?.coins.slice(0, 5).map((item, index) => (
              <Link
                key={item.item.id}
                href={`/coins/${item.item.id}`}
                className={cn(
                  'flex items-center gap-3 rounded-lg p-2 -mx-2',
                  'transition-colors hover:bg-dark-50 dark:hover:bg-dark-700/50'
                )}
              >
                <span className="w-4 text-sm text-dark-400">{index + 1}</span>
                <Image
                  src={item.item.small}
                  alt={item.item.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-dark-900 dark:text-dark-50">
                    {item.item.name}
                  </p>
                  <p className="text-xs uppercase text-dark-500">
                    {item.item.symbol}
                  </p>
                </div>
                <span className="text-xs text-dark-400">
                  #{item.item.market_cap_rank || '—'}
                </span>
              </Link>
            ))}
      </div>
    </div>
  );
}
