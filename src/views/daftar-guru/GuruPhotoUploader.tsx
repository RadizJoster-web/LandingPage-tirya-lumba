import React, { useRef, useState } from 'react';
import { CheckCircle2, Loader2, UploadCloud } from 'lucide-react';

interface GuruPhotoUploaderProps {
  photoFileName: string;
  onPhotoChange: (file: File | null) => void;
  isPhotoUploading: boolean;
}

export const GuruPhotoUploader: React.FC<GuruPhotoUploaderProps> = ({
  photoFileName,
  onPhotoChange,
  isPhotoUploading,
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
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        Foto Profil Pelatih * (JPG / PNG maks 4.5 MB)
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isPhotoUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-[#00B4D8] bg-[#E0FBFC]/30'
            : isPhotoUploading
              ? 'border-[#00B4D8] bg-[#E0FBFC]/10 cursor-wait'
              : photoFileName
                ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800'
                : 'border-slate-200 hover:border-[#00B4D8] bg-slate-50/50 hover:bg-[#E0FBFC]/10 dark:border-slate-800 dark:bg-slate-900'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isPhotoUploading}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0] ?? null;
            e.currentTarget.value = '';
            onPhotoChange(file);
          }}
          className="hidden"
        />
        {isPhotoUploading ? (
          <div className="flex flex-col items-center justify-center gap-1.5 py-1">
            <Loader2 className="w-6 h-6 text-[#0077B6] animate-spin" />
            <p className="text-xs font-bold text-[#0077B6]">
              Mengunggah foto profil ke server...
            </p>
            <p className="text-[11px] text-slate-400">Mohon tunggu sebentar</p>
          </div>
        ) : photoFileName ? (
          <div className="flex flex-col items-center justify-center gap-1.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
              {photoFileName}
            </p>
            <p className="text-[11px] text-slate-400">Foto siap • Klik untuk mengganti</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
            <UploadCloud className="w-7 h-7 text-[#0077B6]" />
            <p className="text-xs font-semibold text-[#1D3557] dark:text-slate-200">
              Tarik &amp; lepas foto di sini, atau <span className="text-[#0077B6] underline">pilih file</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Foto formal tampak depan berlatar polos (maksimal 4.5 MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
