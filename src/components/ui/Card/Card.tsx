import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardVariant,
  CardPadding,
} from './Card.types';

/**
 * Стили для каждого варианта карточки
 */
const variantStyles: Record<CardVariant, string> = {
  default: `
    border border-dark-200 bg-white shadow-sm
    dark:border-dark-700 dark:bg-dark-800
  `,
  outline: `
    border-2 border-dark-200 bg-transparent
    dark:border-dark-700
  `,
  ghost: `
    bg-dark-50
    dark:bg-dark-800/50
  `,
  elevated: `
    border border-dark-100 bg-white shadow-lg
    dark:border-dark-700 dark:bg-dark-800
  `,
};

/**
 * Стили отступов для карточки
 */
const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Card — контейнер для группировки связанного контента
 *
 * Составной компонент с подкомпонентами:
 * - Card.Header — заголовок карточки
 * - Card.Content — основное содержимое
 * - Card.Footer — нижняя часть (кнопки действий)
 *
 * @example
 * // Простая карточка
 * <Card>
 *   <Card.Header title="Statistics" subtitle="Last 24 hours" />
 *   <Card.Content>
 *     <p>Content here</p>
 *   </Card.Content>
 * </Card>
 *
 * @example
 * // Интерактивная карточка
 * <Card variant="elevated" hoverable onClick={handleClick}>
 *   <Card.Content>Click me!</Card.Content>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'none',
      hoverable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Базовые стили
          'rounded-xl',
          'transition-all duration-200',
          // Вариант
          variantStyles[variant],
          // Отступы
          paddingStyles[padding],
          // Hover эффект для интерактивных карточек
          hoverable && [
            'cursor-pointer',
            'hover:shadow-md hover:border-dark-300',
            'dark:hover:border-dark-600',
            'active:scale-[0.99]',
          ],
          // Пользовательские классы
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card.Header — заголовок карточки
 *
 * Можно использовать двумя способами:
 * 1. С props title/subtitle для стандартного вида
 * 2. С children для кастомного контента
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start justify-between gap-4 p-6 pb-0',
          className
        )}
        {...props}
      >
        {/* Используем children если переданы, иначе title/subtitle */}
        {children || (
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-50">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Действие справа (кнопка, меню и т.д.) */}
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card.Content — основное содержимое карточки
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-6', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * Card.Footer — нижняя часть карточки
 *
 * Обычно используется для кнопок действий
 * Имеет верхнюю границу для визуального разделения
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 p-6 pt-0',
          'border-t border-dark-200 dark:border-dark-700',
          'mt-6 pt-6',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
