export interface GuruStep1Props {
  name: string;
  setName: (v: string) => void;
  birthDate: string;
  setBirthDate: (v: string) => void;
  currentAge: number;
  gender: 'Laki-laki' | 'Perempuan';
  setGender: (v: 'Laki-laki' | 'Perempuan') => void;
  phone: string;
  setPhone: (v: string) => void;
  domicile: string;
  setDomicile: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface GuruStep2Props {
  license: string;
  setLicense: (v: string) => void;
  teachingExperience: string;
  setTeachingExperience: (v: string) => void;
  cvFileName: string;
  setCvFileName: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export interface GuruStep3Props {
  selectedPoolIds: number[];
  togglePoolSelection: (id: number) => void;
  availableSlots: string[];
  toggleSlot: (dayIdx: number, sessionIdx: number) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}
