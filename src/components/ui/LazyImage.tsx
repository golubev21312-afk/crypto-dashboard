'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { useIntersectionObserver } from '@/hooks';
import { cn } from '@/lib/utils';

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  /** Показывать скелетон до загрузки */
  showSkeleton?: boolean;
}

/**
 * LazyImage — изображение с ленивой загрузкой
 * 
 * Загружает изображение только когда оно появляется в viewport.
 * Показывает скелетон во время загрузки.
 * 
 * @example
 * <LazyImage
 *   src={coin.image}
 *   alt={coin.name}
 *   width={32}
 *   height={32}
 * />
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  showSkeleton = true,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    rootMargin: '100px', // Начинаем загрузку за 100px до появления
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
    >
      {/* Скелетон */}
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 animate-pulse rounded-full bg-dark-200 dark:bg-dark-700" />
      )}

      {/* Изображение */}
      {isIntersecting && (
        <Image
          src={src}
          alt={alt}
          width={width as number}
          height={height as number}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
}
