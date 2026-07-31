import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { getAccessToken } from '@/features/auth/storage/auth-token-storage';
import { ApiError } from './api-error';

const defaultApiBaseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const API_BASE_URL =
  resolveApiBaseUrl((Constants.expoConfig?.extra?.apiBaseUrl as string | undefined) ?? process.env.EXPO_PUBLIC_API_BASE_URL);

function resolveApiBaseUrl(apiBaseUrl?: string) {
  if (!apiBaseUrl) {
    return defaultApiBaseUrl;
  }

  if (Platform.OS === 'android') {
    return apiBaseUrl.replace('://localhost:', '://10.0.2.2:').replace('://127.0.0.1:', '://10.0.2.2:');
  }

  return apiBaseUrl;
}

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

export async function httpClient<TResponse>(path: string, options: RequestOptions = {}) {
  const headers = new Headers(options.headers);
  const accessToken = await getAccessToken();

  if (options.body !== undefined && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  if (accessToken && !headers.has('authorization')) {
    headers.set('authorization', `Bearer ${accessToken}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      credentials: 'include',
    });
  } catch (error) {
    throw new ApiError('Nao foi possivel conectar ao servidor.', 0, error);
  }

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(resolveErrorMessage(payload, 'Nao foi possivel concluir a operacao.'), response.status, payload);
  }

  return payload as TResponse;
}
