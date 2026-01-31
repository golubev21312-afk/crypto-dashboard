'use client';

import Link from 'next/link';
import { useCoins, useGlobalData } from '@/hooks';
import { formatCurrency, formatCompact } from '@/lib/utils';
import { Button } from '@/components/ui';
import { StatCard, CoinList, TrendingCoins } from '@/components/features';

/**
 * Иконки для статистики
 */
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function CoinsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

/**
 * Dashboard — главная страница
 */
export default function DashboardPage() {
  const { data: globalData, isLoading: globalLoading } = useGlobalData();
  const { data: topCoins, isLoading: coinsLoading } = useCoins({ perPage: 5 });

  const totalMarketCap = globalData?.data.total_market_cap.usd || 0;
  const totalVolume = globalData?.data.total_volume.usd || 0;
  const btcDominance = globalData?.data.market_cap_percentage.btc || 0;
  const marketCapChange = globalData?.data.market_cap_change_percentage_24h_usd || 0;

  return (
    <main className="container-app py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-50">
          Dashboard
        </h1>
        <p className="mt-1 text-dark-500 dark:text-dark-400">
          Cryptocurrency market overview
        </p>
      </div>

      {/* Статистика */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Market Cap"
          value={formatCompact(totalMarketCap)}
          change={marketCapChange}
          icon={<ChartIcon className="h-5 w-5" />}
          isLoading={globalLoading}
        />
        <StatCard
          title="24h Volume"
          value={formatCompact(totalVolume)}
          icon={<WalletIcon className="h-5 w-5" />}
          isLoading={globalLoading}
        />
        <StatCard
          title="BTC Dominance"
          value={`${btcDominance.toFixed(1)}%`}
          icon={<CoinsIcon className="h-5 w-5" />}
          isLoading={globalLoading}
        />
        <StatCard
          title="Active Coins"
          value={globalData?.data.active_cryptocurrencies.toLocaleString() || '0'}
          isLoading={globalLoading}
        />
      </div>

      {/* Основной контент */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Топ монеты */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-50">
              Top Cryptocurrencies
            </h2>
            <Link href="/coins">
              <Button variant="ghost" size="sm">
                View All →
              </Button>
            </Link>
          </div>

          <div className="rounded-xl border border-dark-200 bg-white dark:border-dark-700 dark:bg-dark-800">
            <CoinList
              initialPerPage={5}
              showSearch={false}
              showLoadMore={false}
            />
          </div>
        </div>

        {/* Сайдбар */}
        <div className="space-y-6">
          {/* Трендовые */}
          <TrendingCoins />

          {/* Быстрые действия */}
          <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
            <h3 className="mb-4 font-semibold text-dark-900 dark:text-dark-50">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link href="/portfolio" className="block">
                <Button variant="outline" fullWidth>
                  Manage Portfolio
                </Button>
              </Link>
              <Link href="/coins" className="block">
                <Button variant="ghost" fullWidth>
                  Browse All Coins
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
