'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import Image from 'next/image';
import { usePortfolio, useCoins } from '@/hooks';
import { useI18n } from '@/lib/i18n';
import { formatCurrency } from '@/lib/utils';
import {
  Button,
  Input,
  Modal,
  PriceChangeBadge,
  Skeleton,
} from '@/components/ui';
import { StatCard } from '@/components/features';
import { cn } from '@/lib/utils';
import type { PortfolioAsset, Transaction } from '@/hooks/use-portfolio';
import type { Coin } from '@/types';

/**
 * Иконка стрелки
 */
function ChevronIcon({ className, isOpen }: { className?: string; isOpen: boolean }) {
  return (
    <svg
      className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/**
 * Форматирование даты
 */
function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ru: 'ru-RU',
    th: 'th-TH',
    zh: 'zh-CN',
  };
  return date.toLocaleDateString(localeMap[locale] || 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Строка транзакции (мемоизирована)
 */
const TransactionRow = memo(function TransactionRow({
  transaction,
  coinId,
  currentPrice,
  onRemove,
  locale,
  t,
}: {
  transaction: Transaction;
  coinId: string;
  currentPrice: number;
  onRemove: (coinId: string, transactionId: string) => void;
  locale: string;
  t: (key: string) => string;
}) {
  const value = transaction.amount * currentPrice;
  const invested = transaction.amount * transaction.purchasePrice;
  const profitLoss = value - invested;
  const profitLossPercent = invested > 0 ? (profitLoss / invested) * 100 : 0;

  return (
    <div className="flex items-center gap-4 border-t border-dark-100 bg-dark-50/50 px-6 py-3 dark:border-dark-700 dark:bg-dark-900/50">
      <div className="w-8" /> {/* Отступ для выравнивания */}
      <div className="flex-1 text-sm text-dark-500">
        {formatDate(transaction.purchaseDate, locale)}
      </div>
      <div className="w-24 text-right text-sm">
        {transaction.amount}
      </div>
      <div className="w-28 text-right text-sm">
        {formatCurrency(transaction.purchasePrice)}
      </div>
      <div className="w-28 text-right text-sm">
        {formatCurrency(value)}
      </div>
      <div className="w-24 text-right">
        <PriceChangeBadge value={profitLossPercent} size="sm" />
      </div>
      <div className="w-20 text-right">
        <button
          onClick={() => onRemove(coinId, transaction.id)}
          className="text-xs text-dark-400 hover:text-danger-500"
        >
          ✕
        </button>
      </div>
    </div>
  );
});

/**
 * Группа актива (мемоизирована)
 */
const AssetGroup = memo(function AssetGroup({
  asset,
  coinData,
  currentPrice,
  isExpanded,
  onToggle,
  onRemoveTransaction,
  onRemoveAsset,
  locale,
  t,
}: {
  asset: PortfolioAsset;
  coinData?: Coin;
  currentPrice: number;
  isExpanded: boolean;
  onToggle: () => void;
  onRemoveTransaction: (coinId: string, transactionId: string) => void;
  onRemoveAsset: (coinId: string) => void;
  locale: string;
  t: (key: string) => string;
}) {
  // Расчёты
  const totalAmount = asset.transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalInvested = asset.transactions.reduce(
    (sum, t) => sum + t.amount * t.purchasePrice,
    0
  );
  const avgPrice = totalAmount > 0 ? totalInvested / totalAmount : 0;
  const currentValue = totalAmount * currentPrice;
  const profitLoss = currentValue - totalInvested;
  const profitLossPercent = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

  return (
    <div className="border-b border-dark-100 last:border-b-0 dark:border-dark-800">
      {/* Основная строка */}
      <div
        onClick={onToggle}
        className={cn(
          'flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors',
          'hover:bg-dark-50 dark:hover:bg-dark-800/50',
          isExpanded && 'bg-dark-50/50 dark:bg-dark-800/30'
        )}
      >
        {/* Иконка раскрытия */}
        <div className="w-8 flex-shrink-0">
          <ChevronIcon isOpen={isExpanded} className="text-dark-400" />
        </div>

        {/* Монета */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {coinData?.image && (
            <Image
              src={coinData.image}
              alt={asset.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div className="min-w-0">
            <p className="truncate font-medium text-dark-900 dark:text-dark-50">
              {asset.name}
            </p>
            <p className="text-sm text-dark-500">
              {asset.symbol.toUpperCase()} · {asset.transactions.length}{' '}
              {asset.transactions.length === 1
                ? t('portfolio.transaction')
                : t('portfolio.transactions')}
            </p>
          </div>
        </div>

        {/* Количество */}
        <div className="w-24 text-right">
          <p className="font-medium text-dark-900 dark:text-dark-50">
            {totalAmount.toFixed(totalAmount < 1 ? 6 : 2)}
          </p>
        </div>

        {/* Цена */}
        <div className="w-28 text-right">
          <p className="text-dark-900 dark:text-dark-50">
            {formatCurrency(currentPrice)}
          </p>
          <p className="text-xs text-dark-500">
            {t('portfolio.avgPrice')}: {formatCurrency(avgPrice)}
          </p>
        </div>

        {/* Стоимость */}
        <div className="w-28 text-right">
          <p className="font-medium text-dark-900 dark:text-dark-50">
            {formatCurrency(currentValue)}
          </p>
        </div>

        {/* P/L */}
        <div className="w-24 text-right">
          <PriceChangeBadge value={profitLossPercent} />
        </div>

        {/* Удалить всё */}
        <div className="w-20 text-right">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveAsset(asset.coinId);
            }}
          >
            {t('portfolio.remove')}
          </Button>
        </div>
      </div>

      {/* Раскрытый список транзакций */}
      {isExpanded && (
        <div>
          {/* Заголовок транзакций */}
          <div className="flex items-center gap-4 bg-dark-100/50 px-6 py-2 text-xs font-medium uppercase text-dark-500 dark:bg-dark-800/50">
            <div className="w-8" />
            <div className="flex-1">{t('portfolio.date')}</div>
            <div className="w-24 text-right">{t('portfolio.amount')}</div>
            <div className="w-28 text-right">{t('portfolio.buyPrice')}</div>
            <div className="w-28 text-right">{t('portfolio.value')}</div>
            <div className="w-24 text-right">{t('portfolio.pl')}</div>
            <div className="w-20" />
          </div>

          {/* Транзакции */}
          {asset.transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              coinId={asset.coinId}
              currentPrice={currentPrice}
              onRemove={onRemoveTransaction}
              locale={locale}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
});

/**
 * PortfolioPage — страница управления портфелем с группировкой
 */
export default function PortfolioPage() {
  const { t, locale } = useI18n();
  const {
    assets,
    isLoaded,
    addTransaction,
    removeTransaction,
    removeAsset,
    getUniqueCoinIds,
  } = usePortfolio();

  const [expandedCoins, setExpandedCoins] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    coinId: '',
    amount: '',
    purchasePrice: '',
  });

  // Получаем актуальные цены
  const coinIds = getUniqueCoinIds();
  const { data: coinsData, isLoading: coinsLoading } = useCoins({
    ids: coinIds.length > 0 ? coinIds.join(',') : undefined,
    perPage: 100,
  });

  // Для выбора монеты
  const { data: allCoins } = useCoins({ perPage: 50 });

  // Карта цен (мемоизирована)
  const priceMap = useMemo(() => {
    const map = new Map<string, number>();
    coinsData?.forEach((coin) => {
      map.set(coin.id, coin.current_price);
    });
    return map;
  }, [coinsData]);

  // Карта данных монет
  const coinDataMap = useMemo(() => {
    const map = new Map<string, Coin>();
    coinsData?.forEach((coin) => {
      map.set(coin.id, coin);
    });
    return map;
  }, [coinsData]);

  // Расчёт статистики (мемоизировано)
  const stats = useMemo(() => {
    let totalValue = 0;
    let totalInvested = 0;

    assets.forEach((asset) => {
      const price = priceMap.get(asset.coinId) || 0;
      asset.transactions.forEach((t) => {
        totalValue += t.amount * price;
        totalInvested += t.amount * t.purchasePrice;
      });
    });

    const totalProfitLoss = totalValue - totalInvested;
    const totalProfitLossPercent =
      totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

    return { totalValue, totalInvested, totalProfitLoss, totalProfitLossPercent };
  }, [assets, priceMap]);

  // Переключение раскрытия
  const toggleExpanded = useCallback((coinId: string) => {
    setExpandedCoins((prev) => {
      const next = new Set(prev);
      if (next.has(coinId)) {
        next.delete(coinId);
      } else {
        next.add(coinId);
      }
      return next;
    });
  }, []);

  // Добавление транзакции
  const handleAddAsset = useCallback(() => {
    if (!newAsset.coinId || !newAsset.amount || !newAsset.purchasePrice) return;

    const coin = allCoins?.find((c) => c.id === newAsset.coinId);
    if (!coin) return;

    addTransaction({
      coinId: newAsset.coinId,
      symbol: coin.symbol,
      name: coin.name,
      amount: parseFloat(newAsset.amount),
      purchasePrice: parseFloat(newAsset.purchasePrice),
      purchaseDate: new Date().toISOString(),
    });

    setNewAsset({ coinId: '', amount: '', purchasePrice: '' });
    setIsModalOpen(false);
  }, [newAsset, allCoins, addTransaction]);

  if (!isLoaded) {
    return (
      <main className="container-app py-8">
        <Skeleton width={200} height={32} />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Skeleton height={120} className="rounded-xl" />
          <Skeleton height={120} className="rounded-xl" />
          <Skeleton height={120} className="rounded-xl" />
        </div>
      </main>
    );
  }

  return (
    <main className="container-app py-8">
      {/* Заголовок */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-50">
            {t('portfolio.title')}
          </h1>
          <p className="mt-1 text-dark-500 dark:text-dark-400">
            {t('portfolio.subtitle')}
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          {t('portfolio.addAsset')}
        </Button>
      </div>

      {/* Статистика */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title={t('portfolio.totalValue')}
          value={formatCurrency(stats.totalValue)}
          isLoading={coinsLoading && assets.length > 0}
        />
        <StatCard
          title={t('portfolio.totalInvested')}
          value={formatCurrency(stats.totalInvested)}
        />
        <StatCard
          title={t('portfolio.profitLoss')}
          value={formatCurrency(Math.abs(stats.totalProfitLoss))}
          change={stats.totalProfitLossPercent}
          isLoading={coinsLoading && assets.length > 0}
        />
      </div>

      {/* Список активов */}
      <div className="rounded-xl border border-dark-200 bg-white dark:border-dark-700 dark:bg-dark-800">
        {assets.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-dark-500">{t('portfolio.empty')}</p>
            <p className="mt-1 text-sm text-dark-400">
              {t('portfolio.emptyHint')}
            </p>
            <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
              {t('portfolio.addAsset')}
            </Button>
          </div>
        ) : (
          <>
            {/* Заголовок таблицы */}
            <div className="flex items-center gap-4 border-b border-dark-200 px-6 py-3 text-sm font-medium text-dark-500 dark:border-dark-700">
              <span className="w-8" />
              <span className="flex-1">{t('portfolio.asset')}</span>
              <span className="w-24 text-right">{t('portfolio.amount')}</span>
              <span className="w-28 text-right">{t('coins.price')}</span>
              <span className="w-28 text-right">{t('portfolio.value')}</span>
              <span className="w-24 text-right">{t('portfolio.pl')}</span>
              <span className="w-20" />
            </div>

            {/* Активы */}
            {assets.map((asset) => (
              <AssetGroup
                key={asset.coinId}
                asset={asset}
                coinData={coinDataMap.get(asset.coinId)}
                currentPrice={priceMap.get(asset.coinId) || 0}
                isExpanded={expandedCoins.has(asset.coinId)}
                onToggle={() => toggleExpanded(asset.coinId)}
                onRemoveTransaction={removeTransaction}
                onRemoveAsset={removeAsset}
                locale={locale}
                t={t}
              />
            ))}
          </>
        )}
      </div>

      {/* Модалка добавления */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('modal.addAsset')}
        description={t('modal.addAssetDesc')}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark-700 dark:text-dark-300">
              {t('modal.coin')}
            </label>
            <select
              value={newAsset.coinId}
              onChange={(e) =>
                setNewAsset((prev) => ({ ...prev, coinId: e.target.value }))
              }
              className="w-full rounded-lg border border-dark-300 bg-white px-4 py-2.5 text-dark-900 dark:border-dark-600 dark:bg-dark-800 dark:text-dark-100"
            >
              <option value="">{t('modal.selectCoin')}</option>
              {allCoins?.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <Input
            label={t('portfolio.amount')}
            type="number"
            step="any"
            placeholder="0.00"
            value={newAsset.amount}
            onChange={(e) =>
              setNewAsset((prev) => ({ ...prev, amount: e.target.value }))
            }
          />

          <Input
            label={t('modal.purchasePrice')}
            type="number"
            step="any"
            placeholder="0.00"
            value={newAsset.purchasePrice}
            onChange={(e) =>
              setNewAsset((prev) => ({
                ...prev,
                purchasePrice: e.target.value,
              }))
            }
          />
        </div>

        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            {t('modal.cancel')}
          </Button>
          <Button onClick={handleAddAsset}>{t('modal.add')}</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
