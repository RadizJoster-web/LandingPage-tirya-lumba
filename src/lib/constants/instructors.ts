import { Instructor } from '@/types';

export const INITIAL_INSTRUCTORS: Instructor[] = [
  {
    id: 1,
    name: 'Coach Rina Apsari',
    availableDays: [1, 3, 5],
    poolIds: [1, 2, 3, 4, 13],
    license: 'PRSI Level 2 Nasional',
  },
  {
    id: 2,
    name: 'Coach Dimas Pratama',
    availableDays: [2, 4, 6],
    poolIds: [5, 6, 7, 8, 14],
    license: 'PRSI Level 3 Nasional',
  },
  {
    id: 3,
    name: 'Coach Sari Widya',
    availableDays: [0, 1, 2, 3, 4, 5, 6],
    poolIds: [9, 10, 11, 12, 1, 5],
    license: 'PRSI Level 2 Pelatih Muda',
  },
  {
    id: 4,
    name: 'Coach Bayu Nugraha',
    availableDays: [0, 5, 6],
    poolIds: [1, 5, 13, 14, 4, 8],
    license: 'Pelatih Renang Tingkat Nasional',
  },
];

export const DAYS_ID = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

export const SESSIONS_ID = [
  'Pagi (07:00 - 10:00)',
  'Siang (10:00 - 14:00)',
  'Sore (15:00 - 18:00)',
];
