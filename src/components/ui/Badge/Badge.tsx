import { cn } from '@/lib/utils';
import type { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types';

/**
 * Стили для каждого варианта
 * Используем мягкие цвета для фона и насыщенные для текста
 */
const variantStyles: Record<BadgeVariant, string> = {
  default: `
    bg-dark-100 text-dark-700
    dark:bg-dark-700 dark:text-dark-300
  `,
  primary: `
    bg-primary-100 text-primary-700
    dark:bg-primary-900/30 dark:text-primary-400
  `,
  success: `
    bg-success-100 text-success-600
    dark:bg-success-900/30 dark:text-success-400
  `,
  danger: `
    bg-danger-100 text-danger-600
    dark:bg-danger-900/30 dark:text-danger-400
  `,
  warning: `
    bg-amber-100 text-amber-700
    dark:bg-amber-900/30 dark:text-amber-400
  `,
};

/**
 * Стили для каждого размера
 */
const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

/**
 * Badge — компонент метки/бейджа
 *
 * Используется для отображения:
 * - Статусов (активный, неактивный)
 * - Категорий
 * - Меток (новое, популярное)
 * - Изменений цены (+5%, -3%)
 *
 * @example
 * // Базовое использование
 * <Badge>New</Badge>
 *
 * @example
 * // Для отображения прибыли
 * <Badge variant="success">+5.2%</Badge>
 *
 * @example
 * // Для отображения убытка
 * <Badge variant="danger">-3.1%</Badge>
 *
 * @example
 * // С иконкой
 * <Badge variant="warning" leftIcon={<AlertIcon />}>
 *   Pending
 * </Badge>
 */
export function Badge({
  variant = 'default',
  size = 'md',
  leftIcon,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Базовые стили
        'inline-flex items-center gap-1 rounded-full font-medium',
        // Вариант и размер
        variantStyles[variant],
        sizeStyles[size],
        // Пользовательские классы
        className
      )}
    >
      {/* Иконка */}
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}

      {/* Текст */}
      {children}
    </span>
  );
}

/**
 * Специализированный Badge для отображения изменения цены
 * Автоматически выбирает цвет на основе значения
 */
export function PriceChangeBadge({
  value,
  size = 'md',
  className,
}: {
  value: number;
  size?: BadgeSize;
  className?: string;
}) {
  const variant: BadgeVariant =
    value > 0 ? 'success' : value < 0 ? 'danger' : 'default';

  const sign = value > 0 ? '+' : '';
  const displayValue = `${sign}${value.toFixed(2)}%`;

  return (
    <Badge variant={variant} size={size} className={className}>
      {displayValue}
    </Badge>
  );
}

Badge.displayName = 'Badge';
PriceChangeBadge.displayName = 'PriceChangeBadge';
