import Image from 'next/image';
import Link from 'next/link';
import { cn, formatCurrency, formatCompact } from '@/lib/utils';
import { PriceChangeBadge } from '@/components/ui';
import type { Coin } from '@/types';

interface CoinRowProps {
  coin: Coin;
  index: number;
}

/**
 * CoinRow — строка с информацией о монете
 */
export function CoinRow({ coin, index }: CoinRowProps) {
  return (
    <Link
      href={`/coins/${coin.id}`}
      className={cn(
        'flex items-center gap-4 rounded-lg p-4',
        'transition-colors hover:bg-dark-50 dark:hover:bg-dark-800/50'
      )}
    >
      {/* Ранг */}
      <span className="w-8 text-center text-sm text-dark-500">
        {index + 1}
      </span>

      {/* Монета */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Image
          src={coin.image}
          alt={coin.name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
        <div className="min-w-0">
          <p className="truncate font-medium text-dark-900 dark:text-dark-50">
            {coin.name}
          </p>
          <p className="text-sm uppercase text-dark-500">{coin.symbol}</p>
        </div>
      </div>

      {/* Цена */}
      <div className="text-right">
        <p className="font-medium text-dark-900 dark:text-dark-50">
          {formatCurrency(coin.current_price)}
        </p>
      </div>

      {/* Изменение 24h */}
      <div className="w-24 text-right">
        <PriceChangeBadge value={coin.price_change_percentage_24h || 0} />
      </div>

      {/* Market Cap (скрыто на мобильных) */}
      <div className="hidden w-32 text-right md:block">
        <p className="text-sm text-dark-600 dark:text-dark-400">
          {formatCompact(coin.market_cap)}
        </p>
      </div>
    </Link>
  );
}

/**
 * CoinRowSkeleton — скелетон для загрузки
 */
export function CoinRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="h-4 w-8 animate-pulse rounded bg-dark-200 dark:bg-dark-700" />
      <div className="flex flex-1 items-center gap-3">
        <div className="h-8 w-8 animate-pulse rounded-full bg-dark-200 dark:bg-dark-700" />
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-dark-200 dark:bg-dark-700" />
          <div className="h-3 w-12 animate-pulse rounded bg-dark-200 dark:bg-dark-700" />
        </div>
      </div>
      <div className="h-4 w-20 animate-pulse rounded bg-dark-200 dark:bg-dark-700" />
      <div className="h-6 w-16 animate-pulse rounded-full bg-dark-200 dark:bg-dark-700" />
      <div className="hidden h-4 w-24 animate-pulse rounded bg-dark-200 dark:bg-dark-700 md:block" />
    </div>
  );
}
