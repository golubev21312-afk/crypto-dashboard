import Link from 'next/link';
import { Button } from '@/components/ui';

/**
 * NotFound — страница 404
 * 
 * Показывается когда пользователь переходит
 * на несуществующий URL.
 */
export default function NotFound() {
  return (
    <main className="container-app flex min-h-[60vh] flex-col items-center justify-center py-8">
      <div className="text-center">
        <div className="mb-4 text-8xl font-bold text-dark-200 dark:text-dark-700">
          404
        </div>
        <h1 className="mb-2 text-2xl font-bold text-dark-900 dark:text-dark-50">
          Page Not Found
        </h1>
        <p className="mb-6 text-dark-500 dark:text-dark-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </main>
  );
}
