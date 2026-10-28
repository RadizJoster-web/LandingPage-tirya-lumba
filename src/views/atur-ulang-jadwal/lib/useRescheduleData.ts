import { useEffect, useMemo, useState } from 'react';
import { Area, Location, SessionSlot } from '@/types';
import { DAYS_ID } from '@/lib/constants';
import { toErrorMessage } from '@/lib/http';
import { RescheduleStatusData } from '../types';
import { fetchMasterData, fetchRescheduleStatus, fetchSessions } from './api';

export function useRescheduleData() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [rescheduleData, setRescheduleData] = useState<RescheduleStatusData | null>(null);
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [sessionMap, setSessionMap] = useState<Record<string, SessionSlot[]>>({});
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    setIsPageLoading(true);

    Promise.all([fetchMasterData(), fetchRescheduleStatus()])
      .then(([master, statusRes]) => {
        if (!active) return;
        setAreas(master.areas);
        setLocations(master.locations);
        setRescheduleData(statusRes);
        if (statusRes.currentLocationIds?.length > 0) {
          setSelectedLocationIds(statusRes.currentLocationIds);
        }
        if (statusRes.currentSlots?.length > 0) {
          setSelectedSlots(statusRes.currentSlots);
        }
      })
      .catch((err) => {
        if (active) setErrorMsg(toErrorMessage(err));
      })
      .finally(() => {
        if (active) setIsPageLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

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

  const activeStudentSlots = useMemo(() => {
    if (!rescheduleData) return new Set<string>();
    const withStudent = rescheduleData.schedules.filter((s) => s.hasStudent);
    return new Set(withStudent.map((s) => `${s.locationId}|${s.dayOfWeek}|${s.sessionName}`));
  }, [rescheduleData]);

  const poolsByArea = useMemo(() => {
    const map = new Map<string, { area: Area; pools: Location[] }>();
    for (const a of areas) map.set(a.id, { area: a, pools: [] });
    for (const l of locations) {
      if (l.areaId) {
        const entry = map.get(l.areaId);
        if (entry) entry.pools.push(l);
      }
    }
    return Array.from(map.values()).filter((g) => g.pools.length > 0);
  }, [areas, locations]);

  const selectedPools = useMemo(
    () => locations.filter((l) => selectedLocationIds.includes(l.id)),
    [locations, selectedLocationIds],
  );

  const handleToggleLocation = (locId: string) => {
    const isRemoving = selectedLocationIds.includes(locId);
    if (isRemoving) {
      const hasActive = Array.from(activeStudentSlots).some((key) => key.startsWith(`${locId}|`));
      if (hasActive) {
        setErrorMsg('Kolam ini tidak dapat dihapus karena Anda sedang memiliki murid aktif pada sesi kolam ini.');
        return;
      }
      setSelectedLocationIds((prev) => prev.filter((id) => id !== locId));
      setSelectedSlots((prev) => prev.filter((slotKey) => !slotKey.startsWith(`${locId}|`)));
    } else {
      setSelectedLocationIds((prev) => [...prev, locId]);
    }
  };

  const handleToggleSlot = (key: string) => {
    if (activeStudentSlots.has(key)) {
      const [, day, sessionName] = key.split('|');
      setErrorMsg(`Sesi ${day || ''} (${sessionName || ''}) tidak dapat dihapus karena ada murid aktif yang dijadwalkan.`);
      return;
    }
    setErrorMsg('');
    setSelectedSlots((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  return {
    areas,
    locations,
    rescheduleData,
    selectedLocationIds,
    selectedSlots,
    sessionMap,
    errorMsg,
    setErrorMsg,
    isPageLoading,
    activeStudentSlots,
    poolsByArea,
    selectedPools,
    handleToggleLocation,
    handleToggleSlot,
  };
}
