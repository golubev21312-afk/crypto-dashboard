import { type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * Размеры поля ввода
 *
 * - sm: компактное (32px высота)
 * - md: стандартное (40px высота)
 * - lg: большое (48px высота)
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Props для компонента Input
 * Наследуем все стандартные HTML атрибуты input
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Метка над полем ввода */
  label?: string;

  /** Текст ошибки под полем */
  error?: string;

  /** Вспомогательный текст под полем */
  helperText?: string;

  /** Размер поля */
  size?: InputSize;

  /** Иконка или элемент слева */
  leftElement?: ReactNode;

  /** Иконка или элемент справа */
  rightElement?: ReactNode;

  /** Занять всю ширину контейнера */
  fullWidth?: boolean;
}
