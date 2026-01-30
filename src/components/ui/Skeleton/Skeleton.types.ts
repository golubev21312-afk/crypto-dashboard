/**
 * Варианты формы скелетона
 *
 * - text: прямоугольник для текста
 * - circular: круг (для аватаров)
 * - rectangular: прямоугольник (для изображений)
 */
export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

/**
 * Props для компонента Skeleton
 */
export interface SkeletonProps {
  /** Вариант формы */
  variant?: SkeletonVariant;

  /** Ширина (CSS значение) */
  width?: string | number;

  /** Высота (CSS значение) */
  height?: string | number;

  /** Скругление углов (для rectangular) */
  rounded?: boolean;

  /** Дополнительные классы */
  className?: string;

  /** Количество повторений (для списков) */
  count?: number;
}
