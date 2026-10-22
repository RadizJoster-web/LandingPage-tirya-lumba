import React from 'react';
import { GuruStep2Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
    <form onSubmit={onSubmit} className="space-y-5">
      <Input
        label="Nomor / Nama Lisensi Pelatih *"
        placeholder="Contoh: Lisensi C FINA / PRSI Level 2"
        value={license}
        onChange={(e) => setLicense(e.target.value)}
        required
      />

      <Input
        label="Pengalaman Mengajar *"
        placeholder="Contoh: 5 Tahun"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
      />

      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          Ringkasan Profil Singkat *
        </label>
        <textarea
          rows={3}
          placeholder="Ceritakan singkat keahlian Anda, misalnya spesialisasi anak pemula atau atlet prestasi."
          value={shortBio}
          onChange={(e) => setShortBio(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white text-[#1D3557] text-sm border border-gray-300 rounded-lg shadow-xs focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/30"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          Unggah CV / Sertifikat Pelatih * (PDF, maks 5 MB)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0] ?? null;
            e.currentTarget.value = '';
            onCvChange(file);
          }}
          className="w-full text-sm text-slate-600 border border-gray-300 rounded-lg px-3 py-2 bg-white file:mr-3 file:px-3 file:py-1.5 file:rounded-full file:border-0 file:bg-[#E0FBFC] file:text-[#0077B6] file:font-semibold file:cursor-pointer"
        />
        {cvFileName && (
          <p className="text-xs text-emerald-600 font-semibold mt-1.5">
            ✓ {cvFileName}
          </p>
        )}
        {isCvUploading && (
          <p className="text-xs text-slate-500 mt-1.5">Mengunggah CV...</p>
        )}
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
        <Button type="button" variant="outline" size="md" onClick={onBack}>
          ← Kembali
        </Button>
        <Button type="submit" variant="primary" size="md" disabled={isCvUploading}>
          Selanjutnya →
        </Button>
      </div>
    </form>
  );
};
