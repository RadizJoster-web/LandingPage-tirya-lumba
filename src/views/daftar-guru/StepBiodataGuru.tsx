import React from 'react';
import { GuruStep1Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { GuruPhotoUploader } from './GuruPhotoUploader';

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
  photoFileName,
  onPhotoChange,
  isPhotoUploading,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5 animate-fade-in">
      <Input
        label="Nama Lengkap &amp; Gelar *"
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Usia Saat Ini
          </label>
          <div className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-700 text-sm border border-gray-200 rounded-lg font-medium flex items-center justify-between dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
            <span>{birthDate ? `${currentAge} Tahun` : '–'}</span>
            <span className="text-[11px] text-slate-400">Otomatis dihitung</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Jenis Kelamin *
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setGender('Laki-Laki')}
            className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
              gender === 'Laki-Laki'
                ? 'bg-[#E0FBFC] text-[#0077B6] border-[#00B4D8] shadow-xs'
                : 'bg-white text-slate-600 border-gray-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            Laki-laki
          </button>
          <button
            type="button"
            onClick={() => setGender('Perempuan')}
            className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
              gender === 'Perempuan'
                ? 'bg-[#E0FBFC] text-[#0077B6] border-[#00B4D8] shadow-xs'
                : 'bg-white text-slate-600 border-gray-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            Perempuan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="No. WhatsApp / HP *"
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
      </div>

      <GuruPhotoUploader
        photoFileName={photoFileName}
        onPhotoChange={onPhotoChange}
        isPhotoUploading={isPhotoUploading}
      />

      <div className="pt-5 border-t border-slate-100 flex justify-end dark:border-slate-800">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={false}
          className="min-w-[140px] font-semibold flex items-center gap-2"
          disabled={isPhotoUploading}
        >
          <span>Lanjut ke Step 2</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
