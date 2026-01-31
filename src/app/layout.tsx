import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider, ThemeProvider } from '@/lib/providers';
import { I18nProvider } from '@/lib/i18n';
import { Header } from '@/components/layout';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Crypto Dashboard | Portfolio Tracker',
  description:
    'Track your cryptocurrency portfolio with real-time prices, charts, and analytics',
  keywords: ['crypto', 'bitcoin', 'portfolio', 'tracker', 'dashboard'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="system">
          <I18nProvider>
            <QueryProvider>
              <div className="min-h-screen bg-dark-50 dark:bg-dark-900">
                <Header />
                {children}
              </div>
            </QueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}