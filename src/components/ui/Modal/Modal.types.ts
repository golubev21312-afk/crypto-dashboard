import { type ReactNode } from 'react';

/**
 * Размеры модального окна
 *
 * - sm: маленькое (400px)
 * - md: среднее (500px)
 * - lg: большое (600px)
 * - xl: очень большое (800px)
 * - full: на весь экран
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props для компонента Modal
 */
export interface ModalProps {
  /** Состояние открытия модального окна */
  isOpen: boolean;

  /** Callback при закрытии */
  onClose: () => void;

  /** Заголовок модального окна */
  title?: string;

  /** Описание под заголовком */
  description?: string;

  /** Размер модального окна */
  size?: ModalSize;

  /** Закрывать при клике на overlay */
  closeOnOverlayClick?: boolean;

  /** Закрывать при нажатии Escape */
  closeOnEscape?: boolean;

  /** Показывать кнопку закрытия */
  showCloseButton?: boolean;

  /** Содержимое модального окна */
  children: ReactNode;
}

/**
 * Props для футера модального окна
 */
export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}
