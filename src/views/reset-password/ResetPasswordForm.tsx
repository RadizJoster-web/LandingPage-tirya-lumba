import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

interface ResetPasswordFormProps {
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  error: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  error,
  isLoading,
  onSubmit,
}) => {
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
    <form onSubmit={onSubmit} className="space-y-4">
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
  );
};
