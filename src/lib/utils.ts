import { API_ORIGIN } from '@/lib/http';
import { PaymentMethod, PaymentMethodApi } from '@/types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateAge(birthDateString: string): number {
  if (!birthDateString) return 0;
  const birthDate = new Date(birthDateString);
  if (Number.isNaN(birthDate.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return Math.max(0, age);
}

/** Nama hari bahasa Indonesia dari tanggal ISO, dipakai sebagai parameter dayOfWeek. */
export function dayNameFromDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][date.getDay()];
}

export function formatDateId(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function paymentMethodToApi(method: PaymentMethod): PaymentMethodApi {
  if (method === 'QRIS') return 'QRIS';
  if (method === 'Transfer Bank') return 'BANK_TRANSFER';
  return 'CASH';
}

/** Ubah path relatif dari server (mis. uploads/profiles/foto.jpg) menjadi URL absolut. */
export function mediaUrl(path?: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${API_ORIGIN}/${path.replace(/^\/+/, '')}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
