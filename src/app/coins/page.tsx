'use client';

import { CoinList } from '@/components/features';

/**
 * CoinsPage — страница со списком всех монет
 */
export default function CoinsPage() {
  return (
    <main className="container-app py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-50">
          Cryptocurrencies
        </h1>
        <p className="mt-1 text-dark-500 dark:text-dark-400">
          Browse and search all available cryptocurrencies
        </p>
      </div>

      {/* Список монет */}
      <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
        <CoinList initialPerPage={20} showSearch={true} showLoadMore={true} />
      </div>
    </main>
  );
}
