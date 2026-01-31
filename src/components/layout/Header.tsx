'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/providers';
import { useI18n, locales, localeNames, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Иконка солнца
 */
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

/**
 * Иконка луны
 */
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

/**
 * Header — навигация приложения
 */
export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { t, locale, setLocale } = useI18n();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { href: '/', label: t('nav.dashboard') },
    { href: '/coins', label: t('nav.coins') },
    { href: '/portfolio', label: t('nav.portfolio') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-dark-200 bg-white/80 backdrop-blur-md dark:border-dark-700 dark:bg-dark-900/80">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between">
          {/* Лого */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <span className="text-lg font-bold">C</span>
            </div>
            <span className="text-lg font-semibold text-dark-900 dark:text-dark-50">
              CryptoDash
            </span>
          </Link>

          {/* Навигация */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-dark-600 hover:bg-dark-100 hover:text-dark-900 dark:text-dark-400 dark:hover:bg-dark-800 dark:hover:text-dark-50'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-2">
            {/* Переключатель языка */}
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className={cn(
                'rounded-lg border border-dark-200 bg-white px-2 py-1.5 text-sm',
                'dark:border-dark-700 dark:bg-dark-800',
                'focus:outline-none focus:ring-2 focus:ring-primary-500'
              )}
            >
              {locales.map((loc) => (
                <option key={loc} value={loc}>
                  {localeNames[loc]}
                </option>
              ))}
            </select>

            {/* Переключатель темы */}
            <button
              onClick={toggleTheme}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg',
                'text-dark-500 transition-colors',
                'hover:bg-dark-100 hover:text-dark-900',
                'dark:text-dark-400 dark:hover:bg-dark-800 dark:hover:text-dark-50'
              )}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Мобильное меню */}
            <div className="md:hidden">
              <select
                value={pathname}
                onChange={(e) => {
                  window.location.href = e.target.value;
                }}
                className="rounded-lg border border-dark-200 bg-white px-3 py-2 text-sm dark:border-dark-700 dark:bg-dark-800"
              >
                {navLinks.map((link) => (
                  <option key={link.href} value={link.href}>
                    {link.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
