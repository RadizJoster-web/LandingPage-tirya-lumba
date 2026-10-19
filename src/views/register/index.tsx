'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { toErrorMessage } from '@/services/api';
import { Card } from '@/components/ui/Card';
import { RegisterForm } from './RegisterForm';
import { OtpVerify } from './OtpVerify';

export default function RegisterParent() {
  const router = useRouter();
  const { register, verifyOtp, user } = useAuth();

  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!fullName.trim()) {
      setError('Nama lengkap wajib diisi.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setIsLoading(true);
    try {
      const target = await register({ fullName: fullName.trim(), email, password });
      setEmail(target || email);
      setStep('otp');
      setCountdown(60);
      setInfo('Kode OTP sudah dikirim ke email Anda.');
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (otpInput.length !== 6) {
      setError('Kode OTP terdiri dari 6 digit.');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp(email, otpInput);
      router.push('/login?terverifikasi=1');
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setIsLoading(true);
    try {
      await register({ fullName: fullName.trim(), email, password });
      setCountdown(60);
      setOtpInput('');
      setInfo('Kode OTP baru telah dikirim ulang.');
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
        <div className="max-w-md space-y-3">
          <h1 className="font-heading font-extrabold text-2xl text-[#0077B6]">
            Anda sudah masuk sebagai {user.email}
          </h1>
          <p className="text-sm text-slate-500">
            Lanjutkan ke portal pendaftaran untuk mendaftar sebagai murid atau pelatih.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/30 to-[#F8F9FA]">
      <div className="w-full max-w-md">
        <Card variant="form" className="p-8">
          {step === 'form' ? (
            <RegisterForm
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={error}
              isLoading={isLoading}
              onSubmit={handleSendOtp}
            />
          ) : (
            <OtpVerify
              email={email}
              otpInput={otpInput}
              setOtpInput={setOtpInput}
              countdown={countdown}
              error={error}
              info={info}
              isLoading={isLoading}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
              onChangeEmail={() => {
                setStep('form');
                setError('');
                setInfo('');
                setOtpInput('');
              }}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
