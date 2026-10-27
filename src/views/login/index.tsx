'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';
import { LoginFooter } from './LoginFooter';

export default function LoginParent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const justVerified = searchParams.get('terverifikasi') === '1';
  const redirectParam = searchParams.get('redirect');
  const redirectTo = redirectParam?.startsWith('/')
    ? redirectParam
    : '/profile';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    if (password.length < 6) {
      setError('Password harus memiliki minimal 6 karakter.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.push(redirectTo);
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] dark:bg-slate-950">
      <div className="w-full max-w-md">
        <Card variant="form" className="p-7 sm:p-8">
          <LoginHeader justVerified={justVerified} />
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
          <LoginFooter />
        </Card>
      </div>
    </div>
  );
}
