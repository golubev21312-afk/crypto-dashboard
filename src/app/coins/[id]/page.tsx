'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCoinDetails } from '@/hooks';
import { useI18n } from '@/lib/i18n';
import { formatCurrency, formatCompact } from '@/lib/utils';
import { Button, Badge, PriceChangeBadge, Skeleton } from '@/components/ui';
import { PriceChart } from '@/components/features';

/**
 * CoinDetailPage — страница с детальной информацией о монете
 * 
 * ---
 * 
 * CoinDetailPage — coin detail page with chart
 */
export default function CoinDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { t } = useI18n();
  const { data: coin, isLoading, error } = useCoinDetails(id);

  if (error) {
    return (
      <main className="container-app py-8">
        <div className="rounded-lg border border-danger-200 bg-danger-50 p-6 text-danger-600 dark:border-danger-800 dark:bg-danger-950 dark:text-danger-400">
          <h2 className="font-semibold">{t('coinDetail.errorLoading')}</h2>
          <p className="mt-1">{error.message}</p>
          <Link href="/coins" className="mt-4 inline-block">
            <Button variant="outline">{t('coinDetail.backToCoins')}</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (isLoading || !coin) {
    return (
      <main className="container-app py-8">
        <div className="mb-8">
          <Skeleton width={200} height={32} />
          <Skeleton width={100} height={20} className="mt-2" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton height={200} className="rounded-xl" />
          <Skeleton height={200} className="rounded-xl" />
        </div>
      </main>
    );
  }

  const price = coin.market_data.current_price.usd;
  const change24h = coin.market_data.price_change_percentage_24h;
  const change7d = coin.market_data.price_change_percentage_7d;
  const change30d = coin.market_data.price_change_percentage_30d;
  const marketCap = coin.market_data.market_cap.usd;
  const volume = coin.market_data.total_volume.usd;
  const high24h = coin.market_data.high_24h.usd;
  const low24h = coin.market_data.low_24h.usd;
  const ath = coin.market_data.ath.usd;
  const atl = coin.market_data.atl.usd;

  return (
    <main className="container-app py-8">
      {/* Навигация / Navigation */}
      <Link
        href="/coins"
        className="mb-6 inline-flex items-center gap-1 text-sm text-dark-500 hover:text-dark-700 dark:text-dark-400 dark:hover:text-dark-200"
      >
        {t('coinDetail.backToCoins')}
      </Link>

      {/* Заголовок / Header */}
      <div className="mb-8 flex flex-wrap items-start gap-4">
        <Image
          src={coin.image.large}
          alt={coin.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-50">
              {coin.name}
            </h1>
            <Badge>{coin.symbol.toUpperCase()}</Badge>
            <Badge variant="primary">
              {t('coinDetail.rank')} #{coin.market_data.market_cap_rank}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-3xl font-bold text-dark-900 dark:text-dark-50">
              {formatCurrency(price)}
            </span>
            <PriceChangeBadge value={change24h} size="lg" />
          </div>
        </div>
      </div>

      {/* График / Chart */}
      <div className="mb-8">
        <PriceChart coinId={id} coinName={coin.name} />
      </div>

      {/* Статистика / Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Изменения цены / Price changes */}
        <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
          <h3 className="mb-4 font-semibold text-dark-900 dark:text-dark-50">
            {t('coinDetail.priceChanges')}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-dark-500">24h</span>
              <PriceChangeBadge value={change24h} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark-500">7d</span>
              <PriceChangeBadge value={change7d} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark-500">30d</span>
              <PriceChangeBadge value={change30d} />
            </div>
          </div>
        </div>

        {/* Рыночные данные / Market data */}
        <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
          <h3 className="mb-4 font-semibold text-dark-900 dark:text-dark-50">
            {t('coinDetail.marketData')}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-dark-500">{t('coins.marketCap')}</span>
              <span className="font-medium text-dark-900 dark:text-dark-50">
                {formatCompact(marketCap)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark-500">{t('coinDetail.volume')}</span>
              <span className="font-medium text-dark-900 dark:text-dark-50">
                {formatCompact(volume)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark-500">{t('coinDetail.circulatingSupply')}</span>
              <span className="font-medium text-dark-900 dark:text-dark-50">
                {formatCompact(coin.market_data.circulating_supply)}
              </span>
            </div>
          </div>
        </div>

        {/* 24h диапазон / 24h range */}
        <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
          <h3 className="mb-4 font-semibold text-dark-900 dark:text-dark-50">
            {t('coinDetail.range24h')}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-dark-500">{t('coinDetail.high')}</span>
              <span className="font-medium text-success-500">
                {formatCurrency(high24h)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dark-500">{t('coinDetail.low')}</span>
              <span className="font-medium text-danger-500">
                {formatCurrency(low24h)}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-dark-200 dark:bg-dark-700">
              <div
                className="h-full bg-gradient-to-r from-danger-500 to-success-500"
                style={{
                  width: `${((price - low24h) / (high24h - low24h)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ATH / ATL */}
        <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800 md:col-span-2 lg:col-span-3">
          <h3 className="mb-4 font-semibold text-dark-900 dark:text-dark-50">
            {t('coinDetail.allTime')}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg bg-success-50 p-4 dark:bg-success-900/20">
              <div>
                <p className="text-sm text-dark-500">{t('coinDetail.ath')}</p>
                <p className="text-xl font-bold text-success-600">
                  {formatCurrency(ath)}
                </p>
              </div>
              <PriceChangeBadge
                value={coin.market_data.ath_change_percentage?.usd || 0}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-danger-50 p-4 dark:bg-danger-900/20">
              <div>
                <p className="text-sm text-dark-500">{t('coinDetail.atl')}</p>
                <p className="text-xl font-bold text-danger-600">
                  {formatCurrency(atl)}
                </p>
              </div>
              <PriceChangeBadge
                value={coin.market_data.atl_change_percentage?.usd || 0}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Описание / Description */}
      {coin.description.en && (
        <div className="mt-8 rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
          <h3 className="mb-4 font-semibold text-dark-900 dark:text-dark-50">
            {t('coinDetail.about')} {coin.name}
          </h3>
          <div
            className="prose prose-sm max-w-none text-dark-600 dark:prose-invert dark:text-dark-400"
            dangerouslySetInnerHTML={{
              __html: coin.description.en.split('. ').slice(0, 3).join('. ') + '.',
            }}
          />
        </div>
      )}
    </main>
  );
}
