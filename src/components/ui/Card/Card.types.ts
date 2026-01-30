import { type HTMLAttributes, type ReactNode } from 'react';

/**
 * Варианты внешнего вида карточки
 *
 * - default: стандартная карточка с тенью
 * - outline: только рамка, без тени
 * - ghost: без рамки и тени, только фон
 * - elevated: усиленная тень для выделения
 */
export type CardVariant = 'default' | 'outline' | 'ghost' | 'elevated';

/**
 * Размеры отступов внутри карточки
 *
 * - none: без отступов
 * - sm: маленькие (16px)
 * - md: средние (24px)
 * - lg: большие (32px)
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Props для основного компонента Card
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Вариант стиля */
  variant?: CardVariant;

  /** Размер внутренних отступов */
  padding?: CardPadding;

  /** Интерактивная карточка (hover эффекты) */
  hoverable?: boolean;

  /** Содержимое карточки */
  children: ReactNode;
}

/**
 * Props для заголовка карточки
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Заголовок */
  title?: string;

  /** Подзаголовок или описание */
  subtitle?: string;

  /** Элемент справа (кнопка, иконка и т.д.) */
  action?: ReactNode;

  /** Содержимое (альтернатива title/subtitle) */
  children?: ReactNode;
}

/**
 * Props для тела карточки
 */
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Props для футера карточки
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
