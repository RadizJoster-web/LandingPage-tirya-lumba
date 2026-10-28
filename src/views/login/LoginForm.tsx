import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useForgotPassword } from './lib/useForgotPassword';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  isLoading,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { forgotStatus, forgotMessage, resetForgotStatus, handleForgotPassword } =
    useForgotPassword(email);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Alamat Email"
        type="email"
        placeholder="nama@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          resetForgotStatus();
        }}
        autoComplete="email"
        required
      />

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Kata Sandi
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={forgotStatus === 'loading'}
            className="text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8] transition-colors disabled:opacity-50"
          >
            {forgotStatus === 'loading' ? 'Mengirim...' : 'Lupa Password?'}
          </button>
        </div>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Minimal 6 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
              title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
      </div>

      {forgotStatus === 'success' && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-800 animate-fade-in flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-emerald-900">Tautan Reset Terkirim</p>
            <p className="mt-0.5 leading-relaxed text-emerald-700">{forgotMessage}</p>
          </div>
        </div>
      )}

      {forgotStatus === 'error' && (
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/80 text-xs font-medium text-amber-800 animate-fade-in flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>{forgotMessage}</span>
        </div>
      )}

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
        Masuk
      </Button>
    </form>
  );
};
