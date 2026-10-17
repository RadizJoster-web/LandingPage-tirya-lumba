import { Suspense } from 'react';
import type { Metadata } from 'next';
import Login from '@/pages/login';

export const metadata: Metadata = {
  title: 'Masuk Akun',
  description: 'Masuk ke portal PT Tirya Lumba untuk memantau pendaftaran kelas renang Anda.',
  robots: { index: false, follow: true },
};

// useSearchParams() butuh Suspense boundary saat prerender (perilaku Next 16).
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh]" />}>
      <Login />
    </Suspense>
  );
}
