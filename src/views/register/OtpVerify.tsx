import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface OtpVerifyProps {
  email: string;
  error: string;
  info: string;
  isLoading: boolean;
  onVerify: (otpCode: string) => void;
  onResend: () => void;
  onChangeEmail: () => void;
}

/** OTP dari server berupa 6 digit angka (POST /api/auth/verify-otp). */
export const OtpVerify: React.FC<OtpVerifyProps> = ({
  email,
  error,
  info,
  isLoading,
  onVerify,
  onResend,
  onChangeEmail,
}) => {
  const [otpInput, setOtpInput] = useState('');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(otpInput);
  };

  const handleResend = () => {
    setCountdown(60);
    setOtpInput('');
    onResend();
  };

  return (
    <>
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center mx-auto mb-3 shadow-sm">
          <span className="text-2xl">📩</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6]">
          Verifikasi OTP
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Masukkan 6 digit kode OTP yang dikirim ke{' '}
          <span className="font-bold text-[#1D3557]">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
          placeholder="______"
          aria-label="Kode OTP 6 digit"
          className="w-full text-center tracking-[12px] font-heading font-extrabold text-3xl py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#00B4D8] focus:ring-4 focus:ring-[#00B4D8]/20 transition-all"
          required
          autoFocus
        />

        {info && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 text-center">
            {info}
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#FF6F59] text-center">
            {error}
          </div>
        )}

        <div className="text-center text-sm text-slate-500">
          {countdown > 0 ? (
            <p>
              Kirim ulang kode dalam{' '}
              <span className="font-bold text-[#0077B6]">{countdown} detik</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="text-[#0077B6] font-bold hover:underline disabled:opacity-50"
            >
              Kirim ulang kode OTP
            </button>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={true}
          className="w-full"
          isLoading={isLoading}
          disabled={otpInput.length !== 6}
        >
          Verifikasi Akun
        </Button>

        <button
          type="button"
          onClick={onChangeEmail}
          className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-2"
        >
          ← Ganti alamat email
        </button>
      </form>
    </>
  );
};
