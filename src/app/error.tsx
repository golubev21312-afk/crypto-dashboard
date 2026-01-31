'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error — страница ошибки на уровне роута
 * 
 * Next.js автоматически показывает этот компонент
 * при возникновении ошибки в странице или её дочерних компонентах.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Логирование ошибки
    console.error('Page error:', error);
  }, [error]);

  return (
    <main className="container-app flex min-h-[60vh] flex-col items-center justify-center py-8">
      <div className="text-center">
        <div className="mb-4 text-6xl">😵</div>
        <h1 className="mb-2 text-2xl font-bold text-dark-900 dark:text-dark-50">
          Oops! Something went wrong
        </h1>
        <p className="mb-6 text-dark-500 dark:text-dark-400">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => (window.location.href = '/')}>
            Go Home
          </Button>
        </div>
      </div>
    </main>
  );
}
