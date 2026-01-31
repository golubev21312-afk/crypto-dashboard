import { useState, useEffect } from 'react';

/**
 * useMediaQuery — хук для отслеживания media queries
 * 
 * Позволяет реагировать на изменение размера экрана
 * и условно рендерить компоненты.
 * 
 * ---
 * 
 * useMediaQuery — hook for tracking media queries
 * 
 * Allows reacting to screen size changes
 * and conditionally rendering components.
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 * 
 * return isMobile ? <MobileNav /> : <DesktopNav />;
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Проверяем поддержку matchMedia
    // Check matchMedia support
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Устанавливаем начальное значение
    // Set initial value
    setMatches(mediaQuery.matches);

    // Обработчик изменений
    // Change handler
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Подписываемся на изменения
    // Subscribe to changes
    mediaQuery.addEventListener('change', handler);

    // Отписываемся при unmount
    // Unsubscribe on unmount
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/**
 * Предустановленные breakpoints (соответствуют Tailwind)
 * Preset breakpoints (match Tailwind)
 */
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const;

/**
 * useBreakpoint — упрощённый хук для Tailwind breakpoints
 * 
 * ---
 * 
 * useBreakpoint — simplified hook for Tailwind breakpoints
 * 
 * @example
 * const isDesktop = useBreakpoint('lg');
 */
export function useBreakpoint(
  breakpoint: keyof typeof breakpoints
): boolean {
  return useMediaQuery(breakpoints[breakpoint]);
}
