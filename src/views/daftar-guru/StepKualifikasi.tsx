import React, { useRef, useState } from 'react';
import { GuruStep2Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UploadCloud, CheckCircle2, ArrowLeft, ArrowRight, FileText } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) onCvChange(file);
  };

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

      {/* Modern PDF CV Dropzone (max 10MB) */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Unggah CV / Sertifikat Pelatih * (Format PDF, maks 10 MB)
        </label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#00B4D8] bg-[#E0FBFC]/30'
              : cvFileName
                ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800'
                : 'border-slate-200 hover:border-[#00B4D8] bg-slate-50/50 hover:bg-[#E0FBFC]/10 dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0] ?? null;
              e.currentTarget.value = '';
              onCvChange(file);
            }}
            className="hidden"
          />
          {cvFileName ? (
            <div className="flex flex-col items-center justify-center gap-1.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                {cvFileName}
              </p>
              <p className="text-[11px] text-slate-400">Klik untuk mengganti dokumen PDF</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
              <FileText className="w-7 h-7 text-[#0077B6]" />
              <p className="text-xs font-semibold text-[#1D3557] dark:text-slate-200">
                Tarik &amp; lepas berkas CV (PDF) ke sini, atau <span className="text-[#0077B6] underline">pilih file</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Dokumen riwayat hidup &amp; sertifikat lisensi resmi untuk ditinjau admin
              </p>
            </div>
          )}
        </div>
        {isCvUploading && (
          <p className="text-xs text-slate-400 mt-1.5">Sedang mengunggah dokumen...</p>
        )}
      </div>

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
