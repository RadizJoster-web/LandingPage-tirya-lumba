import type { Metadata } from 'next';
import ForgotPasswordView from '@/views/forgot-password';

export const metadata: Metadata = {
  title: 'Lupa Kata Sandi',
  description: 'Atur ulang kata sandi akun portal Tirya Lumba Anda.',
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
