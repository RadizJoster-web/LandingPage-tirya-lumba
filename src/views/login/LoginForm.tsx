import React, { useState } from 'react';
import { request, toErrorMessage } from '@/lib/http';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [forgotMessage, setForgotMessage] = useState('');

  const handleForgotPassword = async () => {
    setForgotMessage('');
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setForgotStatus('error');
      setForgotMessage(
        'Silakan masukkan alamat email akun Anda pada kolom di atas terlebih dahulu, lalu klik Lupa Password.',
      );
      return;
    }

    setForgotStatus('loading');
    try {
      const res = await request<{ message?: string }>('/auth/forgot-password', {
        method: 'POST',
        body: { email: cleanEmail },
      });
      setForgotStatus('success');
      setForgotMessage(
        res.data?.message ||
          res.message ||
          `Tautan reset kata sandi telah dikirim ke email ${cleanEmail}. Silakan periksa kotak masuk atau spam email Anda.`,
      );
    } catch (err) {
      setForgotStatus('error');
      setForgotMessage(toErrorMessage(err));
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Alamat Email"
        type="email"
        placeholder="nama@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (forgotStatus !== 'idle') {
            setForgotStatus('idle');
            setForgotMessage('');
          }
        }}
        autoComplete="email"
        required
      />

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-[#1D3557]">
            Password
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={forgotStatus === 'loading'}
            className="text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8] transition-colors disabled:opacity-50"
          >
            {forgotStatus === 'loading' ? 'Mengirim tautan...' : 'Lupa Password?'}
          </button>
        </div>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          rightElement={
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
          }
        />
      </div>

      {/* Notifikasi Lupa Password Langsung di Form Login */}
      {forgotStatus === 'success' && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 animate-fade-in flex items-start gap-2.5">
          <span className="text-base">✉️</span>
          <div>
            <p className="font-bold">Tautan Reset Terkirim!</p>
            <p className="mt-0.5 leading-relaxed text-emerald-700">{forgotMessage}</p>
          </div>
        </div>
      )}

      {forgotStatus === 'error' && (
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 animate-fade-in">
          ⚠️ {forgotMessage}
        </div>
      )}

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
  );
};
