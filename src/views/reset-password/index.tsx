'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { request, toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

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

  const eyeIcon = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
      title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
      aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

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
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200/80 text-xs font-medium text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                isFullRounded={false}
                className="w-full mt-2 font-semibold"
                isLoading={isLoading}
              >
                Simpan Kata Sandi Baru
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0077B6] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Batal dan Kembali ke Login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
