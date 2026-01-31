import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/use-local-storage';

/**
 * Тесты для useLocalStorage
 * Tests for useLocalStorage
 */
describe('useLocalStorage', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  /**
   * Возвращает начальное значение если ключа нет
   * Returns initial value if key doesn't exist
   */
  it('returns initial value when key does not exist', () => {
    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'defaultValue')
    );

    expect(result.current[0]).toBe('defaultValue');
  });

  /**
   * Возвращает сохранённое значение
   * Returns stored value
   */
  it('returns stored value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));

    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'defaultValue')
    );

    // После гидратации вернёт сохранённое значение
    // After hydration returns stored value
    expect(result.current[0]).toBe('storedValue');
  });

  /**
   * Сохраняет значение в localStorage
   * Saves value to localStorage
   */
  it('saves value to localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'initial')
    );

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(JSON.parse(localStorage.getItem('testKey') || '')).toBe('newValue');
  });

  /**
   * Поддерживает функцию обновления
   * Supports updater function
   */
  it('supports updater function', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1]((prev) => prev + 5);
    });

    expect(result.current[0]).toBe(6);
  });

  /**
   * Удаляет значение
   * Removes value
   */
  it('removes value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('value'));

    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'default')
    );

    act(() => {
      result.current[2](); // removeValue
    });

    expect(result.current[0]).toBe('default');
    expect(localStorage.getItem('testKey')).toBeNull();
  });

  /**
   * Работает с объектами
   * Works with objects
   */
  it('works with objects', () => {
    const initialObj = { name: 'John', age: 30 };

    const { result } = renderHook(() =>
      useLocalStorage('user', initialObj)
    );

    expect(result.current[0]).toEqual(initialObj);

    const newObj = { name: 'Jane', age: 25 };
    act(() => {
      result.current[1](newObj);
    });

    expect(result.current[0]).toEqual(newObj);
    expect(JSON.parse(localStorage.getItem('user') || '{}')).toEqual(newObj);
  });

  /**
   * Работает с массивами
   * Works with arrays
   */
  it('works with arrays', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string[]>('items', [])
    );

    act(() => {
      result.current[1](['a', 'b', 'c']);
    });

    expect(result.current[0]).toEqual(['a', 'b', 'c']);
  });

  /**
   * Обрабатывает невалидный JSON
   * Handles invalid JSON
   */
  it('handles invalid JSON in localStorage', () => {
    localStorage.setItem('badKey', 'not valid json');

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const { result } = renderHook(() =>
      useLocalStorage('badKey', 'default')
    );

    // Должен вернуть дефолтное значение
    // Should return default value
    expect(result.current[0]).toBe('default');

    consoleSpy.mockRestore();
  });
});
