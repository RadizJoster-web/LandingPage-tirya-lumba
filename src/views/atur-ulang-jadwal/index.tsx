'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Area, Location, SessionSlot } from '@/types';
import { DAYS_ID } from '@/lib/constants';
import { request, toErrorMessage } from '@/lib/http';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RescheduleHeader } from './RescheduleHeader';
import { PoolSelectionList } from '../daftar-guru/PoolSelectionList';
import { ScheduleMatrixTable } from '../daftar-guru/ScheduleMatrixTable';
import { Clock, CheckCircle2, AlertCircle, Save, ArrowLeft } from 'lucide-react';

interface RescheduleStatusData {
  canReschedule: boolean;
  remainingTokens: number;
  lastRescheduledAt: string | null;
  nextAvailableAt: string | null;
  currentLocationIds: string[];
  currentSlots: string[];
  schedules: Array<{
    id: string;
    locationId: string;
    locationName: string;
    dayOfWeek: string;
    sessionName: string;
    hasStudent: boolean;
    slotKey: string;
  }>;
}

async function fetchMasterData(): Promise<{ areas: Area[]; locations: Location[] }> {
  const [a, l] = await Promise.all([
    request<Area[]>('/areas', { method: 'GET' }),
    request<Location[]>('/locations', { method: 'GET' }),
  ]);
  return { areas: a.data, locations: l.data };
}

