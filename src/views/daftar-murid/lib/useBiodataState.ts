import { useEffect, useRef, useState } from 'react';
import { AuthUser, ShirtSize, StudentRegistrationSnapshot } from '@/types';

export function useBiodataState(
  initialSnapshot?: StudentRegistrationSnapshot | null,
  currentUser?: AuthUser | null,
) {
  const [name, setName] = useState(
    initialSnapshot?.fullName || currentUser?.fullName || '',
  );
  const [birthPlace, setBirthPlace] = useState(
    initialSnapshot?.birthPlace || '',
  );
  const [birthDate, setBirthDate] = useState(initialSnapshot?.birthDate || '');
  const [gender, setGender] = useState<'Laki-Laki' | 'Perempuan'>(
    (initialSnapshot?.gender as 'Laki-Laki' | 'Perempuan') || 'Laki-Laki',
  );
  const [address, setAddress] = useState(initialSnapshot?.address || '');
  const [phone, setPhone] = useState(
    initialSnapshot?.phone || currentUser?.phone || '',
  );
  const [schoolOrOffice, setSchoolOrOffice] = useState(
    initialSnapshot?.schoolOrOffice || '',
  );
  const [shirtSize, setShirtSize] = useState<ShirtSize>(
    initialSnapshot?.tshirtSize || 'M',
  );

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    if (initialSnapshot) {
      if (initialSnapshot.fullName) setName(initialSnapshot.fullName);
      if (initialSnapshot.phone) setPhone(initialSnapshot.phone);
      if (initialSnapshot.birthPlace) setBirthPlace(initialSnapshot.birthPlace);
      if (initialSnapshot.birthDate) setBirthDate(initialSnapshot.birthDate);
      if (initialSnapshot.gender) {
        setGender(initialSnapshot.gender as 'Laki-Laki' | 'Perempuan');
      }
      if (initialSnapshot.address) setAddress(initialSnapshot.address);
      if (initialSnapshot.schoolOrOffice) {
        setSchoolOrOffice(initialSnapshot.schoolOrOffice);
      }
      if (initialSnapshot.tshirtSize) setShirtSize(initialSnapshot.tshirtSize);

      initializedRef.current = true;
    } else if (currentUser) {
      if (currentUser.fullName && !name) setName(currentUser.fullName);
      if (currentUser.phone && !phone) setPhone(currentUser.phone);
    }
  }, [initialSnapshot, currentUser, name, phone]);

  return {
    name,
    setName,
    birthPlace,
    setBirthPlace,
    birthDate,
    setBirthDate,
    gender,
    setGender,
    address,
    setAddress,
    phone,
    setPhone,
    schoolOrOffice,
    setSchoolOrOffice,
    shirtSize,
    setShirtSize,
  };
}
