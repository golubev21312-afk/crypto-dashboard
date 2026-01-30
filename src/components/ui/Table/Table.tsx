'use client';

import { cn } from '@/lib/utils';
import type {
  TableProps,
  TableColumn,
  SortDirection,
  TableAlign,
} from './Table.types';

/**
 * Иконка сортировки
 */
function SortIcon({
  direction,
  className,
}: {
  direction: SortDirection;
  className?: string;
}) {
  return (
    <svg
      className={cn('h-4 w-4', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {direction === 'asc' ? (
        // Стрелка вверх
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15l7-7 7 7"
        />
      ) : direction === 'desc' ? (
        // Стрелка вниз
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      ) : (
        // Обе стрелки (неактивная сортировка)
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 9l4-4 4 4M16 15l-4 4-4-4"
        />
      )}
    </svg>
  );
}

/**
 * Стили выравнивания
 */
const alignStyles: Record<TableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/**
 * Скелетон для загрузки
 */
function TableSkeleton({ columns }: { columns: number }) {
  return (
    <>
      {[...Array(5)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-3">
              <div className="h-4 animate-pulse rounded bg-dark-200 dark:bg-dark-700" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/**
 * Table — компонент таблицы
 *
 * Особенности:
 * - Типизированные колонки и данные
 * - Сортировка по колонкам
 * - Состояние загрузки со скелетоном
 * - Кастомизируемое пустое состояние
 * - Sticky заголовок
 * - Кликабельные строки
 *
 * @example
 * // Базовое использование
 * const columns: TableColumn<User>[] = [
 *   { id: 'name', header: 'Name', accessor: (row) => row.name },
 *   { id: 'email', header: 'Email', accessor: (row) => row.email },
 * ];
 *
 * <Table
 *   columns={columns}
 *   data={users}
 *   getRowKey={(row) => row.id}
 * />
 *
 * @example
 * // С сортировкой
 * const [sortColumn, setSortColumn] = useState('name');
 * const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
 *
 * <Table
 *   columns={columns}
 *   data={sortedData}
 *   getRowKey={(row) => row.id}
 *   sortColumn={sortColumn}
 *   sortDirection={sortDirection}
 *   onSort={(col, dir) => {
 *     setSortColumn(col);
 *     setSortDirection(dir);
 *   }}
 * />
 */
export function Table<T>({
  columns,
  data,
  getRowKey,
  isLoading = false,
  emptyMessage = 'No data available',
  emptyState,
  sortColumn,
  sortDirection,
  onSort,
  onRowClick,
  stickyHeader = false,
  className,
}: TableProps<T>) {
  /**
   * Обработчик клика на заголовок колонки для сортировки
   */
  const handleSort = (column: TableColumn<T>) => {
    // Если колонка не сортируемая, ничего не делаем
    if (!column.sortValue || !onSort) return;

    let newDirection: SortDirection;

    if (sortColumn !== column.id) {
      // Новая колонка — сортируем по возрастанию
      newDirection = 'asc';
    } else if (sortDirection === 'asc') {
      // Была asc — меняем на desc
      newDirection = 'desc';
    } else if (sortDirection === 'desc') {
      // Была desc — убираем сортировку
      newDirection = null;
    } else {
      // Не было сортировки — сортируем по возрастанию
      newDirection = 'asc';
    }

    onSort(column.id, newDirection);
  };

  return (
    <div
      className={cn(
        'overflow-auto rounded-lg border border-dark-200',
        'dark:border-dark-700',
        'scrollbar-thin',
        className
      )}
    >
      <table className="w-full border-collapse">
        {/* Заголовок таблицы */}
        <thead
          className={cn(
            'bg-dark-50 dark:bg-dark-800/50',
            stickyHeader && 'sticky top-0 z-10'
          )}
        >
          <tr>
            {columns.map((column) => {
              const isSortable = Boolean(column.sortValue && onSort);
              const isCurrentSort = sortColumn === column.id;

              return (
                <th
                  key={column.id}
                  className={cn(
                    'px-4 py-3 text-sm font-semibold',
                    'text-dark-600 dark:text-dark-300',
                    'border-b border-dark-200 dark:border-dark-700',
                    alignStyles[column.align || 'left'],
                    isSortable && 'cursor-pointer select-none hover:bg-dark-100 dark:hover:bg-dark-700/50'
                  )}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                  }}
                  onClick={() => handleSort(column)}
                >
                  <div
                    className={cn(
                      'flex items-center gap-1',
                      column.align === 'right' && 'justify-end',
                      column.align === 'center' && 'justify-center'
                    )}
                  >
                    {column.header}
                    {isSortable && (
                      <SortIcon
                        direction={isCurrentSort ? sortDirection : null}
                        className={cn(
                          isCurrentSort
                            ? 'text-primary-500'
                            : 'text-dark-400'
                        )}
                      />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Тело таблицы */}
        <tbody className="bg-white dark:bg-dark-800">
          {/* Состояние загрузки */}
          {isLoading && <TableSkeleton columns={columns.length} />}

          {/* Данные */}
          {!isLoading &&
            data.map((row) => (
              <tr
                key={getRowKey(row)}
                className={cn(
                  'border-b border-dark-100 last:border-b-0',
                  'dark:border-dark-700',
                  'transition-colors duration-150',
                  onRowClick && [
                    'cursor-pointer',
                    'hover:bg-dark-50 dark:hover:bg-dark-700/50',
                  ]
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      'px-4 py-3 text-sm',
                      'text-dark-700 dark:text-dark-300',
                      alignStyles[column.align || 'left']
                    )}
                    style={{
                      width: column.width,
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}

          {/* Пустое состояние */}
          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center">
                {emptyState || (
                  <div className="text-dark-500 dark:text-dark-400">
                    {emptyMessage}
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = 'Table';
