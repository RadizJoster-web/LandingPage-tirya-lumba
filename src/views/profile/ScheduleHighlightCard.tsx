import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { InstructorScheduleInput } from '@/types';

interface ScheduleHighlightCardProps {
  schedules?: InstructorScheduleInput[];
  scheduleLabels?: string[];
}

interface NormalizedScheduleItem {
  dayOfWeek: string;
  sessionName: string;
  locationName: string;
  timeRange: string;
  startTime?: string;
  endTime?: string;
}

const DAYS_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const ScheduleHighlightCard: React.FC<ScheduleHighlightCardProps> = ({
  schedules = [],
  scheduleLabels = [],
}) => {
  // 1. Normalisasi data jadwal dari schedules atau scheduleLabels
  const normalizedItems: NormalizedScheduleItem[] = React.useMemo(() => {
    if (schedules && schedules.length > 0) {
      return schedules.map((s) => {
        let timeRange = s.timeRange || '';
        if (!timeRange && s.startTime && s.endTime) {
          timeRange = `${s.startTime} - ${s.endTime} WIB`;
        }

        return {
          dayOfWeek: s.dayOfWeek || 'Lainnya',
          sessionName: s.sessionName || 'Sesi',
          locationName: s.locationName || 'Kolam Renang',
          timeRange,
          startTime: s.startTime,
          endTime: s.endTime,
        };
      });
    }

    // Fallback: parse string label seperti "Permata — Sabtu, sesi 1 (09:00 - 10:00 WIB)"
    return scheduleLabels.map((label) => {
      // Format perkiraan: "NamaKolam — Hari, Sesi (Jam)"
      const [poolPart, rest] = label.split('—').map((t) => t.trim());
      const locationName = poolPart || 'Kolam Renang';
      let dayOfWeek = 'Sabtu';
      let sessionName = 'Sesi';
      let timeRange = '';

      if (rest) {
        const timeMatch = rest.match(/\(([^)]+)\)/);
        if (timeMatch) {
          timeRange = timeMatch[1].trim();
        }
        const cleanRest = rest.replace(/\([^)]+\)/, '').trim();
        const parts = cleanRest.split(',').map((p) => p.trim());
        if (parts[0]) dayOfWeek = parts[0];
        if (parts[1]) sessionName = parts[1];
      }

      return {
        dayOfWeek,
        sessionName,
        locationName,
        timeRange,
      };
    });
  }, [schedules, scheduleLabels]);

  // 2. Kelompokkan per hari (1 Card = 1 Hari)
  const groupedByDay = React.useMemo(() => {
    const map = new Map<string, NormalizedScheduleItem[]>();

    for (const item of normalizedItems) {
      // Normalisasi nama hari huruf kapital (mis. "sabtu" -> "Sabtu")
      const dayKey =
        item.dayOfWeek.charAt(0).toUpperCase() + item.dayOfWeek.slice(1).toLowerCase();

      if (!map.has(dayKey)) {
        map.set(dayKey, []);
      }
      map.get(dayKey)!.push(item);
    }

    // Urutkan kartu hari berdasarkan urutan kalender Senin -> Minggu
    const sortedDays = Array.from(map.keys()).sort((a, b) => {
      const idxA = DAYS_ORDER.indexOf(a);
      const idxB = DAYS_ORDER.indexOf(b);
      if (idxA === -1 && idxB === -1) return a.localeCompare(b);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

    return sortedDays.map((day) => {
      const items = map.get(day)!;
      // Urutkan sesi dalam hari berdasarkan jam atau nama sesi
      items.sort((a, b) => {
        if (a.startTime && b.startTime) {
          return a.startTime.localeCompare(b.startTime);
        }
        return a.sessionName.localeCompare(b.sessionName);
      });
      return {
        dayOfWeek: day,
        items,
      };
    });
  }, [normalizedItems]);

  const totalSesi = normalizedItems.length;

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-[#00B4D8]/30 bg-gradient-to-br from-[#E0FBFC]/90 via-white to-white p-6 shadow-md shadow-[#0077B6]/5 sm:p-8">
      {/* Header Utama Seksi Jadwal */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0077B6] text-xl text-white shadow-sm">
            🗓️
          </div>
          <div>
            <h2 className="font-heading text-lg font-extrabold text-[#1D3557] sm:text-xl">
              Jadwal Ketersediaan Mengajar
            </h2>
            <p className="text-xs text-slate-500">
              {totalSesi > 0
                ? `${totalSesi} sesi mengajar terdaftar di ${groupedByDay.length} hari`
                : 'Belum ada jadwal mengajar yang terdaftar'}
            </p>
          </div>
        </div>

        <Link href="/guru/atur-ulang-jadwal" className="self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            isFullRounded={true}
            className="border-[#0077B6] text-[#0077B6] hover:bg-[#E0FBFC]"
          >
            ✏️ Atur Ulang Jadwal
          </Button>
        </Link>
      </div>

      {/* Grid Card: 1 Card untuk 1 Hari */}
      {groupedByDay.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {groupedByDay.map((group) => (
            <div
              key={group.dayOfWeek}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:border-[#00B4D8]/50 hover:shadow-md"
            >
              {/* Header Kartu Hari (Primary) */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0077B6]/10 text-sm">
                      📅
                    </span>
                    <h3 className="font-heading text-lg font-extrabold text-[#1D3557]">
                      {group.dayOfWeek}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#E0FBFC] px-2.5 py-0.5 text-xs font-bold text-[#0077B6]">
                    {group.items.length} Sesi
                  </span>
                </div>

                {/* Daftar Sesi dalam Hari Tersebut */}
                <div className="mt-3.5 space-y-3">
                  {group.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group rounded-xl border border-slate-100 bg-[#F8F9FA] p-3.5 transition-colors hover:border-[#00B4D8]/40 hover:bg-[#E0FBFC]/20"
                    >
                      {/* Hari & Jam Jadi Primary */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-[#0077B6]">⏰</span>
                          <span className="font-heading text-sm font-extrabold text-[#1D3557]">
                            {item.timeRange || (item.startTime && item.endTime ? `${item.startTime} - ${item.endTime} WIB` : item.sessionName)}
                          </span>
                        </div>
                        <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-700 shadow-2xs">
                          {item.sessionName}
                        </span>
                      </div>

                      {/* Disusul dengan Lokasi Mengajar */}
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                        <span className="text-slate-400">📍</span>
                        <span className="truncate font-medium">
                          {item.locationName.toLowerCase().startsWith('kolam')
                            ? item.locationName
                            : `Kolam Renang ${item.locationName}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catatan Kaki Kartu Hari */}
              <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Siap menerima murid</span>
                <span className="text-emerald-600 font-semibold">● Aktif</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-xs text-slate-400">
          Tidak ada data jadwal mengajar yang terdaftar. Silakan atur jadwal melalui tombol di atas.
        </div>
      )}
    </section>
  );
};
