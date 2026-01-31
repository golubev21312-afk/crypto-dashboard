import { SpinnerContainer } from '@/components/ui';

/**
 * Loading — глобальный индикатор загрузки страницы
 * 
 * Next.js автоматически показывает этот компонент
 * во время загрузки страницы или при использовании Suspense.
 */
export default function Loading() {
  return <SpinnerContainer size="lg" label="Loading..." />;
}
