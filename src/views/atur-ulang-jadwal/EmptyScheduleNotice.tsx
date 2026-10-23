import React from 'react';

export const EmptyScheduleNotice: React.FC = () => {
  return (
    <p className="text-sm text-slate-500 italic bg-white p-4 rounded-xl border border-slate-200">
      Anda belum mendeklarasikan jadwal mengajar.
    </p>
  );
};
