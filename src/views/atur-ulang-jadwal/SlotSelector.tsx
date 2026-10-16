import React from 'react';
import { DAYS_ID, SESSIONS_ID } from '@/lib/constants';
import { Select } from '@/components/ui/Select';

interface SlotSelectorProps {
  availableSlots: string[];
  selectedSlot: string;
  setSelectedSlot: (v: string) => void;
  newDay: number;
  setNewDay: (v: number) => void;
  newSession: number;
  setNewSession: (v: number) => void;
}

export const SlotSelector: React.FC<SlotSelectorProps> = ({
  availableSlots,
  selectedSlot,
  setSelectedSlot,
  newDay,
  setNewDay,
  newSession,
  setNewSession,
}) => {
  return (
    <>
      <Select
        label="Pilih Jadwal yang Ingin Diganti / Dihapus *"
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
      >
        <option value="">-- Pilih Slot Jadwal Anda --</option>
        {availableSlots.map((slotStr) => {
          const [d, s] = slotStr.split('|').map(Number);
          const isBusy = d === 1 || d === 3 || d === 6;
          return (
            <option key={slotStr} value={slotStr}>
              {DAYS_ID[d]} · {SESSIONS_ID[s]} {isBusy ? '(⚠️ Ada Murid Aktif)' : '(Kosong)'}
            </option>
          );
        })}
      </Select>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
        <p className="text-xs font-bold text-[#1D3557] uppercase tracking-wide">
          Target Jadwal Pengganti Baru
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Hari Baru"
            value={newDay}
            onChange={(e) => setNewDay(Number(e.target.value))}
          >
            {DAYS_ID.map((dayName, idx) => (
              <option key={dayName} value={idx}>
                {dayName}
              </option>
            ))}
          </Select>

          <Select
            label="Sesi Baru"
            value={newSession}
            onChange={(e) => setNewSession(Number(e.target.value))}
          >
            {SESSIONS_ID.map((sessionName, idx) => (
              <option key={sessionName} value={idx}>
                {sessionName.split(' ')[0]}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
};
