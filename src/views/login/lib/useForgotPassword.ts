import { useState } from 'react';
import { request, toErrorMessage } from '@/lib/http';

export function useForgotPassword(email: string) {
  const [forgotStatus, setForgotStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [forgotMessage, setForgotMessage] = useState('');

  const resetForgotStatus = () => {
    if (forgotStatus !== 'idle') {
      setForgotStatus('idle');
      setForgotMessage('');
    }
  };

  const handleForgotPassword = async () => {
    setForgotMessage('');
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setForgotStatus('error');
      setForgotMessage(
        'Masukkan alamat email Anda pada kolom di atas terlebih dahulu untuk menerima tautan reset kata sandi.',
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
          `Tautan reset kata sandi telah dikirim ke ${cleanEmail}. Silakan periksa kotak masuk atau spam email Anda.`,
      );
    } catch (err) {
      setForgotStatus('error');
      setForgotMessage(toErrorMessage(err));
    }
  };

  return {
    forgotStatus,
    forgotMessage,
    resetForgotStatus,
    handleForgotPassword,
  };
}
