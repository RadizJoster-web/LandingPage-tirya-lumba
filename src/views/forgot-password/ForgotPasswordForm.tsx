import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (val: string) => void;
  error: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  setEmail,
  error,
  isLoading,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
  );
};
