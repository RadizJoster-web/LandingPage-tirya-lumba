'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { RegisterHeader } from './RegisterHeader';
import { RegisterForm } from './RegisterForm';
import { RegisterFooter } from './RegisterFooter';
import { OtpVerify } from './OtpVerify';

export default function RegisterParent() {
  const router = useRouter();
  const { register, verifyOtp } = useAuth();

  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    const minPassword = 6;
    const maxPassword = 12;
    if (password.length < minPassword) {
      setError('Password minimal 6 karakter.');
      return;
    }
    if (password.length > maxPassword) {
      setError('Password maximal 12 karakter.');
      return;
    }

    setIsLoading(true);
    try {
      const target = await register({
        fullName: fullName.trim(),
        email,
        password,
      });
      setEmail(target || email);
      setStep('otp');
      setInfo('Kode OTP telah dikirimkan ke email Anda.');
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    setError('');
    setInfo('');

    if (otpCode.length !== 6) {
      setError('Kode OTP harus terdiri dari 6 digit.');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp(email, otpCode);
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
      setInfo('Kode OTP baru telah dikirimkan ulang.');
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] dark:bg-slate-950">
      <div className="max-w-md w-full">
        <Card variant="form" className="p-7 sm:p-8">
          {step === 'form' ? (
            <>
              <RegisterHeader />
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
              <RegisterFooter />
            </>
          ) : (
            <OtpVerify
              email={email}
              error={error}
              info={info}
              isLoading={isLoading}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
              onChangeEmail={() => {
                setStep('form');
                setError('');
                setInfo('');
              }}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
