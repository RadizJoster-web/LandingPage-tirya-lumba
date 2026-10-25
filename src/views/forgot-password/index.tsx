'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { request, toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordView() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Masukkan alamat email yang valid.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await request<{ message?: string }>('/auth/forgot-password', {
        method: 'POST',
        body: { email },
      });
      setSuccessMessage(
        res.data?.message ||
          res.message ||
          'Tautan reset kata sandi telah dikirim ke email Anda. Silakan periksa kotak masuk atau spam.',
      );
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
            <div className="w-12 h-12 rounded-2xl bg-[#E0FBFC] text-[#0077B6] grid place-items-center text-2xl mx-auto mb-3 shadow-xs">
              🔑
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-[#1D3557]">
              Lupa Kata Sandi?
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Masukkan alamat email Anda yang terdaftar. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
            </p>
          </div>

          {successMessage ? (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                <div className="flex items-start gap-2.5">
                  <span className="text-lg">✉️</span>
                  <div>
                    <p className="font-bold">Email Terkirim!</p>
                    <p className="mt-1 text-xs text-emerald-700 leading-relaxed">
                      {successMessage}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/login">
                  <Button variant="outline" size="md" isFullRounded={true} className="w-full">
                    Kembali ke Halaman Masuk
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Alamat Email Terdaftar"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />

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
                Kirim Tautan Reset
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-slate-500 hover:text-[#0077B6] transition-colors"
                >
                  ← Kembali ke Halaman Masuk
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
