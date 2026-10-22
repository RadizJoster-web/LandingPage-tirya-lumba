import { Area, Gender, Location, SessionSlot } from '@/types';

export interface GuruStep1Props {
  name: string;
  setName: (v: string) => void;
  birthDate: string;
  setBirthDate: (v: string) => void;
  currentAge: number;
  gender: Gender;
  setGender: (v: Gender) => void;
  phone: string;
  setPhone: (v: string) => void;
  domicile: string;
  setDomicile: (v: string) => void;
  photoFileName: string;
  onPhotoChange: (file: File | null) => void;
  isPhotoUploading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export interface GuruStep2Props {
  license: string;
  setLicense: (v: string) => void;
  experience: string;
  setExperience: (v: string) => void;
  shortBio: string;
  setShortBio: (v: string) => void;
  cvFileName: string;
  onCvChange: (file: File | null) => void;
  isCvUploading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export interface GuruStep3Props {
  areas: Area[];
  locations: Location[];
  /** Kolam yang dicentang pelatih; boleh lebih dari satu. */
  selectedLocationIds: string[];
  onToggleLocation: (id: string) => void;
  /** Sesi server per kolam (semua hari), untuk membentuk grid hari × sesi. */
  sessionMap: Record<string, SessionSlot[]>;
  sessionsLoading: boolean;
  /** Kunci sel terpilih: `locationId|hari|nama sesi`. */
  selectedSlots: string[];
  onToggleSlot: (key: string) => void;
  slotCount: number;
  errorMsg: string;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}
