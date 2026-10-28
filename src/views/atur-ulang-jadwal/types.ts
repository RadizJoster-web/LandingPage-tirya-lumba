export interface RescheduleStatusData {
  canReschedule: boolean;
  remainingTokens: number;
  lastRescheduledAt: string | null;
  nextAvailableAt: string | null;
  currentLocationIds: string[];
  currentSlots: string[];
  schedules: Array<{
    id: string;
    locationId: string;
    locationName: string;
    dayOfWeek: string;
    sessionName: string;
    hasStudent: boolean;
    slotKey: string;
  }>;
}
