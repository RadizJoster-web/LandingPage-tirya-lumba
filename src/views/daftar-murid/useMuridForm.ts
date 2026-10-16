import { useState, useMemo } from 'react';
import { INITIAL_POOLS, INITIAL_INSTRUCTORS } from '@/lib/constants';
import { calculateAge, calculatePackagePrice } from '@/lib/utils';
import { ClassType, ShirtSize, PaymentMethod, Instructor, Pool } from '@/types';

export function useMuridForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMsg, setErrorMsg] = useState('');

  // Step 1
  const [name, setName] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolOrOffice, setSchoolOrOffice] = useState('');
  const [shirtSize, setShirtSize] = useState<ShirtSize>('M');

  // Step 2
  const [poolId, setPoolId] = useState<number>(1);
  const [classType, setClassType] = useState<ClassType>('Reguler');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [coachName, setCoachName] = useState('');
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  // Step 3
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('QRIS');
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentAge = calculateAge(birthDate);
  const selectedPool: Pool = INITIAL_POOLS.find((p) => p.id === poolId) || INITIAL_POOLS[0];
  const basePrice = classType === 'Privat' ? selectedPool.pricePrivate : selectedPool.priceReguler;
  const coursePrice = calculatePackagePrice(basePrice, classType, 8);
  const adminFee = 5000;
  const grandTotal = coursePrice + adminFee;

  const availableCoaches: Instructor[] = useMemo(() => {
    if (!startDate || !startTime) return [];
    const dayOfWeek = new Date(startDate).getDay();
    const hour = parseInt(startTime.split(':')[0], 10);
    return INITIAL_INSTRUCTORS.filter(
      (c) => c.availableDays.includes(dayOfWeek) && c.poolIds.includes(poolId) && hour >= 7 && hour <= 18
    );
  }, [startDate, startTime, poolId]);

  return {
    step, setStep, errorMsg, setErrorMsg,
    name, setName, birthPlace, setBirthPlace, birthDate, setBirthDate,
    gender, setGender, address, setAddress, phone, setPhone,
    schoolOrOffice, setSchoolOrOffice, shirtSize, setShirtSize,
    poolId, setPoolId, classType, setClassType, startDate, setStartDate,
    startTime, setStartTime, coachName, setCoachName, photoFiles, setPhotoFiles,
    paymentMethod, setPaymentMethod, paymentProofFile, setPaymentProofFile,
    isSubmitting, setIsSubmitting, currentAge, selectedPool, coursePrice,
    adminFee, grandTotal, availableCoaches,
  };
}
