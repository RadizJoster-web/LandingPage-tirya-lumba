import {
  RegistrationResult,
  StudentRegistrationPayload,
  StudentRegistrationSnapshot,
} from '@/types';
import { paymentMethodToApi } from '@/lib/utils';
import { useMuridForm } from './useMuridForm';

interface SnapshotParams {
  payload: StudentRegistrationPayload;
  result: RegistrationResult;
  locationLabel: string;
  packageType: string;
  packagePrice: number;
  instructorName: string;
  photoFileName?: string;
  proofUrlReported: boolean;
}

export function buildStudentSnapshot(params: SnapshotParams): StudentRegistrationSnapshot {
  const { payload, result, locationLabel, packageType, packagePrice, instructorName, photoFileName, proofUrlReported } = params;
  return {
    ...payload,
    kind: 'student',
    registrationId: result.registrationId,
    status: result.status,
    submittedAt: Date.now(),
    locationLabel,
    packageType,
    packagePrice,
    instructorName,
    photoFileName,
    uploadNotice:
      !proofUrlReported || !payload.profilePictureUrl
        ? 'Beberapa berkas tidak mengembalikan URL dari server. Kirim berkas pendaftaran via WhatsApp CS agar admin dapat memverifikasi.'
        : undefined,
  };
}

export function buildStudentPayload(
  form: ReturnType<typeof useMuridForm>,
  photoUrl: string,
  proofUrl: string,
): StudentRegistrationPayload {
  return {
    profilePictureUrl: photoUrl,
    fullName: form.name,
    birthPlace: form.birthPlace,
    birthDate: form.birthDate,
    gender: form.gender,
    address: form.address,
    phone: form.phone,
    email: form.userEmail,
    schoolOrOffice: form.schoolOrOffice,
    tshirtSize: form.shirtSize,
    locationId: form.locationId,
    packageId: form.packageId,
    firstMeetDate: form.firstMeetDate,
    firstMeetSession: form.sessionName,
    instructorId: form.instructorId,
    paymentMethod: paymentMethodToApi(form.paymentMethod),
    paymentProofUrl: proofUrl,
  };
}

export function createStudentSnapshot(
  form: ReturnType<typeof useMuridForm>,
  payload: StudentRegistrationPayload,
  result: RegistrationResult,
  proofUrlReported: boolean,
): StudentRegistrationSnapshot {
  return buildStudentSnapshot({
    payload,
    result,
    locationLabel: form.selectedLocation?.name ?? '',
    packageType: form.selectedPackage?.type ?? '',
    packagePrice: form.grandTotal,
    instructorName: form.selectedInstructor?.fullName ?? '',
    photoFileName: form.photoFile?.name,
    proofUrlReported,
  });
}
