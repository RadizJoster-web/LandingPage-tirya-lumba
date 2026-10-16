import { Pool, Instructor } from '@/types';
import { INITIAL_POOLS, INITIAL_INSTRUCTORS } from '@/lib/constants';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PlatformStats {
  totalStudents: number;
  totalCoaches: number;
  totalPartnerPools: number;
}

export async function getPools(
  page = 1,
  limit = 6,
): Promise<{ data: PaginatedResult<Pool>; error?: string }> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/pools?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (res.ok) {
      const json = await res.json();
      return { data: json };
    }
  } catch {
    // Graceful fallback to static data if API is not running yet
  }

  const offset = (page - 1) * limit;
  const paginatedItems = INITIAL_POOLS.slice(offset, offset + limit);
  return {
    data: {
      data: paginatedItems,
      total: INITIAL_POOLS.length,
      page,
      limit,
      totalPages: Math.ceil(INITIAL_POOLS.length / limit),
    },
  };
}

export async function getInstructors(
  page = 1,
  limit = 12,
): Promise<{ data: PaginatedResult<Instructor>; error?: string }> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/instructors?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (res.ok) {
      const json = await res.json();
      return { data: json };
    }
  } catch {
    // Graceful fallback to static data
  }

  const offset = (page - 1) * limit;
  const paginatedItems = INITIAL_INSTRUCTORS.slice(offset, offset + limit);
  return {
    data: {
      data: paginatedItems,
      total: INITIAL_INSTRUCTORS.length,
      page,
      limit,
      totalPages: Math.ceil(INITIAL_INSTRUCTORS.length / limit),
    },
  };
}

export async function getPlatformStats(): Promise<PlatformStats> {
  try {
    const [studentsRes, coachesRes, poolsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/stats/students`, {
        next: { revalidate: 3600 },
      }).catch(() => null),
      fetch(`${API_BASE_URL}/stats/coaches`, {
        next: { revalidate: 3600 },
      }).catch(() => null),
      fetch(`${API_BASE_URL}/stats/pools`, {
        next: { revalidate: 3600 },
      }).catch(() => null),
    ]);

    const totalStudents = studentsRes?.ok
      ? (await studentsRes.json()).count
      : 2500;
    const totalCoaches = coachesRes?.ok ? (await coachesRes.json()).count : 37;
    const totalPartnerPools = poolsRes?.ok ? (await poolsRes.json()).count : 14;

    return { totalStudents, totalCoaches, totalPartnerPools };
  } catch {
    return {
      totalStudents: 2500,
      totalCoaches: 37,
      totalPartnerPools: 14,
    };
  }
}
