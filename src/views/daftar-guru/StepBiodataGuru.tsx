import React from 'react';
import { GuruStep1Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const StepBiodataGuru: React.FC<GuruStep1Props> = ({
  name,
  setName,
  birthDate,
  setBirthDate,
  currentAge,
  gender,
  setGender,
  phone,
  setPhone,
  domicile,
  setDomicile,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Input
        label="Nama Lengkap *"
        placeholder="Contoh: Budi Santoso, S.Pd."
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Tanggal Lahir *"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
        <div>
          <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
            Usia Saat Ini
          </label>
          <input
            readOnly
            value={birthDate ? `${currentAge} Tahun` : '-'}
            className="w-full px-3.5 py-2.5 bg-slate-100 text-slate-700 text-sm border border-gray-300 rounded-lg cursor-not-allowed font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          Jenis Kelamin *
        </label>
        <div className="flex gap-4 pt-2">
          <label className="inline-flex items-center gap-2 text-sm text-[#1D3557] cursor-pointer">
            <input
              type="radio"
              name="gender"
              checked={gender === 'Laki-Laki'}
              onChange={() => setGender('Laki-Laki')}
              className="text-[#00B4D8] focus:ring-[#00B4D8]"
            />
            <span>Laki-laki</span>
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-[#1D3557] cursor-pointer">
            <input
              type="radio"
              name="gender"
              checked={gender === 'Perempuan'}
              onChange={() => setGender('Perempuan')}
              className="text-[#00B4D8] focus:ring-[#00B4D8]"
            />
            <span>Perempuan</span>
          </label>
        </div>
      </div>

      <Input
        label="No. Telp / WhatsApp *"
        type="tel"
        placeholder="081234567890"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <Input
        label="Domisili Tempat Tinggal *"
        placeholder="Contoh: Bintaro, Tangerang Selatan"
        value={domicile}
        onChange={(e) => setDomicile(e.target.value)}
        required
      />

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <Button type="submit" variant="primary" size="md" className="min-w-[140px]">
          Selanjutnya →
        </Button>
      </div>
    </form>
  );
};
