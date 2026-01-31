'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Button } from '@/components/ui';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — перехват ошибок в дочерних компонентах
 * 
 * Предотвращает "белый экран смерти" при ошибках.
 * Показывает понятное сообщение и кнопку перезагрузки.
 * 
 * @example
 * <ErrorBoundary>
 *   <RiskyComponent />
 * </ErrorBoundary>
 * 
 * @example
 * // С кастомным fallback
 * <ErrorBoundary fallback={<CustomError />}>
 *   <RiskyComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логирование ошибки (можно отправить в сервис мониторинга)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Кастомный fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Дефолтный UI ошибки
      return (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-danger-200 bg-danger-50 p-8 dark:border-danger-800 dark:bg-danger-950">
          <div className="mb-4 text-4xl">😵</div>
          <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-400">
            Something went wrong
          </h2>
          <p className="mb-4 text-sm text-danger-600 dark:text-danger-500">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button onClick={this.handleReset} variant="outline">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
