import { InstructorRegistrationPayload, RegistrationResult, RegistrationSnapshot } from '@/types';
import { useGuruForm } from '../useGuruForm';

interface BuildSnapshotParams {
  payload: InstructorRegistrationPayload;
  result: RegistrationResult;
  scheduleLabels: string[];
}

export function buildInstructorSnapshot({
  payload,
  result,
  scheduleLabels,
}: BuildSnapshotParams): RegistrationSnapshot {
  return {
    kind: 'instructor',
    fullName: payload.fullName,
    phone: payload.phone,
    birthDate: payload.birthDate,
    gender: payload.gender,
    address: payload.address,
    shortBio: payload.shortBio,
    license: payload.license,
    experience: payload.experience,
    schedules: payload.schedules,
    profilePictureUrl: payload.profilePictureUrl,
    cvUrl: payload.cvUrl,
    registrationId: result.registrationId,
    status: result.status,
    submittedAt: Date.now(),
    scheduleLabels,
  };
}

export function buildInstructorPayload(
  form: ReturnType<typeof useGuruForm>,
): InstructorRegistrationPayload {
  return {
    fullName: form.name,
    phone: form.phone,
    birthDate: form.birthDate,
    gender: form.gender,
    address: form.domicile,
    shortBio: form.shortBio,
    license: form.license,
    experience: form.experience,
    schedules: form.schedules,
    profilePictureUrl: form.profilePictureUrl,
    cvUrl: form.cvUrl,
  };
}
