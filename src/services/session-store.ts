// Penyimpanan sesi di browser: JWT + profil user + snapshot pendaftaran terakhir.
// API hanya mengirim token melalui body login dan cookie HttpOnly, sehingga token
// disalin ke localStorage agar bisa dipakai ulang oleh klien non-cookie.
import { AuthUser, RegistrationSnapshot } from '@/types';

const TOKEN_KEY = 'tirya_access_token';
const USER_KEY = 'tirya_auth_user';
const REGISTRATION_KEY = 'tirya_last_registration';
/** Nama lengkap dari form pendaftaran akun; login hanya membalas email + role. */
const ACCOUNT_NAME_KEY = 'tirya_account_name';
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

/** Simpan nama lengkap per email setelah registrasi akun, dipakai saat login berikutnya. */
export function saveAccountName(email: string, fullName: string) {
  if (!isBrowser() || !fullName.trim()) return;
  const names = readJson<Record<string, string>>(ACCOUNT_NAME_KEY) ?? {};
  names[email.toLowerCase()] = fullName.trim();
  localStorage.setItem(ACCOUNT_NAME_KEY, JSON.stringify(names));
}

export function getAccountName(email: string): string | null {
  const names = readJson<Record<string, string>>(ACCOUNT_NAME_KEY) ?? {};
  return names[email.toLowerCase()] ?? null;
}

export function saveSession(user: AuthUser, token: string) {
  if (!isBrowser()) return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  writeSessionCookie(SESSION_MAX_AGE);
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function clearSession() {
  if (!isBrowser()) return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(REGISTRATION_KEY);
  writeSessionCookie(0);
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function saveRegistration(snapshot: RegistrationSnapshot) {
  if (!isBrowser()) return;
  localStorage.setItem(REGISTRATION_KEY, JSON.stringify(snapshot));
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function getRegistration(): RegistrationSnapshot | null {
  return readJson<RegistrationSnapshot>(REGISTRATION_KEY);
}

/** Nama tampilan: nama lengkap akun → nama pendaftaran → bagian lokal email. */
export function displayNameOf(user: AuthUser, registration: RegistrationSnapshot | null): string {
  return (
    user.fullName ||
    getAccountName(user.email) ||
    registration?.fullName ||
    user.email.split('@')[0]
  );
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

/**
 * Snapshot untuk useSyncExternalStore: gabungan JSON user dan pendaftaran.
 * Pemisahnya karakter kontrol (\u001F) yang tidak pernah muncul mentah di JSON.
 */
const SNAPSHOT_SEPARATOR = '\u001F';

export function getSnapshot(): string | null {
  if (!isBrowser()) return null;
  return `${localStorage.getItem(USER_KEY) ?? ''}${SNAPSHOT_SEPARATOR}${localStorage.getItem(REGISTRATION_KEY) ?? ''}`;
}

export function getServerSnapshot(): string | null {
  return null;
}

export function readSnapshot(raw: string | null): {
  user: AuthUser | null;
  registration: RegistrationSnapshot | null;
} {
  if (raw === null) return { user: null, registration: null };
  const [userRaw, registrationRaw] = raw.split(SNAPSHOT_SEPARATOR);
  return {
    user: parseJson<AuthUser>(userRaw),
    registration: parseJson<RegistrationSnapshot>(registrationRaw),
  };
}

function parseJson<T>(raw: string | undefined): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
