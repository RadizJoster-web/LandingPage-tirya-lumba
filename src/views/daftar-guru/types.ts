import { Area, Gender, InstructorScheduleInput, Location, SessionSlot } from '@/types';

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
  photoFileName: string;
  onPhotoChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export interface GuruStep3Props {
  areas: Area[];
  areaId: string;
  setAreaId: (v: string) => void;
  areaLocations: Location[];
  locationId: string;
  setLocationId: (v: string) => void;
  dayOfWeek: string;
  setDayOfWeek: (v: string) => void;
  sessions: SessionSlot[];
  sessionLoading: boolean;
  sessionName: string;
  setSessionName: (v: string) => void;
  schedules: InstructorScheduleInput[];
  onAddSchedule: () => void;
  onRemoveSchedule: (index: number) => void;
  scheduleLabels: string[];
  errorMsg: string;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}
