'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import type { InputProps, InputSize } from './Input.types';

/**
 * Стили для каждого размера поля ввода
 */
const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 text-sm px-3',
  md: 'h-10 text-sm px-4',
  lg: 'h-12 text-base px-4',
};

/**
 * Отступы слева при наличии левого элемента
 */
const leftElementPadding: Record<InputSize, string> = {
  sm: 'pl-9',
  md: 'pl-10',
  lg: 'pl-12',
};

/**
 * Отступы справа при наличии правого элемента
 */
const rightElementPadding: Record<InputSize, string> = {
  sm: 'pr-9',
  md: 'pr-10',
  lg: 'pr-12',
};

/**
 * Позиционирование иконок внутри поля
 */
const iconPositionStyles: Record<InputSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

/**
 * Input — компонент поля ввода
 *
 * Особенности:
 * - Метка (label) с автоматической связью через id
 * - Отображение ошибки с красной подсветкой
 * - Вспомогательный текст (helperText)
 * - Иконки/элементы слева и справа
 * - 3 размера (sm, md, lg)
 * - Полная доступность (a11y)
 *
 * @example
 * // Базовое использование
 * <Input placeholder="Enter email" />
 *
 * @example
 * // С меткой и ошибкой
 * <Input
 *   label="Email"
 *   error="Invalid email format"
 *   type="email"
 * />
 *
 * @example
 * // С иконкой
 * <Input
 *   leftElement={<SearchIcon />}
 *   placeholder="Search..."
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      leftElement,
      rightElement,
      fullWidth = false,
      disabled,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    // Генерируем уникальный id если не передан
    // Нужен для связи label с input через htmlFor
    const generatedId = useId();
    const id = providedId || generatedId;

    // Определяем наличие ошибки для стилизации
    const hasError = Boolean(error);

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {/* Метка поля */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium',
              'text-dark-700 dark:text-dark-300',
              disabled && 'opacity-60'
            )}
          >
            {label}
          </label>
        )}

        {/* Контейнер для поля ввода с иконками */}
        <div className="relative">
          {/* Левый элемент (иконка) */}
          {leftElement && (
            <div
              className={cn(
                'absolute left-0 top-0 flex items-center justify-center',
                'text-dark-400 dark:text-dark-500',
                iconPositionStyles[size]
              )}
            >
              {leftElement}
            </div>
          )}

          {/* Поле ввода */}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={cn(
              // Базовые стили
              'w-full rounded-lg border bg-white',
              'text-dark-900 placeholder:text-dark-400',
              'transition-colors duration-200',
              // Темная тема
              'dark:bg-dark-800 dark:text-dark-100',
              'dark:placeholder:text-dark-500',
              // Фокус
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              // Состояние по умолчанию (без ошибки)
              !hasError && [
                'border-dark-300 dark:border-dark-600',
                'hover:border-dark-400 dark:hover:border-dark-500',
                'focus:border-primary-500 focus:ring-primary-500/20',
              ],
              // Состояние с ошибкой
              hasError && [
                'border-danger-500',
                'focus:border-danger-500 focus:ring-danger-500/20',
              ],
              // Disabled
              'disabled:cursor-not-allowed disabled:opacity-60',
              'disabled:bg-dark-100 dark:disabled:bg-dark-900',
              // Размер
              sizeStyles[size],
              // Отступы для иконок
              leftElement && leftElementPadding[size],
              rightElement && rightElementPadding[size],
              // Пользовательские классы
              className
            )}
            {...props}
          />

          {/* Правый элемент (иконка) */}
          {rightElement && (
            <div
              className={cn(
                'absolute right-0 top-0 flex items-center justify-center',
                'text-dark-400 dark:text-dark-500',
                iconPositionStyles[size]
              )}
            >
              {rightElement}
            </div>
          )}
        </div>

        {/* Текст ошибки */}
        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="text-sm text-danger-500"
          >
            {error}
          </p>
        )}

        {/* Вспомогательный текст (показываем только если нет ошибки) */}
        {helperText && !error && (
          <p id={`${id}-helper`} className="text-sm text-dark-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
