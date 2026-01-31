import {
  formatCurrency,
  formatCrypto,
  formatPercentage,
  formatCompact,
  formatRelativeTime,
} from '@/lib/utils';

/**
 * Дополнительные тесты для format утилит
 * Additional tests for format utilities
 */
describe('Format Utilities - Extended', () => {
  describe('formatCurrency', () => {
    /**
     * Форматирует большие числа
     * Formats large numbers
     */
    it('formats large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
      expect(formatCurrency(42500.99)).toBe('$42,500.99');
    });

    /**
     * Форматирует маленькие числа
     * Formats small numbers
     */
    it('formats small numbers', () => {
      expect(formatCurrency(0.99)).toBe('$0.99');
      expect(formatCurrency(0.01)).toBe('$0.01');
    });

    /**
     * Форматирует ноль
     * Formats zero
     */
    it('formats zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    /**
     * Использует разные локали
     * Uses different locales
     */
    it('uses different locales', () => {
      expect(formatCurrency(1000, 'EUR', 'de-DE')).toContain('€');
    });
  });

  describe('formatCrypto', () => {
    /**
     * Форматирует целые числа (с десятичными)
     * Formats whole numbers (with decimals)
     */
    it('formats whole numbers', () => {
      // Функция возвращает с десятичными знаками
      // Function returns with decimal places
      expect(formatCrypto(1)).toBe('1.00');
      expect(formatCrypto(100)).toBe('100.00');
    });

    /**
     * Форматирует дробные числа
     * Formats fractional numbers
     */
    it('formats fractional numbers', () => {
      expect(formatCrypto(0.00012345)).toBe('0.00012345');
      expect(formatCrypto(1.5)).toBe('1.50');
    });

    /**
     * Сохраняет формат с нулями
     * Keeps format with zeros
     */
    it('keeps decimal format', () => {
      expect(formatCrypto(1.0)).toBe('1.00');
      expect(formatCrypto(1.5)).toBe('1.50');
    });
  });

  describe('formatPercentage', () => {
    /**
     * Форматирует положительные проценты
     * Formats positive percentages
     */
    it('formats positive percentages', () => {
      expect(formatPercentage(5.5)).toBe('+5.50%');
      expect(formatPercentage(100)).toBe('+100.00%');
    });

    /**
     * Форматирует отрицательные проценты
     * Formats negative percentages
     */
    it('formats negative percentages', () => {
      expect(formatPercentage(-3.14)).toBe('-3.14%');
      expect(formatPercentage(-0.5)).toBe('-0.50%');
    });

    /**
     * Форматирует ноль
     * Formats zero
     */
    it('formats zero', () => {
      expect(formatPercentage(0)).toBe('+0.00%');
    });
  });

  describe('formatCompact', () => {
    /**
     * Форматирует тысячи (без знака $)
     * Formats thousands (without $ sign)
     */
    it('formats thousands', () => {
      // Функция возвращает без знака валюты
      // Function returns without currency sign
      expect(formatCompact(1500)).toBe('1.5K');
      expect(formatCompact(9999)).toBe('10K');
    });

    /**
     * Форматирует миллионы
     * Formats millions
     */
    it('formats millions', () => {
      expect(formatCompact(1000000)).toBe('1M');
      expect(formatCompact(2500000)).toBe('2.5M');
    });

    /**
     * Форматирует миллиарды
     * Formats billions
     */
    it('formats billions', () => {
      expect(formatCompact(1000000000)).toBe('1B');
      expect(formatCompact(42000000000)).toBe('42B');
    });

    /**
     * Форматирует триллионы
     * Formats trillions
     */
    it('formats trillions', () => {
      expect(formatCompact(1000000000000)).toBe('1T');
    });

    /**
     * Не сокращает маленькие числа
     * Does not abbreviate small numbers
     */
    it('does not abbreviate small numbers', () => {
      expect(formatCompact(500)).toBe('500');
      expect(formatCompact(999)).toBe('999');
    });
  });

  describe('formatRelativeTime', () => {
    /**
     * Форматирует секунды назад
     * Formats seconds ago
     */
    it('formats seconds ago', () => {
      const now = new Date();
      const thirtySecondsAgo = new Date(now.getTime() - 30000);

      expect(formatRelativeTime(thirtySecondsAgo)).toBe('just now');
    });

    /**
     * Форматирует минуты назад (короткий формат)
     * Formats minutes ago (short format)
     */
    it('formats minutes ago', () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000);

      // Функция использует короткий формат
      // Function uses short format
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5m ago');
    });

    /**
     * Форматирует часы назад (короткий формат)
     * Formats hours ago (short format)
     */
    it('formats hours ago', () => {
      const now = new Date();
      const twoHoursAgo = new Date(now.getTime() - 2 * 3600000);

      expect(formatRelativeTime(twoHoursAgo)).toBe('2h ago');
    });

    /**
     * Форматирует дни назад (короткий формат)
     * Formats days ago (short format)
     */
    it('formats days ago', () => {
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 86400000);

      expect(formatRelativeTime(threeDaysAgo)).toBe('3d ago');
    });

    /**
     * Принимает строку даты
     * Accepts date string
     */
    it('accepts date string', () => {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 3600000).toISOString();

      expect(formatRelativeTime(oneHourAgo)).toBe('1h ago');
    });
  });
});