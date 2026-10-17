import React from 'react';
import { DAYS_ID } from '@/lib/constants';
import { SessionSlot } from '@/types';
import { Select } from '@/components/ui/Select';

interface SlotSelectorProps {
  scheduleLabels: string[];
  selectedIndex: number;
  setSelectedIndex: (v: number) => void;
  newDay: string;
  setNewDay: (v: string) => void;
  sessions: SessionSlot[];
  sessionLoading: boolean;
  newSession: string;
  setNewSession: (v: string) => void;
}

export const SlotSelector: React.FC<SlotSelectorProps> = ({
  scheduleLabels,
  selectedIndex,
  setSelectedIndex,
  newDay,
  setNewDay,
  sessions,
  sessionLoading,
  newSession,
  setNewSession,
}) => {
  return (
    <>
      <Select
        label="Jadwal yang Ingin Diganti *"
        value={selectedIndex >= 0 ? String(selectedIndex) : ''}
        onChange={(e) => setSelectedIndex(Number(e.target.value))}
      >
        <option value="">-- Pilih Jadwal Anda --</option>
        {scheduleLabels.map((label, index) => (
          <option key={label} value={index}>
            {label}
          </option>
        ))}
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Hari Baru yang Diinginkan *"
          value={newDay}
          onChange={(e) => {
            setNewDay(e.target.value);
            setNewSession('');
          }}
          disabled={selectedIndex < 0}
        >
          <option value="">-- Pilih Hari --</option>
          {DAYS_ID.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>

        <Select
          label="Sesi Jam Baru *"
          value={newSession}
          onChange={(e) => setNewSession(e.target.value)}
          disabled={!newDay || sessionLoading}
          helperText={
            sessionLoading
              ? 'Memuat sesi…'
              : newDay && sessions.length === 0
                ? 'Belum ada sesi pada hari itu.'
                : undefined
          }
        >
          <option value="">-- Pilih Sesi --</option>
          {sessions.map((session) => (
            <option key={session.id} value={session.sessionName}>
              {session.sessionName} ({session.startTime} - {session.endTime})
            </option>
          ))}
        </Select>
      </div>
    </>
  );
};
