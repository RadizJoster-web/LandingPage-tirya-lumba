import React from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { OtpDigitInputs } from './OtpDigitInputs';
import { useOtpInput } from './useOtpInput';

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
  const {
    digits,
    countdown,
    inputRefs,
    otpCode,
    handleDigitChange,
    handleKeyDown,
    handleResend,
  } = useOtpInput(onResend);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      onVerify(otpCode);
    }
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
        <OtpDigitInputs
          digits={digits}
          inputRefs={inputRefs}
          onDigitChange={handleDigitChange}
          onKeyDown={handleKeyDown}
        />

        {info && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs font-medium text-emerald-800 flex items-center justify-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{info}</span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-xs font-medium text-rose-700 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
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
