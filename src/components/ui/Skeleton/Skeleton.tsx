import { cn } from '@/lib/utils';
import type { SkeletonProps, SkeletonVariant } from './Skeleton.types';

/**
 * Стили для каждого варианта скелетона
 */
const variantStyles: Record<SkeletonVariant, string> = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-lg',
};

/**
 * Skeleton — компонент-заглушка для состояния загрузки
 *
 * Используется для показа "скелета" контента пока данные загружаются.
 * Это улучшает UX, так как пользователь видит структуру контента.
 *
 * @example
 * // Скелетон для текста
 * <Skeleton width={200} />
 *
 * @example
 * // Круглый скелетон для аватара
 * <Skeleton variant="circular" width={48} height={48} />
 *
 * @example
 * // Несколько строк текста
 * <Skeleton count={3} width="100%" />
 *
 * @example
 * // Прямоугольник для изображения
 * <Skeleton variant="rectangular" width="100%" height={200} />
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  rounded = true,
  className,
  count = 1,
}: SkeletonProps) {
  /**
   * Преобразуем числовые значения в пиксели
   */
  const getSize = (value: string | number | undefined): string | undefined => {
    if (value === undefined) return undefined;
    return typeof value === 'number' ? `${value}px` : value;
  };

  /**
   * Определяем высоту по умолчанию для текстового варианта
   */
  const defaultHeight = variant === 'text' ? '1em' : undefined;

  /**
   * Для circular ширина = высота
   */
  const computedHeight = variant === 'circular' ? width : height;

  const style = {
    width: getSize(width),
    height: getSize(computedHeight ?? defaultHeight),
  };

  /**
   * Рендерим один элемент скелетона
   */
  const renderSkeleton = (key?: number) => (
    <div
      key={key}
      className={cn(
        // Базовые стили
        'animate-pulse bg-dark-200 dark:bg-dark-700',
        // Вариант формы
        variantStyles[variant],
        // Для rectangular с опцией rounded
        variant === 'rectangular' && !rounded && 'rounded-none',
        // Пользовательские классы
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );

  // Если count > 1, рендерим массив скелетонов
  if (count > 1) {
    return (
      <div className="flex flex-col gap-2">
        {[...Array(count)].map((_, index) => renderSkeleton(index))}
      </div>
    );
  }

  return renderSkeleton();
}

/**
 * Предустановленные комбинации скелетонов
 */

/**
 * Скелетон для карточки с данными
 */
export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={20} />
          <Skeleton width="40%" height={16} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton width="100%" height={16} />
        <Skeleton width="80%" height={16} />
      </div>
    </div>
  );
}

/**
 * Скелетон для строки таблицы
 */
export function SkeletonTableRow({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-3">
      {[...Array(columns)].map((_, index) => (
        <Skeleton
          key={index}
          width={index === 0 ? 120 : '100%'}
          height={16}
        />
      ))}
    </div>
  );
}

/**
 * Скелетон для статистики/метрики
 */
export function SkeletonMetric() {
  return (
    <div className="space-y-2">
      <Skeleton width={80} height={14} />
      <Skeleton width={120} height={32} />
      <Skeleton width={60} height={14} />
    </div>
  );
}

Skeleton.displayName = 'Skeleton';
