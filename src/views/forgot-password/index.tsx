'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { request, toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailParam);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (emailParam && !email) {
      setEmail(emailParam);
    }
  }, [emailParam, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const targetEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(targetEmail)) {
      setError('Masukkan alamat email yang valid.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await request<{ message?: string }>('/auth/forgot-password', {
        method: 'POST',
        body: { email: targetEmail },
      });
      setSuccessMessage(
        res.data?.message ||
          res.message ||
          `Tautan reset kata sandi telah dikirimkan ke email ${targetEmail}. Silakan periksa kotak masuk atau folder spam Anda.`,
      );
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card variant="form" className="p-7 sm:p-8">
        <div className="text-center mb-7">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Pemulihan Akses
          </span>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D3557] tracking-tight dark:text-slate-100">
            Lupa Kata Sandi?
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Masukkan alamat email akun Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
          </p>
        </div>

        {successMessage ? (
          <div className="space-y-5 animate-fade-in">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950">Email Pemulihan Terkirim</p>
                <p className="mt-1 text-xs text-emerald-700 leading-relaxed">
                  {successMessage}
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link href="/login">
                <Button variant="outline" size="md" isFullRounded={false} className="w-full">
                  Kembali ke Halaman Masuk
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Alamat Email Terdaftar"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
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
              Kirim Tautan Reset
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0077B6] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kembali ke Halaman Masuk
              </Link>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

export default function ForgotPasswordView() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] dark:bg-slate-950">
      <Suspense
        fallback={
          <div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
        }
      >
        <ForgotPasswordContent />
      </Suspense>
    </div>
  );
}
