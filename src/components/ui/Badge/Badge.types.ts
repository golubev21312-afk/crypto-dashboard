import { type ReactNode } from 'react';

/**
 * Варианты цвета Badge
 *
 * - default: нейтральный серый
 * - primary: основной цвет бренда
 * - success: зелёный (прибыль, успех)
 * - danger: красный (убыток, ошибка)
 * - warning: жёлтый (предупреждение)
 */
export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning';

/**
 * Размеры Badge
 *
 * - sm: маленький
 * - md: средний
 * - lg: большой
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Props для компонента Badge
 */
export interface BadgeProps {
  /** Цветовой вариант */
  variant?: BadgeVariant;

  /** Размер */
  size?: BadgeSize;

  /** Иконка слева */
  leftIcon?: ReactNode;

  /** Содержимое */
  children: ReactNode;

  /** Дополнительные классы */
  className?: string;
}
