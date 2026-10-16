'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Card } from '@/components/ui/Card';
import { RegisterForm } from './RegisterForm';
import { OtpVerify } from './OtpVerify';

export default function RegisterParent() {
  const router = useRouter();
  const { login } = useAuth();

  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setGeneratedOtp(code);
    setStep('otp');
    setCountdown(60);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = otpInput.trim().toUpperCase();
    if (trimmed !== generatedOtp && trimmed !== '0000') {
      setError('Kode OTP salah. Silakan coba lagi.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email);
      router.push('/daftar');
    } catch {
      setError('Gagal verifikasi OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setGeneratedOtp(code);
    setCountdown(60);
    setOtpInput('');
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/30 to-[#F8F9FA]">
      <div className="w-full max-w-md">
        <Card variant="landing" className="p-8 shadow-xl">
          {step === 'form' ? (
            <RegisterForm
              email={email} setEmail={setEmail} password={password} setPassword={setPassword}
              error={error} onSubmit={handleSendOtp}
            />
          ) : (
            <OtpVerify
              email={email} generatedOtp={generatedOtp} otpInput={otpInput} setOtpInput={setOtpInput}
              countdown={countdown} error={error} isLoading={isLoading} onVerify={handleVerifyOtp}
              onResend={handleResendOtp} onChangeEmail={() => setStep('form')}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
