import { Suspense } from 'react';
import type { Metadata } from 'next';
import ResetPasswordView from '@/views/reset-password';

export const metadata: Metadata = {
  title: 'Atur Ulang Kata Sandi',
  description: 'Buat kata sandi baru untuk akun Anda di Tirya Lumba.',
  robots: { index: false, follow: true },
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-sm text-slate-500">Memuat...</div>}>
      <ResetPasswordView />
    </Suspense>
  );
}
