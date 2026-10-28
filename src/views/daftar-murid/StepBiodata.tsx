import React from 'react';
import { MuridStep1Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ShirtSizeSelector } from './ShirtSizeSelector';
import { GenderAndAgeInput } from './GenderAndAgeInput';
import { StudentPhotoUploader } from './StudentPhotoUploader';
import { ArrowRight } from 'lucide-react';

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

      <GenderAndAgeInput
        birthDate={birthDate}
        currentAge={currentAge}
        gender={gender}
        setGender={setGender}
      />

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

      <StudentPhotoUploader
        photoFileName={photoFileName}
        onPhotoChange={onPhotoChange}
      />

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
