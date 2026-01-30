import { cn } from '@/lib/utils';
import type { SpinnerProps, SpinnerSize } from './Spinner.types';

/**
 * Стили размеров спиннера
 */
const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

/**
 * Толщина обводки для каждого размера
 */
const strokeWidth: Record<SpinnerSize, number> = {
  sm: 4,
  md: 4,
  lg: 3,
  xl: 3,
};

/**
 * Spinner — индикатор загрузки
 *
 * Используется для показа процесса загрузки данных.
 * Оптимизирован для доступности с aria-атрибутами.
 *
 * @example
 * // Базовое использование
 * <Spinner />
 *
 * @example
 * // Большой спиннер с текстом
 * <Spinner size="lg" showLabel label="Loading data..." />
 *
 * @example
 * // Кастомный цвет
 * <Spinner color="text-success-500" />
 */
export function Spinner({
  size = 'md',
  color = 'text-primary-500',
  label = 'Loading...',
  showLabel = false,
  className,
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('inline-flex flex-col items-center gap-2', className)}
    >
      <svg
        className={cn('animate-spin', sizeStyles[size], color)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Фоновый круг (полупрозрачный) */}
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
        />
        {/* Анимированная дуга */}
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>

      {/* Текст (опционально) */}
      {showLabel && (
        <span className="text-sm text-dark-500 dark:text-dark-400">
          {label}
        </span>
      )}

      {/* Скрытый текст для screen readers (если showLabel=false) */}
      {!showLabel && <span className="sr-only">{label}</span>}
    </div>
  );
}

/**
 * Полноэкранный оверлей со спиннером
 * Используется при загрузке всей страницы
 */
export function SpinnerOverlay({
  label = 'Loading...',
}: {
  label?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-dark-900/80">
      <Spinner size="xl" showLabel label={label} />
    </div>
  );
}

/**
 * Спиннер для размещения в центре контейнера
 */
export function SpinnerContainer({
  size = 'lg',
  label = 'Loading...',
  className,
}: {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-[200px] items-center justify-center',
        className
      )}
    >
      <Spinner size={size} showLabel label={label} />
    </div>
  );
}

Spinner.displayName = 'Spinner';
SpinnerOverlay.displayName = 'SpinnerOverlay';
SpinnerContainer.displayName = 'SpinnerContainer';
