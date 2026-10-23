import { CS_WHATSAPP } from '@/lib/constants';

interface RescheduleWaParams {
  fullName: string;
  registrationId: string;
  oldScheduleLabel: string;
  newDay: string;
  newSession: string;
}

export function formatRescheduleWaUrl({
  fullName,
  registrationId,
  oldScheduleLabel,
  newDay,
  newSession,
}: RescheduleWaParams): string {
  const message = encodeURIComponent(
    `Halo Admin PT Tirya Lumba, saya ${fullName} (ID: ${registrationId}).\n` +
      `Saya ingin mengajukan reschedule jadwal mengajar:\n` +
      `- Lama: ${oldScheduleLabel}\n- Baru: ${newDay}, ${newSession}\n` +
      `Mohon dibantu pembaruannya. Terima kasih.`,
  );
  return `https://wa.me/${CS_WHATSAPP}?text=${message}`;
}
