/**
 * Размеры спиннера
 */
export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props для компонента Spinner
 */
export interface SpinnerProps {
  /** Размер спиннера */
  size?: SpinnerSize;

  /** Цвет (Tailwind класс) */
  color?: string;

  /** Текст для screen readers */
  label?: string;

  /** Показывать текст под спиннером */
  showLabel?: boolean;

  /** Дополнительные классы */
  className?: string;
}
