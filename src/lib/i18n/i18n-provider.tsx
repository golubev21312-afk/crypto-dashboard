'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  translations,
  locales,
  localeNames,
  type Locale,
} from './translations';

const STORAGE_KEY = 'crypto-dashboard-locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

/**
 * Определение языка браузера
 */
function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language.split('-')[0];

  if (locales.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }

  return 'en';
}

interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

/**
 * I18nProvider — провайдер интернационализации
 */
export function I18nProvider({
  children,
  defaultLocale,
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale || 'en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Загрузка сохранённого языка после гидратации
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    const initialLocale = stored || detectBrowserLocale();

    if (locales.includes(initialLocale)) {
      setLocaleState(initialLocale);
    }

    setIsHydrated(true);
  }, []);

  // Смена языка
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  }, []);

  // Функция перевода
  const t = useCallback(
    (key: string): string => {
      return translations[locale][key] || translations['en'][key] || key;
    },
    [locale]
  );

  // Предотвращаем мисматч при гидратации
  // Показываем английский до загрузки сохранённого языка
  const contextValue: I18nContextValue = {
    locale: isHydrated ? locale : 'en',
    setLocale,
    t: isHydrated ? t : (key) => translations['en'][key] || key,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * useI18n — хук для работы с переводами
 *
 * @example
 * const { t, locale, setLocale } = useI18n();
 * <h1>{t('dashboard.title')}</h1>
 */
export function useI18n() {
  const context = useContext(I18nContext);

  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
}

// Реэкспорт для удобства
export { locales, localeNames, type Locale };
