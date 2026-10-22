import { ApiResponse } from '@/types';
import { getToken } from '@/services/session-store';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/** Alamat berkas statis (tanpa /api) untuk merender URL dari server. */
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  revalidate?: number;
  tag?: string;
};

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { body, revalidate, tag, headers, ...init } = options;
  const isForm = body instanceof FormData;
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    body: isForm ? body : body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(isForm || body === undefined
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(revalidate !== undefined
      ? { next: { revalidate, ...(tag ? { tags: [tag] } : {}) } }
      : {}),
  });

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!res.ok || !json || json.success === false) {
    throw new ApiError(
      json?.message || `Permintaan ke server gagal (HTTP ${res.status}).`,
      res.status,
    );
  }

  return json;
}

export function toErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return 'Tidak dapat menghubungi server. Periksa koneksi Anda lalu coba lagi.';
}

export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error('[http] permintaan gagal:', error);
    return fallback;
  }
}
