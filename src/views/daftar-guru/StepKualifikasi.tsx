import React from 'react';
import { GuruStep2Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GuruCvUploader } from './GuruCvUploader';

export const StepKualifikasi: React.FC<GuruStep2Props> = ({
  license,
  setLicense,
  experience,
  setExperience,
  shortBio,
  setShortBio,
  cvFileName,
  onCvChange,
  isCvUploading,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5 animate-fade-in">
      <Input
        label="Nomor / Nama Lisensi Pelatih *"
        placeholder="Contoh: Lisensi C FINA / PRSI Level 2"
        value={license}
        onChange={(e) => setLicense(e.target.value)}
        required
      />

      <Input
        label="Pengalaman Mengajar *"
        placeholder="Contoh: 5 Tahun melatih renang anak & dewasa"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
      />

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Ringkasan Profil Singkat *
        </label>
        <textarea
          rows={3}
          placeholder="Ceritakan singkat keahlian kepelatihan Anda, spesialisasi gaya renang, atau pengalaman menangani atlet."
          value={shortBio}
          onChange={(e) => setShortBio(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white text-[#1D3557] text-sm border border-gray-200 rounded-lg shadow-xs focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100"
          required
        />
      </div>

      <GuruCvUploader
        cvFileName={cvFileName}
        onCvChange={onCvChange}
        isCvUploading={isCvUploading}
      />

      <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-3 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          size="md"
          isFullRounded={false}
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={false}
          disabled={isCvUploading}
          className="font-semibold flex items-center gap-2"
        >
          <span>Lanjut ke Step 3</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
