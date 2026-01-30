import { type ReactNode } from 'react';

/**
 * Направление сортировки
 */
export type SortDirection = 'asc' | 'desc' | null;

/**
 * Выравнивание содержимого ячейки
 */
export type TableAlign = 'left' | 'center' | 'right';

/**
 * Определение колонки таблицы
 *
 * @template T - Тип данных строки
 */
export interface TableColumn<T> {
  /** Уникальный идентификатор колонки */
  id: string;

  /** Заголовок колонки */
  header: string;

  /**
   * Функция для получения значения ячейки
   * Может возвращать примитив или ReactNode для кастомного рендеринга
   */
  accessor: (row: T) => ReactNode;

  /**
   * Функция для получения значения для сортировки
   * Если не указана, колонка не сортируется
   */
  sortValue?: (row: T) => string | number;

  /** Выравнивание содержимого */
  align?: TableAlign;

  /** Ширина колонки (CSS значение) */
  width?: string;

  /** Минимальная ширина колонки */
  minWidth?: string;
}

/**
 * Props для компонента Table
 *
 * @template T - Тип данных строки
 */
export interface TableProps<T> {
  /** Определения колонок */
  columns: TableColumn<T>[];

  /** Данные для отображения */
  data: T[];

  /** Функция для получения уникального ключа строки */
  getRowKey: (row: T) => string;

  /** Состояние загрузки */
  isLoading?: boolean;

  /** Сообщение при пустых данных */
  emptyMessage?: string;

  /** Компонент для отображения при пустых данных */
  emptyState?: ReactNode;

  /** ID колонки для сортировки */
  sortColumn?: string;

  /** Направление сортировки */
  sortDirection?: SortDirection;

  /** Callback при изменении сортировки */
  onSort?: (columnId: string, direction: SortDirection) => void;

  /** Callback при клике на строку */
  onRowClick?: (row: T) => void;

  /** Sticky заголовок при скролле */
  stickyHeader?: boolean;

  /** Дополнительные классы для обертки */
  className?: string;
}
