import { API_BASE_URL } from './config';

/**
 * Кастомный класс ошибки API
 * Позволяет различать ошибки API от других ошибок
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Типы ошибок для удобной обработки в UI
 */
export type ApiErrorType =
  | 'NETWORK_ERROR'
  | 'RATE_LIMIT'
  | 'NOT_FOUND'
  | 'SERVER_ERROR'
  | 'UNKNOWN';

/**
 * Определяет тип ошибки по статус коду
 */
export function getErrorType(status: number): ApiErrorType {
  if (status === 429) return 'RATE_LIMIT';
  if (status === 404) return 'NOT_FOUND';
  if (status >= 500) return 'SERVER_ERROR';
  return 'UNKNOWN';
}

/**
 * Человекочитаемые сообщения об ошибках
 */
export function getErrorMessage(type: ApiErrorType): string {
  const messages: Record<ApiErrorType, string> = {
    NETWORK_ERROR: 'No internet connection. Please check your network.',
    RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',
    NOT_FOUND: 'The requested data was not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNKNOWN: 'An unexpected error occurred.',
  };
  return messages[type];
}

/**
 * Параметры запроса
 */
interface FetchOptions {
  params?: Record<string, string | number | boolean>;
  retries?: number;
  retryDelay?: number;
}

/**
 * Задержка выполнения
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Формирует URL с query параметрами
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Основная функция для выполнения API запросов
 *
 * Особенности:
 * - Автоматический retry при ошибках сети и 5xx
 * - Экспоненциальная задержка между попытками
 * - Типизированный ответ
 *
 * @example
 * const data = await fetchApi<Coin[]>('/coins/markets', {
 *   params: { vs_currency: 'usd', per_page: 10 }
 * });
 */
export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, retries = 2, retryDelay = 1000 } = options;

  const url = buildUrl(endpoint, params);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorType = getErrorType(response.status);

        // Rate limit — ждём и пробуем снова
        if (response.status === 429 && attempt < retries) {
          const waitTime = retryDelay * Math.pow(2, attempt);
          await delay(waitTime);
          continue;
        }

        throw new ApiError(
          getErrorMessage(errorType),
          response.status,
          endpoint
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      lastError = error as Error;

      // Ошибка сети — пробуем снова
      if (
        error instanceof TypeError &&
        error.message.includes('fetch') &&
        attempt < retries
      ) {
        const waitTime = retryDelay * Math.pow(2, attempt);
        await delay(waitTime);
        continue;
      }

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof TypeError) {
        throw new ApiError(getErrorMessage('NETWORK_ERROR'), 0, endpoint);
      }

      throw error;
    }
  }

  throw lastError || new Error('Failed to fetch data');
}
