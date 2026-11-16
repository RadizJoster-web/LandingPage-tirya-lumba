import React from 'react';
import { InstructorRegistrationSnapshot } from '@/types';
import { TeacherMetricsRow } from './TeacherMetricsRow';
import { TeacherScheduleCard } from './TeacherScheduleCard';
import { TeacherQualificationCard } from './TeacherQualificationCard';
import { TeacherContactCard } from './TeacherContactCard';

interface TeacherContentViewProps {
  snapshot: InstructorRegistrationSnapshot;
  email: string;
}

export const TeacherContentView: React.FC<TeacherContentViewProps> = ({
  snapshot,
  email,
}) => {
  const scheduleCount = snapshot.schedules?.length || snapshot.scheduleLabels?.length || 0;
  const activeStudents = snapshot.schedules?.reduce(
    (acc, cur) => acc + (cur.totalStudents ?? 0),
    0,
  ) || 0;

  return (
    <div className="space-y-5 flex-1">
      {/* 4 Kartu Angka */}
      <TeacherMetricsRow
        scheduleCount={scheduleCount}
        activeStudents={activeStudents}
        experience={snapshot.experience}
        accreditation={snapshot.license}
      />

      {/* Jadwal Mengajar */}
      <TeacherScheduleCard snapshot={snapshot} />

      {/* Kualifikasi */}
      <TeacherQualificationCard snapshot={snapshot} />

      {/* Data Kontak */}
      <TeacherContactCard snapshot={snapshot} email={email} />
    </div>
  );
};
