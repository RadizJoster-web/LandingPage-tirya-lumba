import React from 'react';
import { MuridStep1Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ShirtSizeSelector } from './ShirtSizeSelector';

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
  return (
    <form onSubmit={onSubmit} className="space-y-5">
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
          <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
            Usia Saat Ini (Dihitung Otomatis)
          </label>
          <input
            readOnly
            value={birthDate ? `${currentAge} Tahun` : '-'}
            className="w-full px-3.5 py-2.5 bg-slate-100 text-slate-700 text-sm sm:text-base border border-gray-300 rounded-lg cursor-not-allowed font-medium"
          />
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
          label="No. Telp / WhatsApp *"
          type="tel"
          placeholder="081234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div>
          <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
            Alamat Email (Otomatis dari Akun)
          </label>
          <input
            readOnly
            value={email}
            className="w-full px-3.5 py-2.5 bg-slate-100 text-slate-700 text-sm sm:text-base border border-gray-300 rounded-lg cursor-not-allowed font-medium"
          />
        </div>
      </div>

      <Input
        label="Nama Sekolah / Kantor *"
        placeholder="Contoh: SMA Negeri 1 Tangerang"
        value={schoolOrOffice}
        onChange={(e) => setSchoolOrOffice(e.target.value)}
        required
      />

      <ShirtSizeSelector shirtSize={shirtSize} setShirtSize={setShirtSize} />

      {/* Upload Foto Profil Murid (Pindah dari Step 2 ke Step 1) */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          Pas Foto Profil Murid (4x6) * (JPG/PNG maks 5 MB)
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-slate-600 border border-gray-300 rounded-lg px-3 py-2 bg-white file:mr-3 file:px-3 file:py-1.5 file:rounded-full file:border-0 file:bg-[#E0FBFC] file:text-[#0077B6] file:font-semibold file:cursor-pointer"
        />
        {photoFileName ? (
          <p className="text-xs text-emerald-600 font-semibold mt-1.5">
            ✓ {photoFileName}
          </p>
        ) : (
          <p className="text-xs text-slate-400 mt-1">
            Digunakan untuk verifikasi akun kesiswaan dan pengenalan oleh pelatih saat latihan.
          </p>
        )}
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <Button type="submit" variant="primary" size="md" isFullRounded={true} className="min-w-[140px]">
          Selanjutnya →
        </Button>
      </div>
    </form>
  );
};
