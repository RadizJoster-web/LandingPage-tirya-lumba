'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { toErrorMessage } from '@/lib/http';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginParent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const justVerified = searchParams.get('terverifikasi') === '1';
  // Hanya path internal yang diterima, mencegah pengalihan ke situs luar.
  const redirectParam = searchParams.get('redirect');
  const redirectTo = redirectParam?.startsWith('/') ? redirectParam : '/profile';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    if (password.length < 6) {
      setError('Password harus memiliki minimal 6 karakter.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.push(redirectTo);
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/30 to-[#F8F9FA]">
      <div className="w-full max-w-md">
        <Card variant="form" className="p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#00B4D8] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
              <span className="text-2xl">🔐</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6]">
              Masuk Akun
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Selamat datang kembali di portal PT Tirya Lumba
            </p>
          </div>

          {justVerified && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
              Verifikasi akun berhasil. Silakan masuk dengan email dan password Anda.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Alamat Email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-[#0077B6] hover:text-[#00B4D8] mt-1.5 font-medium flex items-center gap-1"
              >
                <span>{showPassword ? '🙈' : '👁️'}</span>
                <span>{showPassword ? 'Sembunyikan Password' : 'Lihat Password'}</span>
              </button>
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
              Masuk
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm text-slate-500">
            Belum memiliki akun?{' '}
            <Link href="/register" className="font-bold text-[#0077B6] hover:text-[#00B4D8] transition-colors">
              Daftar di sini
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
