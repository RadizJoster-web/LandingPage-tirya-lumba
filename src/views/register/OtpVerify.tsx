import React from 'react';
import { Button } from '@/components/ui/Button';

interface OtpVerifyProps {
  email: string;
  generatedOtp: string;
  otpInput: string;
  setOtpInput: (v: string) => void;
  countdown: number;
  error: string;
  isLoading: boolean;
  onVerify: (e: React.FormEvent) => void;
  onResend: () => void;
  onChangeEmail: () => void;
}

export const OtpVerify: React.FC<OtpVerifyProps> = ({
  email,
  generatedOtp,
  otpInput,
  setOtpInput,
  countdown,
  error,
  isLoading,
  onVerify,
  onResend,
  onChangeEmail,
}) => {
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
          Masukkan 4 digit kode OTP yang telah dikirim ke{' '}
          <span className="font-bold text-[#1D3557]">{email}</span>
        </p>

        {/* Demo Helper Banner */}
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
          💡 Kode OTP simulasi: <b className="tracking-widest font-mono text-sm">{generatedOtp}</b> (atau <b className="font-mono">0000</b>)
        </div>
      </div>

      <form onSubmit={onVerify} className="space-y-5">
        <div>
          <input
            type="text"
            maxLength={4}
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value.toUpperCase())}
            placeholder="____"
            className="w-full text-center tracking-[16px] font-heading font-extrabold text-3xl py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#00B4D8] focus:ring-4 focus:ring-[#00B4D8]/20 transition-all uppercase"
            required
            autoFocus
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#FF6F59] text-center">
            {error}
          </div>
        )}

        <div className="text-center text-sm text-slate-500">
          {countdown > 0 ? (
            <p>Kirim ulang kode dalam <span className="font-bold text-[#0077B6]">{countdown} detik</span></p>
          ) : (
            <button
              type="button"
              onClick={onResend}
              className="text-[#0077B6] font-bold hover:underline"
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
        >
          Verifikasi & Lanjutkan
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
