import React from 'react';
import { GuruStep2Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const StepKualifikasi: React.FC<GuruStep2Props> = ({
  license,
  setLicense,
  teachingExperience,
  setTeachingExperience,
  cvFileName,
  setCvFileName,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Input
        label="Nomor / Nama Lisensi Pelatih *"
        placeholder="Contoh: PRSI Level 2 Nasional / FINA Certified"
        value={license}
        onChange={(e) => setLicense(e.target.value)}
        required
      />

      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          Pengalaman Mengajar Renang *
        </label>
        <textarea
          rows={4}
          placeholder="Ceritakan pengalaman Anda melatih anak-anak, privat, maupun klub renang..."
          value={teachingExperience}
          onChange={(e) => setTeachingExperience(e.target.value)}
          required
          className="w-full px-3.5 py-2.5 bg-white text-[#1D3557] text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          Upload Curriculum Vitae (CV) (PDF / DOC / DOCX)
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setCvFileName(e.target.files?.[0]?.name || '')}
          className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#E0FBFC] file:text-[#0077B6] hover:file:bg-[#00B4D8] hover:file:text-white file:cursor-pointer border border-gray-300 rounded-lg p-1.5"
        />
        {cvFileName && (
          <p className="text-xs text-emerald-600 mt-1">✓ Berkas terpilih: {cvFileName}</p>
        )}
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          isFullRounded={true}
          onClick={onBack}
        >
          ← Kembali
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={true}
          className="min-w-[140px]"
        >
          Selanjutnya →
        </Button>
      </div>
    </form>
  );
};
