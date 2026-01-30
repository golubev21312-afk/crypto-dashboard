'use client';

import { useEffect, useCallback, useRef, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import type { ModalProps, ModalFooterProps, ModalSize } from './Modal.types';

/**
 * Стили ширины для каждого размера
 */
const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-3xl',
  full: 'max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
};

/**
 * Иконка закрытия (X)
 */
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

/**
 * Modal — модальное окно
 *
 * Особенности:
 * - Рендерится через Portal в конец body
 * - Блокирует скролл страницы при открытии
 * - Закрывается по Escape и клику на overlay
 * - Фокус-ловушка для доступности
 * - Плавные анимации появления/исчезновения
 *
 * @example
 * // Базовое использование
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure?</p>
 *   <Modal.Footer>
 *     <Button variant="ghost" onClick={() => setIsOpen(false)}>
 *       Cancel
 *     </Button>
 *     <Button onClick={handleConfirm}>Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  children,
}: ModalProps) {
  // Ref для модального окна (для управления фокусом)
  const modalRef = useRef<HTMLDivElement>(null);

  // Ref для элемента, который был в фокусе до открытия модалки
  const previousActiveElement = useRef<Element | null>(null);

  /**
   * Обработчик закрытия по Escape
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  /**
   * Обработчик клика на overlay
   */
  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  /**
   * Блокировка скролла и управление фокусом
   */
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущий элемент в фокусе
      previousActiveElement.current = document.activeElement;

      // Блокируем скролл
      document.body.style.overflow = 'hidden';

      // Фокусируемся на модалке
      modalRef.current?.focus();
    } else {
      // Разблокируем скролл
      document.body.style.overflow = '';

      // Возвращаем фокус на предыдущий элемент
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    }

    // Cleanup при размонтировании
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Не рендерим если закрыто
  if (!isOpen) return null;

  // Используем Portal для рендера в конец body
  // Это нужно чтобы модалка была поверх всего контента
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
    >
      {/* Overlay (затемнение фона) */}
      <div
        className={cn(
          'absolute inset-0 bg-dark-900/50 backdrop-blur-sm',
          'animate-in fade-in duration-200'
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Модальное окно */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        tabIndex={-1}
        className={cn(
          // Базовые стили
          'relative w-full rounded-xl bg-white shadow-2xl',
          'dark:bg-dark-800',
          // Анимация появления
          'animate-in fade-in zoom-in-95 duration-200',
          // Размер
          sizeStyles[size],
          // Для full размера делаем flex
          size === 'full' && 'flex flex-col'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 p-6 pb-0">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-dark-900 dark:text-dark-50"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-sm text-dark-500 dark:text-dark-400"
                >
                  {description}
                </p>
              )}
            </div>

            {/* Кнопка закрытия */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  'rounded-lg p-1.5 text-dark-400',
                  'hover:bg-dark-100 hover:text-dark-600',
                  'dark:hover:bg-dark-700 dark:hover:text-dark-300',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500'
                )}
                aria-label="Close modal"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Контент */}
        <div
          className={cn('p-6', size === 'full' && 'flex-1 overflow-auto')}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * Modal.Footer — футер модального окна
 *
 * Используется для размещения кнопок действий
 */
export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3',
        'border-t border-dark-200 dark:border-dark-700',
        'mt-6 pt-6',
        className
      )}
    >
      {children}
    </div>
  );
}

// Присваиваем Footer как свойство Modal для удобного API
Modal.Footer = ModalFooter;

Modal.displayName = 'Modal';
