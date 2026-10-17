import {
  Area,
  AvailableInstructor,
  Gender,
  LessonPackage,
  Location,
  PaymentMethod,
  SessionSlot,
  ShirtSize,
} from '@/types';

export interface MuridStep1Props {
  name: string;
  setName: (v: string) => void;
  birthPlace: string;
  setBirthPlace: (v: string) => void;
  birthDate: string;
  setBirthDate: (v: string) => void;
  currentAge: number;
  gender: Gender;
  setGender: (v: Gender) => void;
  address: string;
  setAddress: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  /** Email akun yang sedang login; dipakai sebagai contact person & data pendaftaran. */
  email: string;
  schoolOrOffice: string;
  setSchoolOrOffice: (v: string) => void;
  shirtSize: ShirtSize;
  setShirtSize: (v: ShirtSize) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface MuridStep2Props {
  areas: Area[];
  areaId: string;
  setAreaId: (v: string) => void;
  areaLocations: Location[];
  locationId: string;
  onSelectLocation: (v: string) => void;
  locationPackages: LessonPackage[];
  packageId: string;
  setPackageId: (v: string) => void;
  firstMeetDate: string;
  setFirstMeetDate: (v: string) => void;
  sessions: SessionSlot[];
  sessionLoading: boolean;
  sessionName: string;
  setSessionName: (v: string) => void;
  instructors: AvailableInstructor[];
  instructorLoading: boolean;
  instructorId: string;
  setInstructorId: (v: string) => void;
  photoFileName: string;
  onPhotoChange: (file: File | null) => void;
  isLoadingData: boolean;
  errorMsg: string;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export interface MuridStep3Props {
  name: string;
  locationName: string;
  packageType: string;
  instructorName: string;
  firstMeetDate: string;
  sessionName: string;
  packagePrice: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (v: PaymentMethod) => void;
  paymentProofName: string;
  onPaymentProofChange: (file: File | null) => void;
  isSubmitting: boolean;
  errorMsg: string;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}
