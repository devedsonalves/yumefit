import { ApiError } from './api-error';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type');

  if (response.status === 204) {
    return undefined;
  }

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

function resolveErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const message = (payload as { message?: unknown }).message;

    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
  }

  return fallback;
}

async function request<TResponse>(path: string, options: RequestOptions = {}) {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    credentials: 'include',
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(resolveErrorMessage(payload, 'Nao foi possivel concluir a operacao.'), response.status, payload);
  }

  return payload as TResponse;
}

export async function httpClient<TResponse>(path: string, options: RequestOptions = {}) {
  try {
    return await request<TResponse>(path, options);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401 && path !== '/auth/refresh' && path !== '/auth/login') {
      await request<void>('/auth/refresh', { method: 'POST' });
      return request<TResponse>(path, options);
    }

    throw error;
  }
}
