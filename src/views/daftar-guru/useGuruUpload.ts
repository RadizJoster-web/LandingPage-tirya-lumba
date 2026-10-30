import { useRef, useState } from 'react';
import { toErrorMessage } from '@/lib/http';

const MAX_FILE_SIZE_BYTES = 4.5 * 1024 * 1024; // Batas Vercel Serverless Function 4.5 MB

interface GuruUploadProps {
  uploadCv: (file: File) => Promise<string>;
  uploadProfilePicture: (file: File) => Promise<string>;
  setCvFile: (file: File | null) => void;
  setCvUrl: (url: string) => void;
  setPhotoFile: (file: File | null) => void;
  setProfilePictureUrl: (url: string) => void;
  setErrorMsg: (msg: string) => void;
}

export function useGuruUpload({
  uploadCv,
  uploadProfilePicture,
  setCvFile,
  setCvUrl,
  setPhotoFile,
  setProfilePictureUrl,
  setErrorMsg,
}: GuruUploadProps) {
  const [isCvUploading, setIsCvUploading] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const cvUploadId = useRef(0);
  const photoUploadId = useRef(0);

  const handleCvChange = async (file: File | null) => {
    const uploadId = ++cvUploadId.current;
    setErrorMsg('');

    if (!file) {
      setCvFile(null);
      setCvUrl('');
      setIsCvUploading(false);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setCvFile(null);
      setCvUrl('');
      setIsCvUploading(false);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setErrorMsg(
        `Ukuran berkas CV '${file.name}' (${sizeMb} MB) melebihi batas maksimal 4.5 MB. Mohon gunakan dokumen PDF dengan ukuran di bawah 4.5 MB atau kompres berkas Anda.`,
      );
      return;
    }

    setCvFile(file);
    setCvUrl('');
    setIsCvUploading(true);

    try {
      const url = await uploadCv(file);
      if (uploadId === cvUploadId.current) {
        setCvUrl(url);
      }
    } catch (err) {
      if (uploadId === cvUploadId.current) {
        setCvFile(null);
        setCvUrl('');
        setErrorMsg(toErrorMessage(err));
      }
    } finally {
      if (uploadId === cvUploadId.current) {
        setIsCvUploading(false);
      }
    }
  };

  const handlePhotoChange = async (file: File | null) => {
    const uploadId = ++photoUploadId.current;
    setErrorMsg('');

    if (!file) {
      setPhotoFile(null);
      setProfilePictureUrl('');
      setIsPhotoUploading(false);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setPhotoFile(null);
      setProfilePictureUrl('');
      setIsPhotoUploading(false);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setErrorMsg(
        `Ukuran foto profil '${file.name}' (${sizeMb} MB) melebihi batas maksimal 4.5 MB. Mohon gunakan foto dengan ukuran lebih kecil.`,
      );
      return;
    }

    setPhotoFile(file);
    setProfilePictureUrl('');
    setIsPhotoUploading(true);

    try {
      const url = await uploadProfilePicture(file);
      if (uploadId === photoUploadId.current) {
        setProfilePictureUrl(url);
      }
    } catch (err) {
      if (uploadId === photoUploadId.current) {
        setPhotoFile(null);
        setProfilePictureUrl('');
        setErrorMsg(toErrorMessage(err));
      }
    } finally {
      if (uploadId === photoUploadId.current) {
        setIsPhotoUploading(false);
      }
    }
  };

  return {
    isCvUploading,
    isPhotoUploading,
    handleCvChange,
    handlePhotoChange,
  };
}
