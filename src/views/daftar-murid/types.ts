import { ClassType, ShirtSize, PaymentMethod, Instructor, Pool } from '@/types';

export interface MuridStep1Props {
  name: string;
  setName: (v: string) => void;
  birthPlace: string;
  setBirthPlace: (v: string) => void;
  birthDate: string;
  setBirthDate: (v: string) => void;
  currentAge: number;
  gender: 'Laki-laki' | 'Perempuan';
  setGender: (v: 'Laki-laki' | 'Perempuan') => void;
  address: string;
  setAddress: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  schoolOrOffice: string;
  setSchoolOrOffice: (v: string) => void;
  shirtSize: ShirtSize;
  setShirtSize: (v: ShirtSize) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface MuridStep2Props {
  poolId: number;
  setPoolId: (v: number) => void;
  classType: ClassType;
  setClassType: (v: ClassType) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  startTime: string;
  setStartTime: (v: string) => void;
  coachName: string;
  setCoachName: (v: string) => void;
  availableCoaches: Instructor[];
  photoFiles: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export interface MuridStep3Props {
  name: string;
  selectedPool: Pool;
  coachName: string;
  classType: ClassType;
  coursePrice: number;
  adminFee: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (v: PaymentMethod) => void;
  paymentProofFile: File | null;
  setPaymentProofFile: (v: File | null) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}
