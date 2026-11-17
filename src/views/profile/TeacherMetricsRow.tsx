import React from 'react';

interface TeacherMetricsRowProps {
  scheduleCount: number;
  activeStudents: number;
  experience?: string | null;
  accreditation?: string | null;
}

export const TeacherMetricsRow: React.FC<TeacherMetricsRowProps> = ({
  scheduleCount,
  activeStudents,
  experience,
  accreditation,
}) => {
  const metrics = [
    { value: `${scheduleCount}`, label: 'Sesi / minggu' },
    { value: `${activeStudents}`, label: 'Murid aktif' },
    { value: experience || '–', label: 'Pengalaman' },
    { value: accreditation || '–', label: 'Lisensi' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-gray-200/90 bg-white p-4 text-center shadow-xs dark:bg-slate-900 dark:border-slate-800"
        >
          <span className="font-heading font-extrabold text-xl sm:text-2xl text-[#1D3557] dark:text-slate-100 block tabular-nums">
            {m.value}
          </span>
          <span className="text-[11px] font-medium text-slate-400 mt-1 block leading-tight">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
};
