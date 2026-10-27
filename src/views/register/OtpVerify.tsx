import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

interface OtpVerifyProps {
  email: string;
  error: string;
  info: string;
  isLoading: boolean;
  onVerify: (otpCode: string) => void;
  onResend: () => void;
  onChangeEmail: () => void;
}

export const OtpVerify: React.FC<OtpVerifyProps> = ({
  email,
  error,
  info,
  isLoading,
  onVerify,
  onResend,
  onChangeEmail,
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric characters
    const clean = value.replace(/\D/g, '');
    if (!clean) {
      const next = [...digits];
      next[index] = '';
      setDigits(next);
      return;
    }

    // If pasted multiple digits
    if (clean.length > 1) {
      const pasteDigits = clean.slice(0, 6).split('');
      const next = [...digits];
      pasteDigits.forEach((d, i) => {
        if (index + i < 6) next[index + i] = d;
      });
      setDigits(next);
      const nextFocus = Math.min(5, index + pasteDigits.length);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const next = [...digits];
    next[index] = clean.slice(-1);
    setDigits(next);

    // Auto-advance
    if (index < 5 && clean) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpCode = digits.join('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      onVerify(otpCode);
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setDigits(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    onResend();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Verifikasi Keamanan
        </span>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D3557] tracking-tight dark:text-slate-100">
          Masukkan Kode OTP
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          6 digit kode verifikasi telah dikirimkan ke{' '}
          <span className="font-bold text-[#1D3557] dark:text-slate-200">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 6 Individual Digit Slots */}
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={6} // Allow paste
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-11 h-14 sm:w-12 sm:h-16 text-center font-heading font-bold text-2xl text-[#1D3557] bg-white border border-gray-200 rounded-xl shadow-xs transition-all focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/30 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100"
              aria-label={`Digit OTP ${index + 1}`}
            />
          ))}
        </div>

        {info && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs font-medium text-emerald-800 flex items-center justify-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{info}</span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-xs font-medium text-rose-700 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="text-center text-xs sm:text-sm text-slate-500">
          {countdown > 0 ? (
            <p>
              Kirim ulang kode dalam{' '}
              <span className="font-bold text-[#0077B6] tabular-nums">{countdown} detik</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 text-[#0077B6] font-bold hover:underline disabled:opacity-50"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Kirim ulang kode OTP
            </button>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={false}
          className="w-full font-semibold"
          isLoading={isLoading}
          disabled={otpCode.length !== 6}
        >
          Verifikasi Akun
        </Button>

        <button
          type="button"
          onClick={onChangeEmail}
          className="inline-flex items-center justify-center gap-1.5 w-full text-center text-xs text-slate-400 hover:text-slate-600 pt-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Ganti alamat email
        </button>
      </form>
    </div>
  );
};
