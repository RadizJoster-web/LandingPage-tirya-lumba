'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { request, toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
      setError('Token reset kata sandi tidak ditemukan atau tautan tidak valid.');
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

  const eyeIcon = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-slate-400 hover:text-[#0077B6] p-1 transition-colors"
      title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
      aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
    >
      {showPassword ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      )}
    </button>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/30 to-[#F8F9FA]">
      <div className="w-full max-w-md">
        <Card variant="form" className="p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#E0FBFC] text-[#0077B6] grid place-items-center text-2xl mx-auto mb-3 shadow-xs">
              🔒
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-[#1D3557]">
              Atur Ulang Kata Sandi
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Buat kata sandi baru yang aman untuk akun Anda.
            </p>
          </div>

          {!token ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm leading-relaxed">
                Tautan tidak memiliki token valid. Pastikan Anda membuka tautan lengkap yang dikirimkan ke email Anda.
              </div>
              <Link href="/forgot-password">
                <Button variant="outline" size="md" isFullRounded={true} className="w-full">
                  Minta Tautan Baru
                </Button>
              </Link>
            </div>
          ) : success ? (
            <div className="space-y-5 animate-fade-in text-center">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                <p className="font-bold text-base">Berhasil Diperbarui!</p>
                <p className="mt-1 text-xs text-emerald-700 leading-relaxed">
                  Kata sandi akun Anda telah berhasil diubah. Silakan masuk kembali menggunakan kata sandi baru.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                size="md"
                isFullRounded={true}
                className="w-full"
                onClick={() => router.push('/login')}
              >
                Masuk Sekarang
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  label="Password Baru *"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 6 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  required
                  rightElement={eyeIcon}
                />
              </div>

              <div>
                <Input
                  label="Konfirmasi Password Baru *"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ulangi password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required
                  rightElement={eyeIcon}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#FF6F59]">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                isFullRounded={true}
                className="w-full mt-2"
                isLoading={isLoading}
              >
                Simpan Kata Sandi Baru
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-slate-500 hover:text-[#0077B6] transition-colors"
                >
                  ← Batal dan Kembali ke Login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
