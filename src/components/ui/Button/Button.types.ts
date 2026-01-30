import { type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Варианты внешнего вида кнопки
 *
 * - primary: основное действие (яркий фон, белый текст)
 * - secondary: вторичное действие (серый фон)
 * - outline: контурная кнопка (прозрачный фон, рамка)
 * - ghost: минималистичная (только текст, без фона)
 * - danger: опасное действие (красный цвет)
 * - success: подтверждение (зелёный цвет)
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success';

/**
 * Размеры кнопки
 *
 * - sm: компактная (32px высота)
 * - md: стандартная (40px высота)
 * - lg: большая (48px высота)
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props для компонента Button
 * Наследуем все стандартные HTML атрибуты кнопки
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Вариант стиля кнопки */
  variant?: ButtonVariant;

  /** Размер кнопки */
  size?: ButtonSize;

  /** Состояние загрузки — показывает спиннер */
  isLoading?: boolean;

  /** Занять всю ширину контейнера */
  fullWidth?: boolean;

  /** Иконка слева от текста */
  leftIcon?: ReactNode;

  /** Иконка справа от текста */
  rightIcon?: ReactNode;

  /** Содержимое кнопки */
  children: ReactNode;
}
