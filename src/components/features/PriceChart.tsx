'use client';

import { useState, useMemo } from 'react';
import { useMarketChart } from '@/hooks';
import { useI18n } from '@/lib/i18n';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { TimeRange } from '@/types';

interface PriceChartProps {
  coinId: string;
  coinName: string;
}

const TIME_RANGES: { key: TimeRange; label: string }[] = [
  { key: '1D', label: '24H' },
  { key: '7D', label: '7D' },
  { key: '1M', label: '1M' },
  { key: '3M', label: '3M' },
  { key: '1Y', label: '1Y' },
];

/**
 * PriceChart — график цены криптовалюты
 * 
 * ---
 * 
 * PriceChart — cryptocurrency price chart
 */
export function PriceChart({ coinId, coinName }: PriceChartProps) {
  const { t } = useI18n();
  const [timeRange, setTimeRange] = useState<TimeRange>('7D');
  const { data, isLoading, error } = useMarketChart(coinId, 'usd', timeRange);

  // Обработка данных для графика
  const chartData = useMemo(() => {
    if (!data?.prices) return null;

    const prices = data.prices;
    const minPrice = Math.min(...prices.map((p) => p[1]));
    const maxPrice = Math.max(...prices.map((p) => p[1]));
    const priceRange = maxPrice - minPrice;

    // Нормализуем для SVG (0-100)
    const points = prices.map((p, i) => {
      const x = (i / (prices.length - 1)) * 100;
      const y = 100 - ((p[1] - minPrice) / priceRange) * 100;
      return { x, y, price: p[1], timestamp: p[0] };
    });

    // Определяем тренд
    const firstPrice = prices[0]?.[1] || 0;
    const lastPrice = prices[prices.length - 1]?.[1] || 0;
    const isPositive = lastPrice >= firstPrice;
    const changePercent = ((lastPrice - firstPrice) / firstPrice) * 100;

    return {
      points,
      minPrice,
      maxPrice,
      isPositive,
      changePercent,
      currentPrice: lastPrice,
    };
  }, [data]);

  // SVG path для линии
  const linePath = useMemo(() => {
    if (!chartData) return '';
    return chartData.points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');
  }, [chartData]);

  // SVG path для градиента
  const areaPath = useMemo(() => {
    if (!chartData) return '';
    const line = chartData.points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');
    return `${line} L 100 100 L 0 100 Z`;
  }, [chartData]);

  if (error) {
    return (
      <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
        <p className="text-dark-500">{t('common.errorLoading')}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
      {/* Заголовок / Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-dark-900 dark:text-dark-50">
            {t('chart.title')} {coinName}
          </h3>
          {chartData && (
            <div className="mt-1 flex items-center gap-2">
              <span className="text-2xl font-bold text-dark-900 dark:text-dark-50">
                {formatCurrency(chartData.currentPrice)}
              </span>
              <span
                className={cn(
                  'text-sm font-medium',
                  chartData.isPositive ? 'text-success-500' : 'text-danger-500'
                )}
              >
                {chartData.isPositive ? '+' : ''}
                {chartData.changePercent.toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        {/* Переключатель периода / Time range selector */}
        <div className="flex gap-1 rounded-lg bg-dark-100 p-1 dark:bg-dark-700">
          {TIME_RANGES.map((range) => (
            <button
              key={range.key}
              onClick={() => setTimeRange(range.key)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                timeRange === range.key
                  ? 'bg-white text-dark-900 shadow-sm dark:bg-dark-600 dark:text-dark-50'
                  : 'text-dark-500 hover:text-dark-700 dark:text-dark-400 dark:hover:text-dark-200'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* График / Chart */}
      <div className="relative h-64">
        {isLoading ? (
          <Skeleton height="100%" className="rounded-lg" />
        ) : chartData ? (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            {/* Градиент */}
            <defs>
              <linearGradient
                id={`gradient-${coinId}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={chartData.isPositive ? '#22c55e' : '#ef4444'}
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor={chartData.isPositive ? '#22c55e' : '#ef4444'}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            {/* Область под графиком */}
            <path
              d={areaPath}
              fill={`url(#gradient-${coinId})`}
            />

            {/* Линия графика */}
            <path
              d={linePath}
              fill="none"
              stroke={chartData.isPositive ? '#22c55e' : '#ef4444'}
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ) : null}

        {/* Метки цен / Price labels */}
        {chartData && (
          <>
            <div className="absolute right-0 top-0 text-xs text-dark-400">
              {formatCurrency(chartData.maxPrice)}
            </div>
            <div className="absolute bottom-0 right-0 text-xs text-dark-400">
              {formatCurrency(chartData.minPrice)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
