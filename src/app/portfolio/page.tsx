'use client';

import { useState } from 'react';
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

/**
 * PortfolioPage — страница управления портфелем
 * 
 * ---
 * 
 * PortfolioPage — portfolio management page
 */
export default function PortfolioPage() {
  const { t } = useI18n();
  const {
    assets,
    isLoaded,
    addAsset,
    removeAsset,
    getUniqueCoinIds,
  } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    coinId: '',
    amount: '',
    purchasePrice: '',
  });

  // Получаем актуальные цены для монет в портфеле
  const coinIds = getUniqueCoinIds();
  const { data: coinsData, isLoading: coinsLoading } = useCoins({
    ids: coinIds.length > 0 ? coinIds.join(',') : undefined,
    perPage: 100,
  });

  // Для выбора монеты при добавлении
  const { data: allCoins } = useCoins({ perPage: 50 });

  // Расчёт стоимости портфеля
  const portfolioWithValues = assets.map((asset) => {
    const coinData = coinsData?.find((c) => c.id === asset.coinId);
    const currentPrice = coinData?.current_price || 0;
    const currentValue = asset.amount * currentPrice;
    const invested = asset.amount * asset.purchasePrice;
    const profitLoss = currentValue - invested;
    const profitLossPercent = invested > 0 ? (profitLoss / invested) * 100 : 0;

    return {
      ...asset,
      coinData,
      currentPrice,
      currentValue,
      invested,
      profitLoss,
      profitLossPercent,
    };
  });

  const totalValue = portfolioWithValues.reduce(
    (sum, a) => sum + a.currentValue,
    0
  );
  const totalInvested = portfolioWithValues.reduce(
    (sum, a) => sum + a.invested,
    0
  );
  const totalProfitLoss = totalValue - totalInvested;
  const totalProfitLossPercent =
    totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

  // Добавление актива
  const handleAddAsset = () => {
    if (!newAsset.coinId || !newAsset.amount || !newAsset.purchasePrice) return;

    const coin = allCoins?.find((c) => c.id === newAsset.coinId);
    if (!coin) return;

    addAsset({
      coinId: newAsset.coinId,
      symbol: coin.symbol,
      name: coin.name,
      amount: parseFloat(newAsset.amount),
      purchasePrice: parseFloat(newAsset.purchasePrice),
      purchaseDate: new Date().toISOString(),
    });

    setNewAsset({ coinId: '', amount: '', purchasePrice: '' });
    setIsModalOpen(false);
  };

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
      {/* Заголовок / Header */}
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

      {/* Статистика / Statistics */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title={t('portfolio.totalValue')}
          value={formatCurrency(totalValue)}
          isLoading={coinsLoading && assets.length > 0}
        />
        <StatCard
          title={t('portfolio.totalInvested')}
          value={formatCurrency(totalInvested)}
        />
        <StatCard
          title={t('portfolio.profitLoss')}
          value={formatCurrency(Math.abs(totalProfitLoss))}
          change={totalProfitLossPercent}
          isLoading={coinsLoading && assets.length > 0}
        />
      </div>

      {/* Список активов / Asset list */}
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
            {/* Заголовок таблицы / Table header */}
            <div className="flex items-center gap-4 border-b border-dark-200 px-6 py-3 text-sm font-medium text-dark-500 dark:border-dark-700">
              <span className="flex-1">{t('portfolio.asset')}</span>
              <span className="w-24 text-right">{t('portfolio.amount')}</span>
              <span className="w-28 text-right">{t('coins.price')}</span>
              <span className="w-28 text-right">{t('portfolio.value')}</span>
              <span className="w-24 text-right">{t('portfolio.pl')}</span>
              <span className="w-20" />
            </div>

            {/* Активы / Assets */}
            {portfolioWithValues.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center gap-4 border-b border-dark-100 px-6 py-4 last:border-b-0 dark:border-dark-800"
              >
                {/* Монета / Coin */}
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  {asset.coinData?.image && (
                    <Image
                      src={asset.coinData.image}
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
                    <p className="text-sm uppercase text-dark-500">
                      {asset.symbol}
                    </p>
                  </div>
                </div>

                {/* Количество / Amount */}
                <div className="w-24 text-right">
                  <p className="font-medium text-dark-900 dark:text-dark-50">
                    {asset.amount}
                  </p>
                </div>

                {/* Цена / Price */}
                <div className="w-28 text-right">
                  <p className="text-dark-900 dark:text-dark-50">
                    {formatCurrency(asset.currentPrice)}
                  </p>
                  <p className="text-xs text-dark-500">
                    {t('portfolio.avgPrice')}: {formatCurrency(asset.purchasePrice)}
                  </p>
                </div>

                {/* Стоимость / Value */}
                <div className="w-28 text-right">
                  <p className="font-medium text-dark-900 dark:text-dark-50">
                    {formatCurrency(asset.currentValue)}
                  </p>
                </div>

                {/* P/L */}
                <div className="w-24 text-right">
                  <PriceChangeBadge value={asset.profitLossPercent} />
                </div>

                {/* Удалить / Remove */}
                <div className="w-20 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAsset(asset.id)}
                  >
                    {t('portfolio.remove')}
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Модалка добавления актива / Add asset modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('modal.addAsset')}
        description={t('modal.addAssetDesc')}
      >
        <div className="space-y-4">
          {/* Выбор монеты / Coin select */}
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

          {/* Количество / Amount */}
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

          {/* Цена покупки / Purchase price */}
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
