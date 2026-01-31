import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

/**
 * StatCard — карточка со статистикой
 */
export function StatCard({
  title,
  value,
  change,
  icon,
  isLoading,
  className,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          'rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800',
          className
        )}
      >
        <Skeleton width={100} height={16} />
        <Skeleton width={150} height={32} className="mt-2" />
        <Skeleton width={80} height={16} className="mt-2" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-dark-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-800',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-dark-500 dark:text-dark-400">
          {title}
        </span>
        {icon && (
          <span className="text-dark-400 dark:text-dark-500">{icon}</span>
        )}
      </div>

      <p className="mt-2 text-2xl font-bold text-dark-900 dark:text-dark-50">
        {value}
      </p>

      {change !== undefined && (
        <p
          className={cn(
            'mt-1 text-sm font-medium',
            change >= 0 ? 'text-success-500' : 'text-danger-500'
          )}
        >
          {change >= 0 ? '+' : ''}
          {change.toFixed(2)}%
        </p>
      )}
    </div>
  );
}
