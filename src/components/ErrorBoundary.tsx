'use client';

import { Component, type ReactNode } from 'react';
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
 * ErrorBoundary — компонент для перехвата ошибок React
 * 
 * Оборачивает дочерние компоненты и показывает fallback UI
 * при возникновении ошибки вместо падения всего приложения.
 * 
 * ---
 * 
 * ErrorBoundary — component for catching React errors
 * 
 * Wraps child components and shows fallback UI
 * when an error occurs instead of crashing the entire app.
 * 
 * @example
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * 
 * @example
 * // С кастомным fallback / With custom fallback
 * <ErrorBoundary fallback={<CustomError />}>
 *   <MyComponent />
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логирование ошибки / Log error
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Кастомный fallback / Custom fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Дефолтный UI ошибки / Default error UI
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <div className="text-center">
            <div className="mb-4 text-6xl">😕</div>
            <h2 className="mb-2 text-xl font-semibold text-dark-900 dark:text-dark-50">
              Something went wrong
            </h2>
            <p className="mb-4 text-dark-500 dark:text-dark-400">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button onClick={this.handleReset}>Try Again</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * withErrorBoundary — HOC для оборачивания компонента в ErrorBoundary
 * 
 * ---
 * 
 * withErrorBoundary — HOC for wrapping component in ErrorBoundary
 * 
 * @example
 * const SafeComponent = withErrorBoundary(MyComponent);
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
