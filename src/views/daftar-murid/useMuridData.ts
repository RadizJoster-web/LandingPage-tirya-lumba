import { useEffect, useState } from 'react';
import { Area, AvailableInstructor, LessonPackage, Location, SessionSlot } from '@/types';
import { dayNameFromDate } from '@/lib/utils';
import { toErrorMessage } from '@/lib/http';

interface UseMuridDataParams {
  locationId: string;
  firstMeetDate: string;
  sessionName: string;
  packageType?: 'REGULER' | 'PRIVAT';
  fetchMaster: () => Promise<{ areas: Area[]; locations: Location[]; packages: LessonPackage[] }>;
  fetchSessions: (locId: string, day: string) => Promise<SessionSlot[]>;
  fetchInstructors: (p: { locationId: string; dayOfWeek: string; sessionName: string; packageType?: 'REGULER' | 'PRIVAT' }) => Promise<AvailableInstructor[]>;
  onError: (msg: string) => void;
}

export function useMuridData({
  locationId,
  firstMeetDate,
  sessionName,
  packageType,
  fetchMaster,
  fetchSessions,
  fetchInstructors,
  onError,
}: UseMuridDataParams) {
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [packages, setPackages] = useState<LessonPackage[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [sessionState, setSessionState] = useState<{ key: string; rows: SessionSlot[] } | null>(null);
  const [instructorState, setInstructorState] = useState<{ key: string; rows: AvailableInstructor[] } | null>(null);

  useEffect(() => {
    let active = true;
    fetchMaster()
      .then((data) => {
        if (!active) return;
        setAreas(data.areas);
        setLocations(data.locations);
        setPackages(data.packages);
      })
      .catch((err) => { if (active) onError(toErrorMessage(err)); })
      .finally(() => { if (active) setIsLoadingData(false); });
    return () => { active = false; };
  }, [fetchMaster, onError]);

  const dayOfWeek = dayNameFromDate(firstMeetDate);
  const sessionKey = locationId && dayOfWeek ? `${locationId}|${dayOfWeek}` : '';
  const instructorKey = sessionKey && sessionName ? `${sessionKey}|${sessionName}|${packageType ?? ''}` : '';

  useEffect(() => {
    if (!sessionKey) return;
    const [locId, day] = sessionKey.split('|');
    let active = true;
    fetchSessions(locId, day)
      .then((rows) => { if (active) setSessionState({ key: sessionKey, rows }); })
      .catch((err) => { if (active) onError(toErrorMessage(err)); });
    return () => { active = false; };
  }, [sessionKey, fetchSessions, onError]);

  useEffect(() => {
    if (!instructorKey) return;
    const [locId, day, sName] = instructorKey.split('|');
    let active = true;
    fetchInstructors({ locationId: locId, dayOfWeek: day, sessionName: sName, packageType })
      .then((rows) => { if (active) setInstructorState({ key: instructorKey, rows }); })
      .catch((err) => { if (active) onError(toErrorMessage(err)); });
    return () => { active = false; };
  }, [instructorKey, packageType, fetchInstructors, onError]);

  return {
    areas,
    locations,
    packages,
    isLoadingData,
    sessions: sessionState?.key === sessionKey ? sessionState.rows : [],
    sessionLoading: Boolean(sessionKey) && sessionState?.key !== sessionKey,
    instructors: instructorState?.key === instructorKey ? instructorState.rows : [],
    instructorLoading: Boolean(instructorKey) && instructorState?.key !== instructorKey,
  };
}