async function fetchSessions(locationId: string, dayOfWeek: string): Promise<SessionSlot[]> {
  const query = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${query}`, { method: 'GET' });
  return res.data;
}

export default function AturUlangJadwalParent() {
  const router = useRouter();
  const { user, registration, isLoading: authLoading, refreshRegistration } = useAuth();

  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [rescheduleData, setRescheduleData] = useState<RescheduleStatusData | null>(null);

  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [sessionMap, setSessionMap] = useState<Record<string, SessionSlot[]>>({});

  const [notification, setNotification] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Akses halaman hanya untuk user yang terdaftar sebagai pelatih
  useEffect(() => {
    if (!authLoading && (!user || (user.role !== 'INSTRUCTOR' && registration?.kind !== 'instructor'))) {
      router.push('/profile');
    }
  }, [user, registration, authLoading, router]);

  // 1. Fetch data master & status reschedule pelatih
  useEffect(() => {
    let active = true;
    setIsPageLoading(true);

    Promise.all([
      fetchMasterData(),
      request<RescheduleStatusData>('/instructors/reschedule/status', { method: 'GET' }),
    ])
      .then(([master, statusRes]) => {
        if (!active) return;
        setAreas(master.areas);
        setLocations(master.locations);

        const data = statusRes.data;
        setRescheduleData(data);

        // Pasang default value jadwal yang sudah ditetapkan diawal
        if (data.currentLocationIds && data.currentLocationIds.length > 0) {
          setSelectedLocationIds(data.currentLocationIds);
        }
        if (data.currentSlots && data.currentSlots.length > 0) {
          setSelectedSlots(data.currentSlots);
        }
      })
      .catch((err) => {
        if (active) {
          setErrorMsg(toErrorMessage(err));
        }
      })
      .finally(() => {
        if (active) setIsPageLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // 2. Fetch sesi untuk setiap kolam yang dipilih
  const pendingIds = useMemo(
    () => selectedLocationIds.filter((id) => !sessionMap[id]),
    [selectedLocationIds, sessionMap],
  );

  useEffect(() => {
    if (pendingIds.length === 0) return;
    let active = true;

    Promise.all(
      pendingIds.map(async (locId) => {
        const perDay = await Promise.all(
          DAYS_ID.map((d) => fetchSessions(locId, d).catch(() => [])),
        );
        return [locId, perDay.flat()] as const;
      }),
    )
      .then((entries) => {
        if (active) {
          setSessionMap((prev) => ({
            ...prev,
            ...Object.fromEntries(entries),
          }));
        }
      })
      .catch((err) => {
        if (active) setErrorMsg(toErrorMessage(err));
      });

    return () => {
      active = false;
    };
  }, [pendingIds]);

  const poolsByArea = useMemo(
    () =>
      areas.map((area) => ({
        area,
        pools: locations.filter((loc) => loc.areaId === area.id),
      })),
    [areas, locations],
  );

  const selectedPools = useMemo(
    () => locations.filter((loc) => selectedLocationIds.includes(loc.id)),
    [locations, selectedLocationIds],
  );

  // Jadwal murid aktif yang tidak boleh dihapus
  const activeStudentSlots = useMemo(() => {
    if (!rescheduleData?.schedules) return new Set<string>();
    return new Set(
      rescheduleData.schedules
        .filter((s) => s.hasStudent)
        .map((s) => s.slotKey),
    );
  }, [rescheduleData]);

  const handleToggleLocation = (id: string) => {
    setErrorMsg('');
    setNotification('');

    // Cek apakah ada jadwal murid di kolam ini
    const hasStudentInPool = rescheduleData?.schedules.some(
      (s) => s.locationId === id && s.hasStudent,
    );

    if (hasStudentInPool && selectedLocationIds.includes(id)) {
      setErrorMsg(
        'Kolam ini tidak dapat dihapus karena terdapat jadwal murid aktif yang sedang Anda ajar.',
      );
      return;
    }

    setSelectedLocationIds((prev) => {
      if (prev.includes(id)) {
        setSelectedSlots((slots) => slots.filter((key) => !key.startsWith(`${id}|`)));
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleToggleSlot = (key: string) => {
    setErrorMsg('');
    setNotification('');

    // Jangan izinkan hapus sesi jika sedang terisi murid aktif
    if (activeStudentSlots.has(key) && selectedSlots.includes(key)) {
      setErrorMsg(
        'Sesi ini tidak dapat dihapus karena terdapat murid aktif yang dijadwalkan pada jam tersebut.',
      );
      return;
    }

    setSelectedSlots((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setNotification('');

    if (!rescheduleData?.canReschedule) {
      setErrorMsg('Kesempatan atur ulang jadwal bulan ini sudah digunakan.');
      return;
    }

    // Aturan revisi: Guru tidak boleh menghapus semua jadwal, minimal ada 1 sesi dia ngajar
    if (selectedSlots.length < 1) {
      setErrorMsg('Minimal harus menyisakan 1 sesi jadwal mengajar aktif.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payloadSchedules = selectedSlots.map((key) => {
        const [locationId, dayOfWeek, sessionName] = key.split('|');
        return { locationId, dayOfWeek, sessionName };
      });

      await request('/instructors/reschedule', {
        method: 'PUT',
        body: { schedules: payloadSchedules },
      });

      await refreshRegistration();

      setNotification('Jadwal mengajar berhasil diperbarui. Mengalihkan ke profil...');
      setTimeout(() => {
        router.push('/profile?sukses=reschedule');
      }, 1500);
    } catch (err) {
      setErrorMsg(toErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isPageLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const canReschedule = rescheduleData?.canReschedule ?? false;
  const nextAvailableFormatted = rescheduleData?.nextAvailableAt
    ? new Date(rescheduleData.nextAvailableAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const lastRescheduledFormatted = rescheduleData?.lastRescheduledAt
    ? new Date(rescheduleData.lastRescheduledAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6] dark:bg-slate-950">
      <div className="max-w-4xl mx-auto space-y-6">
        <RescheduleHeader notification={notification} />

        {/* Status Token Bulanan Atur Ulang (1x per 30 hari) */}
        <div
          className={`rounded-xl border p-5 shadow-xs transition-all ${
            canReschedule
              ? 'border-emerald-200/80 bg-emerald-50/80 text-emerald-950 dark:bg-emerald-950/20 dark:border-emerald-800'
              : 'border-amber-200/80 bg-amber-50/80 text-amber-950 dark:bg-amber-950/20 dark:border-amber-800'
          }`}
        >
          <div className="flex items-start gap-3.5">
            {canReschedule ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="font-heading font-bold text-sm sm:text-base">
                  {canReschedule
                    ? 'Token Atur Ulang Jadwal: 1/1 Tersedia'
                    : 'Token Atur Ulang Bulan Ini Telah Digunakan'}
                </h3>
                <Badge
                  variant={canReschedule ? 'success' : 'coral'}
                  size="sm"
                  className={!canReschedule ? 'bg-amber-100 text-amber-900 border-amber-300' : ''}
                >
                  {canReschedule ? 'Dapat Mengubah Jadwal' : 'Terkunci'}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                {canReschedule ? (
                  <>
                    Pelatih memiliki hak penyesuaian <strong>1 kali per 30 hari</strong>. Sesi yang telah memiliki murid aktif akan terkunci otomatis dan tidak dapat dihapus.
                  </>
                ) : (
                  <>
                    Jadwal terakhir diperbarui pada <strong>{lastRescheduledFormatted}</strong>. Kesempatan atur ulang berikutnya akan terbuka kembali pada <strong>{nextAvailableFormatted}</strong>.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Formulir Pembaruan Jadwal Mengajar */}
        <Card variant="dashboard" className="p-6 sm:p-8 bg-white shadow-xs border border-gray-200/90 rounded-xl dark:bg-slate-900 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* 1. Pilih Kolam */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  1. Pilih Kolam yang Anda Sanggupi *
                </label>
                <span className="text-[11px] text-[#0077B6] font-medium">
                  Boleh memilih lebih dari satu kolam
                </span>
              </div>

              <PoolSelectionList
                poolsByArea={poolsByArea}
                selectedLocationIds={selectedLocationIds}
                onToggleLocation={handleToggleLocation}
                hasAreas={areas.length > 0}
              />
            </div>

            {/* 2. Matriks Jadwal Mengajar dengan Locked Slots */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  2. Matriks Ketersediaan Jadwal Mengajar *
                </label>
                <span className="text-xs font-semibold text-[#0077B6] bg-[#E0FBFC] px-2.5 py-1 rounded-full border border-[#00B4D8]/30">
                  {selectedSlots.length} sesi dipilih (Minimal 1 sesi)
                </span>
              </div>

              {selectedPools.length === 0 ? (
                <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-slate-200/60 dark:bg-slate-800 dark:border-slate-700">
                  Pilih minimal satu kolam untuk menampilkan tabel sesi ketersediaan mengajar.
                </p>
              ) : (
                <ScheduleMatrixTable
                  selectedPools={selectedPools}
                  sessionMap={sessionMap}
                  selectedSlots={selectedSlots}
                  onToggleSlot={handleToggleSlot}
                  lockedSlots={Array.from(activeStudentSlots)}
                />
              )}
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200/80 text-xs font-medium text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="md"
                isFullRounded={false}
                onClick={() => router.push('/profile')}
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Batal &amp; Kembali</span>
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isFullRounded={false}
                disabled={isSubmitting || !canReschedule || selectedSlots.length < 1}
                className="w-full sm:w-auto font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? 'Menyimpan Jadwal...'
                    : !canReschedule
                      ? 'Kesempatan Reschedule Habis'
                      : 'Simpan Perubahan Jadwal'}
                </span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
