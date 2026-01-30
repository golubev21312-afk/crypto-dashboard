'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

/**
 * Стили для каждого варианта кнопки
 * Используем Tailwind классы для консистентного дизайна
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary-600 text-white
    hover:bg-primary-700
    active:bg-primary-800
    focus-visible:ring-primary-500
    disabled:bg-primary-300
  `,
  secondary: `
    bg-dark-100 text-dark-900
    hover:bg-dark-200
    active:bg-dark-300
    focus-visible:ring-dark-400
    disabled:bg-dark-100 disabled:text-dark-400
    dark:bg-dark-700 dark:text-dark-100
    dark:hover:bg-dark-600
    dark:active:bg-dark-500
  `,
  outline: `
    border-2 border-dark-300 bg-transparent text-dark-700
    hover:bg-dark-50 hover:border-dark-400
    active:bg-dark-100
    focus-visible:ring-dark-400
    disabled:border-dark-200 disabled:text-dark-400
    dark:border-dark-600 dark:text-dark-300
    dark:hover:bg-dark-800 dark:hover:border-dark-500
    dark:active:bg-dark-700
  `,
  ghost: `
    bg-transparent text-dark-700
    hover:bg-dark-100
    active:bg-dark-200
    focus-visible:ring-dark-400
    disabled:text-dark-400
    dark:text-dark-300
    dark:hover:bg-dark-800
    dark:active:bg-dark-700
  `,
  danger: `
    bg-danger-500 text-white
    hover:bg-danger-600
    active:bg-danger-700
    focus-visible:ring-danger-500
    disabled:bg-danger-300
  `,
  success: `
    bg-success-500 text-white
    hover:bg-success-600
    active:bg-success-700
    focus-visible:ring-success-500
    disabled:bg-success-300
  `,
};

/**
 * Стили для каждого размера кнопки
 * Включают padding, высоту, размер шрифта и скругление
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
  md: 'h-10 px-4 text-sm rounded-lg gap-2',
  lg: 'h-12 px-6 text-base rounded-lg gap-2',
};

/**
 * Размеры иконки спиннера для каждого размера кнопки
 */
const spinnerSizes: Record<ButtonSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

/**
 * Компонент спиннера для состояния загрузки
 * Использует CSS анимацию вращения
 */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/**
 * Button — универсальный компонент кнопки
 *
 * Особенности:
 * - 6 вариантов стилей (primary, secondary, outline, ghost, danger, success)
 * - 3 размера (sm, md, lg)
 * - Поддержка иконок слева и справа
 * - Состояние загрузки со спиннером
 * - Полная доступность (a11y)
 * - Поддержка forwardRef для работы с DOM
 *
 * @example
 * // Базовое использование
 * <Button>Click me</Button>
 *
 * @example
 * // С вариантом и размером
 * <Button variant="primary" size="lg">
 *   Submit
 * </Button>
 *
 * @example
 * // С иконкой и загрузкой
 * <Button leftIcon={<PlusIcon />} isLoading={isPending}>
 *   Add Item
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Кнопка disabled если явно указано или в состоянии загрузки
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Базовые стили
          'inline-flex items-center justify-center',
          'font-medium',
          'transition-colors duration-200',
          // Фокус для доступности
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          // Состояние disabled
          'disabled:cursor-not-allowed disabled:opacity-60',
          // Вариант и размер
          variantStyles[variant],
          sizeStyles[size],
          // Полная ширина
          fullWidth && 'w-full',
          // Пользовательские классы
          className
        )}
        {...props}
      >
        {/* Спиннер загрузки вместо левой иконки */}
        {isLoading ? (
          <Spinner className={spinnerSizes[size]} />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        {/* Текст кнопки */}
        <span>{children}</span>

        {/* Правая иконка (скрывается при загрузке) */}
        {rightIcon && !isLoading && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

// Имя для React DevTools
Button.displayName = 'Button';
