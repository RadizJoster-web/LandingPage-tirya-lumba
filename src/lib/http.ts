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
  tags?: string[];
};

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { body, revalidate, tag, tags, headers, ...init } = options;
  const isForm = body instanceof FormData;
  const token = getToken();

  const nextTags = tags && tags.length > 0 ? tags : tag ? [tag] : undefined;

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
    ...(revalidate !== undefined || nextTags !== undefined
      ? {
          next: {
            ...(revalidate !== undefined ? { revalidate } : {}),
            ...(nextTags ? { tags: nextTags } : {}),
          },
        }
      : {}),
  });

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!res.ok || !json || json.success === false) {
    let fallbackMessage = `Permintaan ke server gagal (HTTP ${res.status}).`;
    if (res.status === 413) {
      fallbackMessage =
        'Ukuran berkas terlalu besar (HTTP 413 Content Too Large). Maksimal ukuran berkas yang diperbolehkan adalah 4.5 MB. Mohon kompres atau perkecil ukuran dokumen Anda.';
    } else if (res.status === 404) {
      fallbackMessage = `Layanan atau rute ${path} tidak ditemukan di server (404 Not Found).`;
    } else if (res.status === 500) {
      fallbackMessage = `Terjadi kendala pada pemrosesan internal server (HTTP 500). Silakan coba lagi.`;
    } else if (res.status === 401 || res.status === 403) {
      fallbackMessage = `Akses tidak diizinkan atau sesi telah berakhir (HTTP ${res.status}). Silakan login ulang.`;
    }

    throw new ApiError(
      json?.message || fallbackMessage,
      res.status,
    );
  }

  return json;
}

export function toErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
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
