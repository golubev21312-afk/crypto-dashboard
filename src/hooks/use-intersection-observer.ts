import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseIntersectionObserverOptions {
  /** Отступ от края viewport */
  rootMargin?: string;
  /** Порог видимости (0-1) */
  threshold?: number | number[];
  /** Запустить только один раз */
  triggerOnce?: boolean;
}

/**
 * useIntersectionObserver — отслеживание видимости элемента
 * 
 * Используется для:
 * - Ленивой загрузки изображений/контента
 * - Бесконечной прокрутки (infinite scroll)
 * - Анимаций при появлении в viewport
 * 
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.1,
 *   triggerOnce: true
 * });
 * 
 * return (
 *   <div ref={ref}>
 *     {isIntersecting && <ExpensiveComponent />}
 *   </div>
 * );
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): {
  ref: RefObject<T>;
  isIntersecting: boolean;
} {
  const { rootMargin = '0px', threshold = 0, triggerOnce = false } = options;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry?.isIntersecting ?? false;
        setIsIntersecting(isVisible);

        // Если triggerOnce и элемент стал видимым — отключаем наблюдение
        if (triggerOnce && isVisible) {
          observer.unobserve(element);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, triggerOnce]);

  return { ref, isIntersecting };
}
