'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { request, toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { ResetPasswordForm } from './ResetPasswordForm';

export default function ResetPasswordView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Token reset kata sandi tidak ditemukan atau tautan sudah kedaluwarsa.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password baru minimal terdiri dari 6 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok dengan password baru.');
      return;
    }

    setIsLoading(true);
    try {
      await request('/auth/reset-password', {
        method: 'POST',
        body: {
          token,
          newPassword,
        },
      });
      setSuccess(true);
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] dark:bg-slate-950">
      <div className="w-full max-w-md">
        <Card variant="form" className="p-7 sm:p-8">
          <div className="text-center mb-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Keamanan Akun
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D3557] tracking-tight dark:text-slate-100">
              Atur Kata Sandi Baru
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Buat kata sandi baru yang kuat untuk akun Tirya Lumba Anda
            </p>
          </div>

          {!token ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Tautan tidak memiliki token valid. Pastikan Anda membuka tautan lengkap yang kami kirimkan ke kotak masuk email Anda.
                </span>
              </div>
              <Link href="/forgot-password">
                <Button variant="outline" size="md" isFullRounded={false} className="w-full">
                  Minta Tautan Baru
                </Button>
              </Link>
            </div>
          ) : success ? (
            <div className="space-y-5 animate-fade-in text-center">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm flex items-start gap-3 text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-950">Kata Sandi Berhasil Diperbarui</p>
                  <p className="mt-1 text-xs text-emerald-700 leading-relaxed">
                    Kata sandi akun Anda telah berhasil diubah. Silakan masuk kembali menggunakan kata sandi baru Anda.
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="md"
                isFullRounded={false}
                className="w-full font-semibold"
                onClick={() => router.push('/login')}
              >
                Masuk Sekarang
              </Button>
            </div>
          ) : (
            <ResetPasswordForm
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={error}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
