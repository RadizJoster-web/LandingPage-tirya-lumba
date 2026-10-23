'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { SessionSlot } from '@/types';
import { request, toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { SlotSelector } from './SlotSelector';
import { RescheduleActions } from './RescheduleActions';
import { RescheduleHeader } from './RescheduleHeader';
import { EmptyScheduleNotice } from './EmptyScheduleNotice';
import { formatRescheduleWaUrl } from './lib/formatRescheduleWa';

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
    const waUrl = formatRescheduleWaUrl({
      fullName: instructorReg.fullName,
      registrationId: instructorReg.registrationId,
      oldScheduleLabel: scheduleLabels[selectedIndex],
      newDay,
      newSession,
    });
    window.open(waUrl, '_blank', 'noopener');
    setNotification(
      'Pengajuan reschedule dibuka di WhatsApp. Kirim pesan tersebut ke admin.',
    );
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-xl mx-auto">
        <RescheduleHeader notification={notification} />
        <Card variant="dashboard" className="p-6 sm:p-8 shadow-sm">
          {schedules.length === 0 ? (
            <EmptyScheduleNotice />
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
