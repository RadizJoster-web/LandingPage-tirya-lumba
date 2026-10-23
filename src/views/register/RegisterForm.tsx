import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface RegisterFormProps {
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  isLoading,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Nama Lengkap"
        placeholder="Contoh: Budi Santoso"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        autoComplete="name"
        required
      />

      <Input
        label="Alamat Email Aktif"
        type="email"
        placeholder="nama@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />

      <div>
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Minimal 6 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-xs text-[#0077B6] hover:text-[#00B4D8] mt-1.5 font-medium flex items-center gap-1"
        >
          <span>{showPassword ? '🙈' : '👁️'}</span>
          <span>{showPassword ? 'Sembunyikan Password' : 'Lihat Password'}</span>
        </button>
      </div>

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
        Kirim Kode OTP
      </Button>
    </form>
  );
};
