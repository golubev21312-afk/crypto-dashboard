import { useState, useEffect } from 'react';

/**
 * useDebounce — хук для отложенного обновления значения
 * 
 * Используется для оптимизации поиска: запрос отправляется
 * не при каждом нажатии клавиши, а после паузы в вводе.
 * 
 * @param value - значение для debounce
 * @param delay - задержка в миллисекундах (по умолчанию 300мс)
 * @returns отложенное значение
 * 
 * ---
 * 
 * useDebounce — hook for delayed value updates
 * 
 * Used for search optimization: request is sent not on every
 * keystroke, but after a pause in typing.
 * 
 * @param value - value to debounce
 * @param delay - delay in milliseconds (default 300ms)
 * @returns debounced value
 * 
 * @example
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 300);
 * 
 * // API вызывается только когда пользователь перестал печатать
 * // API is called only when user stops typing
 * useEffect(() => {
 *   if (debouncedSearch) {
 *     fetchResults(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Устанавливаем таймер / Set timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаем при изменении value или unmount
    // Clear on value change or unmount
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
