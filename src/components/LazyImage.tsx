'use client';

import { useState, useEffect, useRef } from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  fallback?: React.ReactNode;
}

/**
 * LazyImage — компонент для ленивой загрузки изображений
 * 
 * Использует Intersection Observer для загрузки изображений
 * только когда они попадают в viewport. Показывает плейсхолдер
 * до загрузки.
 * 
 * ---
 * 
 * LazyImage — component for lazy loading images
 * 
 * Uses Intersection Observer to load images only when they
 * enter the viewport. Shows placeholder until loaded.
 * 
 * @example
 * <LazyImage
 *   src="/coin.png"
 *   alt="Bitcoin"
 *   width={32}
 *   height={32}
 * />
 */
export function LazyImage({
  src,
  alt,
  className,
  fallback,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer для определения видимости
  // Intersection Observer for visibility detection
  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Начинаем загрузку чуть раньше / Start loading slightly earlier
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Плейсхолдер / Placeholder
  const placeholder = fallback || (
    <div
      className={cn(
        'animate-pulse bg-dark-200 dark:bg-dark-700',
        className
      )}
      style={{
        width: props.width,
        height: props.height,
      }}
    />
  );

  // Ошибка загрузки / Load error
  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-dark-100 text-dark-400 dark:bg-dark-800',
          className
        )}
        style={{
          width: props.width,
          height: props.height,
        }}
      >
        <span className="text-xs">!</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className="relative">
      {/* Плейсхолдер показывается до загрузки */}
      {/* Placeholder shown until loaded */}
      {!isLoaded && placeholder}

      {/* Изображение загружается только когда в viewport */}
      {/* Image loads only when in viewport */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          {...props}
        />
      )}
    </div>
  );
}
