import {
  formatCurrency,
  formatCrypto,
  formatPercentage,
  formatCompact,
} from '@/lib/utils/format';

describe('format utilities', () => {
  describe('formatCurrency', () => {
    it('should format USD correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('should handle different currencies', () => {
      expect(formatCurrency(1234.56, 'EUR', 'de-DE')).toContain('1.234,56');
    });
  });

  describe('formatCrypto', () => {
    it('should format crypto amounts', () => {
      expect(formatCrypto(1.5)).toBe('1.50');
      expect(formatCrypto(0.00001234)).toBe('0.00001234');
    });

    it('should append symbol when provided', () => {
      expect(formatCrypto(1.5, 'BTC')).toBe('1.50 BTC');
      expect(formatCrypto(100, 'ETH')).toBe('100.00 ETH');
    });
  });

  describe('formatPercentage', () => {
    it('should format positive percentages with + sign', () => {
      expect(formatPercentage(5.5)).toBe('+5.50%');
      expect(formatPercentage(0.01)).toBe('+0.01%');
    });

    it('should format negative percentages', () => {
      expect(formatPercentage(-3.2)).toBe('-3.20%');
    });

    it('should handle zero', () => {
      expect(formatPercentage(0)).toBe('+0.00%');
    });
  });

  describe('formatCompact', () => {
    it('should abbreviate large numbers', () => {
      expect(formatCompact(1000)).toBe('1K');
      expect(formatCompact(1500000)).toBe('1.5M');
      expect(formatCompact(1000000000)).toBe('1B');
    });

    it('should handle small numbers', () => {
      expect(formatCompact(100)).toBe('100');
      expect(formatCompact(999)).toBe('999');
    });
  });
});
