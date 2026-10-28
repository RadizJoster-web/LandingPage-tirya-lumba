import { LoginResult, RegistrationSnapshot } from '@/types';
import { request } from '@/lib/http';

export async function registerAccount(input: {
  fullName: string;
  email: string;
  password: string;
}): Promise<string> {
  const res = await request<string>('/auth/register', {
    method: 'POST',
    body: input,
  });
  return res.data;
}

export async function verifyOtpRequest(input: {
  email: string;
  otpCode: string;
}): Promise<void> {
  await request<unknown>('/auth/verify-otp', { method: 'POST', body: input });
}

export async function loginAccount(input: {
  email: string;
  password: string;
}): Promise<LoginResult> {
  const res = await request<LoginResult>('/auth/login', {
    method: 'POST',
    body: input,
  });
  return res.data;
}

export async function fetchMyRegistration(): Promise<RegistrationSnapshot | null> {
  try {
    const res = await request<RegistrationSnapshot | null>('/register/me', {
      method: 'GET',
    });
    return res.data ?? null;
  } catch (err) {
    console.warn('[AuthProvider] Gagal mengambil snapshot registrasi dari server:', err);
    return null;
  }
}
