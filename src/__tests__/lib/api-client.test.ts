import { fetchApi, ApiError, getErrorType, getErrorMessage } from '@/lib/api';

/**
 * Тесты для API клиента
 * Tests for API client
 */

// Мокаем fetch / Mock fetch
global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchApi', () => {
    /**
     * Успешный запрос
     * Successful request
     */
    it('makes successful request', async () => {
      const mockData = { id: 1, name: 'Bitcoin' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchApi('/test');

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    /**
     * Добавляет query параметры
     * Adds query parameters
     */
    it('adds query parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await fetchApi('/test', {
        params: { page: 1, limit: 10 },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=1'),
        expect.any(Object)
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=10'),
        expect.any(Object)
      );
    });

    /**
     * Выбрасывает ApiError при ошибке HTTP
     * Throws ApiError on HTTP error
     */
    it('throws ApiError on HTTP error', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchApi('/test', { retries: 0 })).rejects.toThrow(ApiError);
    });

    /**
     * Retry при ошибке 429
     * Retries on 429 error
     */
    it('retries on 429 error', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: false,
          status: 429,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        });

      const result = await fetchApi('/test', {
        retries: 1,
        retryDelay: 10,
      });

      expect(result).toEqual({ success: true });
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('getErrorType', () => {
    /**
     * Возвращает RATE_LIMIT для 429
     * Returns RATE_LIMIT for 429
     */
    it('returns RATE_LIMIT for 429', () => {
      expect(getErrorType(429)).toBe('RATE_LIMIT');
    });

    /**
     * Возвращает NOT_FOUND для 404
     * Returns NOT_FOUND for 404
     */
    it('returns NOT_FOUND for 404', () => {
      expect(getErrorType(404)).toBe('NOT_FOUND');
    });

    /**
     * Возвращает SERVER_ERROR для 5xx
     * Returns SERVER_ERROR for 5xx
     */
    it('returns SERVER_ERROR for 5xx', () => {
      expect(getErrorType(500)).toBe('SERVER_ERROR');
      expect(getErrorType(502)).toBe('SERVER_ERROR');
      expect(getErrorType(503)).toBe('SERVER_ERROR');
    });

    /**
     * Возвращает UNKNOWN для других кодов
     * Returns UNKNOWN for other codes
     */
    it('returns UNKNOWN for other codes', () => {
      expect(getErrorType(400)).toBe('UNKNOWN');
      expect(getErrorType(401)).toBe('UNKNOWN');
    });
  });

  describe('getErrorMessage', () => {
    /**
     * Возвращает сообщения для всех типов
     * Returns messages for all types
     */
    it('returns messages for all error types', () => {
      expect(getErrorMessage('NETWORK_ERROR')).toContain('internet');
      expect(getErrorMessage('RATE_LIMIT')).toContain('many requests');
      expect(getErrorMessage('NOT_FOUND')).toContain('not found');
      expect(getErrorMessage('SERVER_ERROR')).toContain('Server error');
      expect(getErrorMessage('UNKNOWN')).toContain('unexpected');
    });
  });

  describe('ApiError', () => {
    /**
     * Содержит status и endpoint
     * Contains status and endpoint
     */
    it('contains status and endpoint', () => {
      const error = new ApiError('Test error', 404, '/test');

      expect(error.message).toBe('Test error');
      expect(error.status).toBe(404);
      expect(error.endpoint).toBe('/test');
      expect(error.name).toBe('ApiError');
    });
  });
});
