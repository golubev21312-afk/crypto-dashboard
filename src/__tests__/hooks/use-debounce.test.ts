import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/use-debounce';

/**
 * Тесты для useDebounce
 * Tests for useDebounce
 */
describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /**
   * Возвращает начальное значение сразу
   * Returns initial value immediately
   */
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  /**
   * Обновляет значение после задержки
   * Updates value after delay
   */
  it('updates value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    // Меняем значение / Change value
    rerender({ value: 'updated', delay: 500 });

    // До истечения таймера — старое значение
    // Before timer — old value
    expect(result.current).toBe('initial');

    // Пропускаем время / Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // После таймера — новое значение
    // After timer — new value
    expect(result.current).toBe('updated');
  });

  /**
   * Сбрасывает таймер при быстрых изменениях
   * Resets timer on rapid changes
   */
  it('resets timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'b' });
    act(() => jest.advanceTimersByTime(200));

    rerender({ value: 'c' });
    act(() => jest.advanceTimersByTime(200));

    rerender({ value: 'd' });
    act(() => jest.advanceTimersByTime(200));

    // Ещё не прошло 500мс с последнего изменения
    // 500ms hasn't passed since last change
    expect(result.current).toBe('a');

    act(() => jest.advanceTimersByTime(300));

    // Теперь прошло / Now it passed
    expect(result.current).toBe('d');
  });

  /**
   * Работает с разными типами данных
   * Works with different data types
   */
  it('works with different data types', () => {
    // Число / Number
    const { result: numResult } = renderHook(() => useDebounce(42, 100));
    expect(numResult.current).toBe(42);

    // Объект / Object
    const obj = { name: 'test' };
    const { result: objResult } = renderHook(() => useDebounce(obj, 100));
    expect(objResult.current).toEqual({ name: 'test' });

    // null
    const { result: nullResult } = renderHook(() => useDebounce(null, 100));
    expect(nullResult.current).toBeNull();
  });

  /**
   * Использует дефолтную задержку 300мс
   * Uses default delay of 300ms
   */
  it('uses default delay of 300ms', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    act(() => jest.advanceTimersByTime(299));
    expect(result.current).toBe('initial');

    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe('updated');
  });
});
