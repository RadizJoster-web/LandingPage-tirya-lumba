'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { EmptyProfile } from './EmptyProfile';
import { RejectedProfile } from './RejectedProfile';
import { StudentDashboard } from './StudentDashboard';
import { CoachDashboard } from './CoachDashboard';

export default function ProfileParent() {
  const router = useRouter();
  const {
    user,
    isLoading,
    updateStudentCompletedSessions,
    updateRegistrationStatus,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Case 1: Unregistered user
  if (!user.role || (!user.studentReg && !user.coachReg)) {
    return <EmptyProfile displayName={user.name || user.email} />;
  }

  const isStudent = user.role === 'murid' && !!user.studentReg;
  const isCoach = user.role === 'guru' && !!user.coachReg;
  const currentStatus = isStudent ? user.studentReg?.status : user.coachReg?.status;

  // Case 2: Rejected
  if (currentStatus === 'rejected') {
    return (
      <RejectedProfile
        reason={user.studentReg?.rejectionReason || user.coachReg?.rejectionReason}
        onApprove={() => updateRegistrationStatus('approved')}
      />
    );
  }

  // Case 3: Student view
  if (isStudent && user.studentReg) {
    return (
      <StudentDashboard
        user={user}
        reg={user.studentReg}
        onStatusChange={updateRegistrationStatus}
        onUpdateCompletedSessions={updateStudentCompletedSessions}
      />
    );
  }

  // Case 4: Coach view
  if (isCoach && user.coachReg) {
    return (
      <CoachDashboard
        user={user}
        reg={user.coachReg}
        onStatusChange={updateRegistrationStatus}
      />
    );
  }

  return null;
}
