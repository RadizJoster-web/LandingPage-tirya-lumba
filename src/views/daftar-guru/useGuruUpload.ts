import { useRef, useState } from 'react';
import { toErrorMessage } from '@/lib/http';

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
    setCvFile(file);
    setCvUrl('');
    setErrorMsg('');
    if (!file) {
      setIsCvUploading(false);
      return;
    }
    setIsCvUploading(true);
    try {
      const url = await uploadCv(file);
      if (uploadId === cvUploadId.current) setCvUrl(url);
    } catch (err) {
      if (uploadId === cvUploadId.current) setErrorMsg(toErrorMessage(err));
    } finally {
      if (uploadId === cvUploadId.current) setIsCvUploading(false);
    }
  };

  const handlePhotoChange = async (file: File | null) => {
    const uploadId = ++photoUploadId.current;
    setPhotoFile(file);
    setProfilePictureUrl('');
    setErrorMsg('');
    if (!file) {
      setIsPhotoUploading(false);
      return;
    }
    setIsPhotoUploading(true);
    try {
      const url = await uploadProfilePicture(file);
      if (uploadId === photoUploadId.current) setProfilePictureUrl(url);
    } catch (err) {
      if (uploadId === photoUploadId.current) setErrorMsg(toErrorMessage(err));
    } finally {
      if (uploadId === photoUploadId.current) setIsPhotoUploading(false);
    }
  };

  return {
    isCvUploading,
    isPhotoUploading,
    handleCvChange,
    handlePhotoChange,
  };
}
