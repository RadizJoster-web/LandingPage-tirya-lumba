// Penyimpanan sesi autentikasi murni: JWT + profil user dasar (Tanpa caching data registrasi/API).
import { AuthUser } from '@/types';

const TOKEN_KEY = 'tirya_access_token';
const USER_KEY = 'tirya_auth_user';
const SYNC_EVENT = 'tirya_auth_sync';
/** Penanda sesi untuk proxy.ts; bukan kredensial, token asli tetap JWT server. */
const SESSION_COOKIE = 'tirya_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

const isBrowser = () => typeof window !== 'undefined';

function writeSessionCookie(maxAge: number) {
  if (!isBrowser()) return;
  document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function readJson<T>(key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthUser(): AuthUser | null {
  return readJson<AuthUser>(USER_KEY);
}

export function saveSession(user: AuthUser, token: string) {
  if (!isBrowser()) return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Bersihkan data cache pendaftaran lama jika tersisa di browser
  localStorage.removeItem('tirya_last_registration');
  writeSessionCookie(SESSION_MAX_AGE);
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function updateUser(partial: Partial<AuthUser>) {
  if (!isBrowser()) return;
  const current = getAuthUser();
  if (!current) return;
  const updated = { ...current, ...partial };
  localStorage.setItem(USER_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function clearSession() {
  if (!isBrowser()) return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('tirya_last_registration');
  writeSessionCookie(0);
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function subscribe(callback: () => void) {
  if (!isBrowser()) return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(SYNC_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(SYNC_EVENT, callback);
  };
}

export function getSnapshot(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(USER_KEY);
}

export function getServerSnapshot(): string | null {
  return null;
}

export function readSnapshot(raw: string | null): {
  user: AuthUser | null;
} {
  if (!raw) return { user: null };
  try {
    return { user: JSON.parse(raw) as AuthUser };
  } catch {
    return { user: null };
  }
}
