import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider, ThemeProvider } from '@/lib/providers';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
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
          <QueryProvider>
            <div className="min-h-screen bg-dark-50 dark:bg-dark-900">
              {children}
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
