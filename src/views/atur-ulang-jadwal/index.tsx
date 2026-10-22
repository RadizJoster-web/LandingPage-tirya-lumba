'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { CS_WHATSAPP } from '@/lib/constants';
import { SessionSlot } from '@/types';
import { request, toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { SlotSelector } from './SlotSelector';
import { RescheduleActions } from './RescheduleActions';

/** Ambil sesi jam operasional kolam untuk hari tertentu dari server. */
async function fetchSessions(
  locationId: string,
  dayOfWeek: string,
): Promise<SessionSlot[]> {
  const query = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${query}`, {
    method: 'GET',
  });
  return res.data;
}

export default function AturUlangJadwalParent() {
  const router = useRouter();
  const { user, registration, isLoading } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [newDay, setNewDay] = useState('');
  const [newSession, setNewSession] = useState('');
  const [sessionState, setSessionState] = useState<{
    key: string;
    rows: SessionSlot[];
  } | null>(null);
  const [notification, setNotification] = useState<string>('');

  const instructorReg =
    registration?.kind === 'instructor' ? registration : null;
  const schedules = useMemo(
    () => instructorReg?.schedules ?? [],
    [instructorReg],
  );
  const scheduleLabels = useMemo(
    () => instructorReg?.scheduleLabels ?? [],
    [instructorReg],
  );

  useEffect(() => {
    if (!isLoading && (!user || !instructorReg)) router.push('/profile');
  }, [user, isLoading, instructorReg, router]);

  const selectedSchedule = schedules[selectedIndex];
  const sessionKey =
    selectedSchedule && newDay
      ? `${selectedSchedule.locationId}|${newDay}`
      : '';
  const sessions = sessionState?.key === sessionKey ? sessionState.rows : [];
  const sessionLoading =
    Boolean(sessionKey) && sessionState?.key !== sessionKey;

  useEffect(() => {
    if (!sessionKey) return;
    const [locationKey, day] = sessionKey.split('|');
    let active = true;
    fetchSessions(locationKey, day)
      .then((rows) => {
        if (active) setSessionState({ key: sessionKey, rows });
      })
      .catch((error) => {
        if (active) {
          setSessionState({ key: sessionKey, rows: [] });
          setNotification(toErrorMessage(error));
        }
      });
    return () => {
      active = false;
    };
  }, [sessionKey]);

  if (isLoading || !user || !instructorReg) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSubmit = () => {
    setNotification('');
    if (selectedIndex < 0 || !newDay || !newSession) {
      setNotification(
        'Pilih jadwal lama serta hari dan sesi baru yang diinginkan.',
      );
      return;
    }
    const message = encodeURIComponent(
      `Halo Admin PT Tirya Lumba, saya ${instructorReg.fullName} (ID: ${instructorReg.registrationId}).\n` +
        `Saya ingin mengajukan reschedule jadwal mengajar:\n` +
        `- Lama: ${scheduleLabels[selectedIndex]}\n- Baru: ${newDay}, ${newSession}\n` +
        `Mohon dibantu pembaruannya. Terima kasih.`,
    );
    window.open(
      `https://wa.me/${CS_WHATSAPP}?text=${message}`,
      '_blank',
      'noopener',
    );
    setNotification(
      'Pengajuan reschedule dibuka di WhatsApp. Kirim pesan tersebut ke admin.',
    );
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-xl mx-auto">
        <div className="mb-4">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8]"
          >
            ← Kembali ke Profil
          </Link>
        </div>

        <Card variant="dashboard" className="p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="font-heading font-extrabold text-2xl text-[#1D3557] mb-1">
              Atur Ulang Jadwal Mengajar
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Pilih jadwal yang ingin diganti, lalu tentukan hari dan sesi baru
              dari jadwal resmi server.
            </p>
          </div>

          {notification && (
            <div className="mb-6 p-4 rounded-lg text-xs font-semibold bg-[#E0FBFC] text-[#0077B6] border border-[#00B4D8]/30">
              {notification}
            </div>
          )}

          {schedules.length === 0 ? (
            <p className="text-sm text-slate-500 italic bg-white p-4 rounded-xl border border-slate-200">
              Anda belum mendeklarasikan jadwal mengajar.
            </p>
          ) : (
            <div className="space-y-5">
              <SlotSelector
                scheduleLabels={scheduleLabels}
                selectedIndex={selectedIndex}
                setSelectedIndex={(val) => {
                  setSelectedIndex(val);
                  setNewDay('');
                  setNewSession('');
                  setNotification('');
                }}
                newDay={newDay}
                setNewDay={setNewDay}
                sessions={sessions}
                sessionLoading={sessionLoading}
                newSession={newSession}
                setNewSession={setNewSession}
              />
              <RescheduleActions
                onSubmit={handleSubmit}
                disabled={selectedIndex < 0 || !newDay || !newSession}
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
