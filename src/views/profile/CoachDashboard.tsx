import React from 'react';
import Link from 'next/link';
import { UserSession, CoachRegistration } from '@/types';
import { INITIAL_POOLS, DAYS_ID, SESSIONS_ID } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DashboardHeader } from './DashboardHeader';

interface CoachDashboardProps {
  user: UserSession;
  reg: CoachRegistration;
  onStatusChange: (status: 'approved' | 'rejected') => void;
}

export const CoachDashboard: React.FC<CoachDashboardProps> = ({
  user,
  reg,
  onStatusChange,
}) => {
  const assignedPools = INITIAL_POOLS.filter((p) => reg.selectedPoolIds.includes(p.id));

  const getStudentsForSlot = (dayIdx: number) => {
    if (dayIdx === 1 || dayIdx === 3) return 3;
    if (dayIdx === 6) return 2;
    return 0;
  };

  const totalStudents = reg.availableSlots.reduce((acc, slotStr) => {
    const [dayIdx] = slotStr.split('|').map(Number);
    return acc + getStudentsForSlot(dayIdx);
  }, 0);

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-6xl mx-auto space-y-8">
        <DashboardHeader
          title="Dasbor Profil Pelatih"
          badgeText="Instruktur Terverifikasi"
          userInfo={`${reg.name} · ${user.email} · ${reg.phone}`}
          status={reg.status}
          onStatusChange={onStatusChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="dashboard">
            <h3 className="font-heading font-bold text-base text-[#1D3557] mb-2">
              🏊 Kolam Tempat Mengajar
            </h3>
            <p className="text-xs text-slate-500 mb-2">Total {assignedPools.length} Kolam Terpilih:</p>
            <div className="space-y-1 max-h-24 overflow-y-auto text-xs font-semibold text-[#0077B6]">
              {assignedPools.map((p) => (
                <p key={p.id}>• {p.name}</p>
              ))}
            </div>
          </Card>

          <Card variant="dashboard">
            <h3 className="font-heading font-bold text-base text-[#1D3557] mb-2">
              📜 Lisensi & Kualifikasi
            </h3>
            <p className="font-heading font-bold text-lg text-[#0077B6] mt-1">{reg.license}</p>
            <p className="text-xs text-slate-500 mt-2">
              Domisili: <span className="font-semibold text-slate-700">{reg.domicile}</span>
            </p>
          </Card>

          <Card variant="dashboard">
            <h3 className="font-heading font-bold text-base text-[#1D3557] mb-2">
              👥 Total Murid Aktif
            </h3>
            <div className="font-heading font-extrabold text-4xl text-[#00B4D8]">
              {totalStudents}
            </div>
            <p className="text-xs text-slate-500 mt-1">Siswa Terdaftar pada Slot Anda</p>
          </Card>
        </div>

        <Card variant="dashboard" className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#1D3557]">Jadwal Mengajar Anda</h3>
              <p className="text-xs text-slate-500">Rekap slot sesi ketersediaan mengajar dan jumlah murid aktif.</p>
            </div>
            <Link href="/guru/atur-ulang-jadwal">
              <Button variant="primary" size="sm" isFullRounded={false} className="shadow-md">
                🔄 Ajukan Jadwal Ulang (Reschedule)
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-gray-200">
                <tr>
                  <th className="p-3">Hari</th>
                  <th className="p-3">Sesi Waktu</th>
                  <th className="p-3">Lokasi Mengajar</th>
                  <th className="p-3 text-center">Jumlah Murid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reg.availableSlots.length > 0 ? (
                  reg.availableSlots.map((slotStr) => {
                    const [dayIdx, sessionIdx] = slotStr.split('|').map(Number);
                    const studentCount = getStudentsForSlot(dayIdx);
                    return (
                      <tr key={slotStr} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-700">{DAYS_ID[dayIdx]}</td>
                        <td className="p-3 text-slate-600">{SESSIONS_ID[sessionIdx]}</td>
                        <td className="p-3 text-slate-600">{assignedPools[0]?.name || 'Kolam Mitra'}</td>
                        <td className="p-3 text-center">
                          {studentCount > 0 ? (
                            <Badge variant="azure">{studentCount} Murid</Badge>
                          ) : (
                            <span className="text-xs text-slate-400">0 Murid (Slot Kosong)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-slate-400">
                      Belum ada slot ketersediaan mengajar yang didaftarkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {reg.rescheduleRequests && reg.rescheduleRequests.length > 0 && (
          <Card variant="dashboard" className="p-6">
            <h3 className="font-heading font-bold text-base text-[#1D3557] mb-3">
              Riwayat Pengajuan Jadwal Ulang
            </h3>
            <div className="space-y-2">
              {reg.rescheduleRequests.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <p className="font-semibold text-slate-700">{req.reason}</p>
                    <p className="text-slate-400">Diajukan pada: {new Date(req.createdAt).toLocaleDateString('id-ID')}</p>
                  </div>
                  <Badge variant="azure">Menunggu Persetujuan Admin</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
