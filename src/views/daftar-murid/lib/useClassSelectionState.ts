import { useState } from 'react';
import { PaymentMethod } from '@/types';

export function useClassSelectionState(setErrorMsg: (msg: string) => void) {
  // Step 2
  const [areaId, setAreaId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [firstMeetDate, setFirstMeetDate] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Step 3
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Transfer Bank');
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);

  const onSelectArea = (id: string) => {
    setAreaId(id);
    setLocationId('');
    setPackageId('');
    setSessionName('');
    setInstructorId('');
  };

  const onSelectLocation = (id: string) => {
    setLocationId(id);
    setPackageId('');
    setSessionName('');
    setInstructorId('');
  };

  const onSelectFirstMeetDate = (val: string) => {
    if (!val) {
      setFirstMeetDate('');
      setSessionName('');
      setInstructorId('');
      return;
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    if (val < todayStr) {
      setErrorMsg('Tanggal rencana pertemuan pertama tidak boleh sebelum hari ini.');
      setFirstMeetDate('');
      setSessionName('');
      setInstructorId('');
      return;
    }

    setErrorMsg('');
    setFirstMeetDate(val);
    setSessionName('');
    setInstructorId('');
  };

  return {
    areaId,
    setAreaId,
    onSelectArea,
    locationId,
    setLocationId,
    onSelectLocation,
    packageId,
    setPackageId,
    firstMeetDate,
    setFirstMeetDate: onSelectFirstMeetDate,
    onSelectFirstMeetDate,
    sessionName,
    setSessionName,
    instructorId,
    setInstructorId,
    photoFile,
    setPhotoFile,
    paymentMethod,
    setPaymentMethod,
    paymentProofFile,
    setPaymentProofFile,
  };
}
