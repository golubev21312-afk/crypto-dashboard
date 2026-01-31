import { useState, useEffect, useCallback } from 'react';

/**
 * useLocalStorage — хук для работы с localStorage
 * 
 * Особенности:
 * - Типизированное значение
 * - Автоматическая сериализация/десериализация JSON
 * - SSR-безопасность (работает после гидратации)
 * - Синхронизация между вкладками
 * 
 * ---
 * 
 * useLocalStorage — hook for localStorage operations
 * 
 * Features:
 * - Typed value
 * - Automatic JSON serialization/deserialization
 * - SSR-safe (works after hydration)
 * - Cross-tab synchronization
 * 
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * const [user, setUser] = useLocalStorage<User | null>('user', null);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Состояние / State
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  // Загрузка из localStorage после монтирования
  // Load from localStorage after mount
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    setIsHydrated(true);
  }, [key]);

  // Синхронизация между вкладками
  // Cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          // Игнорируем ошибки парсинга
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  /**
   * Установка значения / Set value
   */
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  /**
   * Удаление значения / Remove value
   */
  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // До гидратации возвращаем начальное значение
  // Return initial value before hydration
  return [isHydrated ? storedValue : initialValue, setValue, removeValue];
}
