import { useEffect, useRef, useState } from 'react';
import {
  Area,
  AvailableInstructor,
  LessonPackage,
  Location,
  SessionSlot,
} from '@/types';
import { dayNameFromDate } from '@/lib/utils';
import { request, toErrorMessage } from '@/lib/http';

export async function fetchMaster() {
  const [a, l, p] = await Promise.all([
    request<Area[]>('/areas', {
      method: 'GET',
      revalidate: 3600,
      tag: 'areas',
    }),
    request<Location[]>('/locations', {
      method: 'GET',
      revalidate: 3600,
      tag: 'locations',
    }),
    request<LessonPackage[]>('/packages', {
      method: 'GET',
      revalidate: 3600,
      tag: 'packages',
    }),
  ]);
  return {
    areas: a.data ?? [],
    locations: l.data ?? [],
    packages: p.data ?? [],
  };
}

export async function fetchSessions(locationId: string, dayOfWeek: string) {
  const q = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${q}`, { method: 'GET' });
  return res.data ?? [];
}

export async function fetchInstructors(p: {
  locationId: string;
  dayOfWeek: string;
  sessionName: string;
  packageType?: 'REGULER' | 'PRIVAT';
}) {
  const q = new URLSearchParams({
    locationId: p.locationId,
    dayOfWeek: p.dayOfWeek,
    sessionName: p.sessionName,
    ...(p.packageType ? { packageType: p.packageType } : {}),
  });
  const res = await request<AvailableInstructor[]>(
    `/instructor/available?${q}`,
    { method: 'GET' },
  );
  return res.data ?? [];
}

interface UseMuridDataParams {
  locationId: string;
  firstMeetDate: string;
  sessionName: string;
  packageId?: string;
  onError?: (msg: string) => void;
}

export function useMuridData({
  locationId,
  firstMeetDate,
  sessionName,
  packageId,
  onError,
}: UseMuridDataParams) {
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [packages, setPackages] = useState<LessonPackage[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [sessionState, setSessionState] = useState<{
    key: string;
    rows: SessionSlot[];
  } | null>(null);
  const [instructorState, setInstructorState] = useState<{
    key: string;
    rows: AvailableInstructor[];
  } | null>(null);

  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  });

  useEffect(() => {
    let active = true;
    fetchMaster()
      .then((data) => {
        if (!active) return;
        setAreas(data.areas);
        setLocations(data.locations);
        setPackages(data.packages);
      })
      .catch((err) => {
        if (active) onErrorRef.current?.(toErrorMessage(err));
      })
      .finally(() => {
        if (active) setIsLoadingData(false);
      });
    return () => {
      active = false;
    };
  }, []); // Run once on mount!

  const dayOfWeek = dayNameFromDate(firstMeetDate);
  const sessionKey =
    locationId && dayOfWeek ? `${locationId}|${dayOfWeek}` : '';

  const selectedPkg = packages.find((p) => p.id === packageId);
  const packageType =
    selectedPkg?.type === 'Privat' ? 'PRIVAT' : selectedPkg ? 'REGULER' : undefined;

  const instructorKey =
    sessionKey && sessionName
      ? `${sessionKey}|${sessionName}|${packageType ?? ''}`
      : '';

  useEffect(() => {
    if (!sessionKey) return;
    const [locId, day] = sessionKey.split('|');
    let active = true;
    fetchSessions(locId, day)
      .then((rows) => {
        if (active) setSessionState({ key: sessionKey, rows });
      })
      .catch((err) => {
        if (active) onErrorRef.current?.(toErrorMessage(err));
      });
    return () => {
      active = false;
    };
  }, [sessionKey]);

  useEffect(() => {
    if (!instructorKey) return;
    const [locId, day, sName] = instructorKey.split('|');
    let active = true;
    fetchInstructors({
      locationId: locId,
      dayOfWeek: day,
      sessionName: sName,
      packageType,
    })
      .then((rows) => {
        if (active) setInstructorState({ key: instructorKey, rows });
      })
      .catch((err) => {
        if (active) onErrorRef.current?.(toErrorMessage(err));
      });
    return () => {
      active = false;
    };
  }, [instructorKey, packageType]);

  return {
    areas,
    locations,
    packages,
    isLoadingData,
    sessions: sessionState?.key === sessionKey ? sessionState.rows : [],
    sessionLoading: Boolean(sessionKey) && sessionState?.key !== sessionKey,
    instructors:
      instructorState?.key === instructorKey ? instructorState.rows : [],
    instructorLoading:
      Boolean(instructorKey) && instructorState?.key !== instructorKey,
  };
}
