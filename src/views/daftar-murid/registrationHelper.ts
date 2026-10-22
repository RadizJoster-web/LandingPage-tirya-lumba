import {
  RegistrationResult,
  StudentRegistrationPayload,
  StudentRegistrationSnapshot,
} from '@/types';

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
