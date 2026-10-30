import { useRouter } from 'next/navigation';
import { toErrorMessage } from '@/lib/http';
import { UseMuridFormReturn } from '../useMuridForm';
import { buildStudentPayload, createStudentSnapshot } from '../registrationHelper';
import { uploadStudentPhoto, uploadPaymentProof, submitStudent } from './api';
import { RegistrationSnapshot } from '@/types';

const MAX_UPLOAD_BYTES = 4.5 * 1024 * 1024;

interface UseMuridSubmitParams {
  form: UseMuridFormReturn;
  photoUrl: string;
  setPhotoUrl: (url: string) => void;
  paymentProofUrl: string;
  setPaymentProofUrl?: (url: string) => void;
  persistRegistration: (snapshot: RegistrationSnapshot) => void;
  refreshRegistration: () => Promise<RegistrationSnapshot | null>;
}

export function useMuridSubmit({
  form,
  photoUrl,
  setPhotoUrl,
  paymentProofUrl,
  setPaymentProofUrl,
  persistRegistration,
  refreshRegistration,
}: UseMuridSubmitParams) {
  const router = useRouter();

  const handleNextStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');

    if (!form.name || !form.birthPlace || !form.birthDate || !form.address || !form.phone || !form.schoolOrOffice) {
      form.setErrorMsg('Mohon lengkapi seluruh kolom biodata bertanda bintang (*).');
      return;
    }

    const hasPhoto = Boolean(form.photoFile || photoUrl);
    if (!hasPhoto) {
      form.setErrorMsg('Silakan unggah pas foto profil 4x6 murid terlebih dahulu.');
      return;
    }

    if (form.photoFile && form.photoFile.size > MAX_UPLOAD_BYTES) {
      const sizeMb = (form.photoFile.size / (1024 * 1024)).toFixed(1);
      form.setErrorMsg(`Ukuran foto profil (${sizeMb} MB) melebihi batas maksimal 4.5 MB.`);
      return;
    }

    form.setIsSubmitting(true);
    try {
      if (form.photoFile) {
        const photo = await uploadStudentPhoto(form.photoFile);
        setPhotoUrl(photo.url);
      }
      form.setStep(2);
    } catch (err) {
      form.setErrorMsg(`Gagal mengunggah foto profil 4x6: ${toErrorMessage(err)}`);
    } finally {
      form.setIsSubmitting(false);
    }
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');

    if (!form.locationId || !form.packageId || !form.firstMeetDate || !form.sessionName || !form.instructorId) {
      form.setErrorMsg('Pastikan kolam renang, paket, tanggal mulai, jam sesi, dan pelatih sudah dipilih.');
      return;
    }

    form.setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');

    const hasPaymentProof = Boolean(form.paymentProofFile || paymentProofUrl);
    if (!hasPaymentProof) {
      form.setErrorMsg('Bukti pembayaran wajib diunggah.');
      return;
    }

    if (form.paymentProofFile && form.paymentProofFile.size > MAX_UPLOAD_BYTES) {
      const sizeMb = (form.paymentProofFile.size / (1024 * 1024)).toFixed(1);
      form.setErrorMsg(`Ukuran bukti transfer (${sizeMb} MB) melebihi batas maksimal 4.5 MB.`);
      return;
    }

    form.setIsSubmitting(true);
    try {
      let finalProofUrl = paymentProofUrl;
      let reported = Boolean(paymentProofUrl);

      if (form.paymentProofFile) {
        const proof = await uploadPaymentProof(form.paymentProofFile);
        finalProofUrl = proof.url;
        reported = proof.urlReported;
        setPaymentProofUrl?.(proof.url);
        form.setPaymentProofFile(null);
      }

      const payload = buildStudentPayload(form, photoUrl, finalProofUrl);
      const res = await submitStudent(payload);

      persistRegistration(createStudentSnapshot(form, payload, res, reported));
      await refreshRegistration();

      router.push('/profile');
    } catch (err) {
      form.setErrorMsg(`Gagal memproses pendaftaran murid: ${toErrorMessage(err)}`);
    } finally {
      form.setIsSubmitting(false);
    }
  };

  return {
    handleNextStep1,
    handleNextStep2,
    handleSubmit,
  };
}
