'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Card } from '@/components/ui/Card';
import { SlotSelector } from './SlotSelector';
import { RescheduleActions } from './RescheduleActions';

export default function AturUlangJadwalParent() {
  const router = useRouter();
  const { user, isLoading, cancelRescheduleSlot, requestRescheduleSlot } = useAuth();

  const [selectedSlot, setSelectedSlot] = useState('');
  const [newDay, setNewDay] = useState(0);
  const [newSession, setNewSession] = useState(0);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'guru')) {
      router.push('/profile');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || !user.coachReg) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleRemoveSlot = () => {
    if (!selectedSlot) {
      setNotification({ type: 'error', message: 'Silakan pilih jadwal yang ingin dihapus terlebih dahulu.' });
      return;
    }
    cancelRescheduleSlot(selectedSlot);
    setSelectedSlot('');
    setNotification({ type: 'success', message: 'Jadwal ketersediaan berhasil dihapus dari sistem Anda.' });
  };

  const handleRequestApproval = () => {
    if (!selectedSlot) {
      setNotification({ type: 'error', message: 'Silakan pilih jadwal yang ingin diganti terlebih dahulu.' });
      return;
    }
    const [fromDay, fromSession] = selectedSlot.split('|').map(Number);
    const result = requestRescheduleSlot(fromDay, fromSession, Number(newDay), Number(newSession));
    if (result.success) {
      setNotification({ type: 'success', message: result.message });
      setTimeout(() => router.push('/profile'), 1800);
    } else {
      setNotification({ type: 'error', message: result.message });
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-xl mx-auto">
        <div className="mb-4">
          <Link href="/profile" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8]">
            ← Kembali ke Dasbor Profil
          </Link>
        </div>

        <Card variant="dashboard" className="p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="font-heading font-extrabold text-2xl text-[#1D3557] mb-1">Atur Ulang Jadwal Mengajar</h1>
            <p className="text-xs sm:text-sm text-slate-500">Kelola atau ajukan pergantian slot mengajar Anda kepada tim admin.</p>
          </div>

          {notification && (
            <div className={`mb-6 p-4 rounded-lg text-xs font-semibold ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {notification.message}
            </div>
          )}

          <div className="space-y-5">
            <SlotSelector
              availableSlots={user.coachReg.availableSlots || []}
              selectedSlot={selectedSlot} setSelectedSlot={(v) => { setSelectedSlot(v); setNotification(null); }}
              newDay={newDay} setNewDay={setNewDay} newSession={newSession} setNewSession={setNewSession}
            />
            <RescheduleActions onRemove={handleRemoveSlot} onRequest={handleRequestApproval} />
          </div>
        </Card>
      </div>
    </div>
  );
}
