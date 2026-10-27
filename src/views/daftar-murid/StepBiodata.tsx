import React, { useRef, useState } from 'react';
import { MuridStep1Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ShirtSizeSelector } from './ShirtSizeSelector';
import { UploadCloud, CheckCircle2, ArrowRight } from 'lucide-react';

export const StepBiodata: React.FC<MuridStep1Props> = ({
  name,
  setName,
  birthPlace,
  setBirthPlace,
  birthDate,
  setBirthDate,
  currentAge,
  gender,
  setGender,
  address,
  setAddress,
  phone,
  setPhone,
  email,
  schoolOrOffice,
  setSchoolOrOffice,
  shirtSize,
  setShirtSize,
  photoFileName,
  onPhotoChange,
  onSubmit,
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
    if (file) onPhotoChange(file);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 animate-fade-in">
      <Input
        label="Nama Lengkap *"
        placeholder="Contoh: Muhammad Farhan"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Tempat Lahir *"
          placeholder="Contoh: Tangerang"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          required
        />
        <Input
          label="Tanggal Lahir *"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Usia Saat Ini
          </label>
          <div className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-700 text-sm border border-gray-200 rounded-lg font-medium flex items-center justify-between dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
            <span>{birthDate ? `${currentAge} Tahun` : '–'}</span>
            <span className="text-[11px] text-slate-400">Otomatis dihitung</span>
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
      </div>

      <Input
        label="Alamat Rumah Domisili *"
        placeholder="Jl. Melati No. 10, Tangerang"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="No. WhatsApp / HP *"
          type="tel"
          placeholder="081234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Alamat Email
          </label>
          <div className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-700 text-sm border border-gray-200 rounded-lg font-medium truncate dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
            {email}
          </div>
        </div>
      </div>

      <Input
        label="Nama Sekolah / Institusi / Kantor *"
        placeholder="Contoh: SMA Negeri 1 Tangerang"
        value={schoolOrOffice}
        onChange={(e) => setSchoolOrOffice(e.target.value)}
        required
      />

      <ShirtSizeSelector shirtSize={shirtSize} setShirtSize={setShirtSize} />

      {/* Modern Drag and Drop Photo Uploader (4x6 max 5MB) */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Pas Foto Profil Murid (4x6) * (JPG / PNG maks 5 MB)
        </label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#00B4D8] bg-[#E0FBFC]/30'
              : photoFileName
                ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800'
                : 'border-slate-200 hover:border-[#00B4D8] bg-slate-50/50 hover:bg-[#E0FBFC]/10 dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
            className="hidden"
          />
          {photoFileName ? (
            <div className="flex flex-col items-center justify-center gap-1.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                {photoFileName}
              </p>
              <p className="text-[11px] text-slate-400">Klik untuk mengganti foto</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
              <UploadCloud className="w-7 h-7 text-[#0077B6]" />
              <p className="text-xs font-semibold text-[#1D3557] dark:text-slate-200">
                Tarik &amp; lepas pas foto ke sini, atau <span className="text-[#0077B6] underline">pilih file</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Digunakan untuk verifikasi profil kesiswaan dan pengenalan oleh pelatih
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 border-t border-slate-100 flex justify-end dark:border-slate-800">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={false}
          className="min-w-[140px] font-semibold flex items-center gap-2"
        >
          <span>Lanjut ke Step 2</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
