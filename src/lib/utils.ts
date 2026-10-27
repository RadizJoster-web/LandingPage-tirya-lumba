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

export const DEFAULT_SESSION_HOURS: Record<string, string> = {
  'sesi 1': '09.00 - 10.00',
  'sesi 2': '11.00 - 12.00',
  'sesi 3': '13.00 - 14.00',
};

/**
 * Mengambil rentang jam dari sesi (mis. "09.00 - 10.00").
 */
export function getSessionTime(
  sessionName?: string,
  startTime?: string,
  endTime?: string,
  timeRange?: string,
): string {
  if (timeRange && timeRange.trim()) {
    return timeRange.replace(/WIB/i, '').trim().replace(/:/g, '.');
  }
  if (startTime && endTime) {
    return `${startTime.replace(':', '.')} - ${endTime.replace(':', '.')}`;
  }
  if (!sessionName) return '09.00 - 10.00';

  // Jika sessionName sudah mengandung format jam (mis. "09:00 - 10:00")
  const timeMatch = sessionName.match(/(\d{1,2}[:.]\d{2}\s*[-–—]\s*\d{1,2}[:.]\d{2})/);
  if (timeMatch) {
    return timeMatch[1].replace(/:/g, '.');
  }

  const normalized = sessionName.toLowerCase().trim();
  if (normalized.includes('1')) return DEFAULT_SESSION_HOURS['sesi 1'];
  if (normalized.includes('2')) return DEFAULT_SESSION_HOURS['sesi 2'];
  if (normalized.includes('3')) return DEFAULT_SESSION_HOURS['sesi 3'];

  return '09.00 - 10.00';
}

/**
 * Format teks sesi latihan lengkap dengan jamnya: "Sesi 1 09.00 - 10.00"
 */
export function formatSessionWithTime(
  sessionName?: string,
  timeRange?: string,
  startTime?: string,
  endTime?: string,
): string {
  if (!sessionName) return 'Sesi 1 09.00 - 10.00';

  // Jika nama sesi sudah mengandung format jam lengkap, rapikan dan kembalikan langsung
  if (/\d{1,2}[:.]\d{2}/.test(sessionName)) {
    return sessionName.replace(/:/g, '.');
  }

  const time = getSessionTime(sessionName, startTime, endTime, timeRange);

  // Rapikan kapitalisasi kata (mis. "sesi 1" -> "Sesi 1")
  const cleanName = sessionName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return `${cleanName} ${time}`;
}
