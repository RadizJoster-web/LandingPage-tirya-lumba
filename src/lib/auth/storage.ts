import { UserSession } from '@/types';

export const STORAGE_KEY = 'tirya_lumba_auth_session';

export function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('tirya_auth_sync', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('tirya_auth_sync', callback);
  };
}

export function getSnapshot(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function getServerSnapshot(): string | null {
  return null;
}

export function saveToStorage(updatedUser: UserSession | null) {
  if (typeof window === 'undefined') return;
  try {
    if (updatedUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    window.dispatchEvent(new Event('tirya_auth_sync'));
  } catch (e) {
    console.error('Failed to save session to localStorage', e);
  }
}

export function persistUserData(email: string, data: UserSession) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`tirya_user_${email}`, JSON.stringify(data));
}
