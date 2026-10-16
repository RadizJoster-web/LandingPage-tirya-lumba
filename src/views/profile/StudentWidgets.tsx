import React from 'react';
import { Pool, Instructor, StudentRegistration } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface StudentWidgetsProps {
  reg: StudentRegistration;
  pool: Pool;
  coach: Instructor;
  activeSessions: number;
  onShowLicense: () => void;
}

export const StudentWidgets: React.FC<StudentWidgetsProps> = ({
  reg,
  pool,
  coach,
  activeSessions,
  onShowLicense,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Widget 1: Guru yang Mengajar */}
      <Card variant="dashboard" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-base text-[#1D3557]">
              👨‍🏫 Profil Guru Anda
            </h3>
            <Badge variant="azure">Instruktur</Badge>
          </div>
          <div className="flex items-center gap-3 my-2">
            <div className="w-12 h-12 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl font-bold">
              🧑‍🏫
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1D3557]">{coach.name}</h4>
              <p className="text-xs text-slate-500">{coach.license}</p>
            </div>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100 mt-2">
          <button
            type="button"
            onClick={onShowLicense}
            className="text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8] underline flex items-center gap-1"
          >
            <span>📜</span> Lihat Lisensi Mengajar Pelatih
          </button>
        </div>
      </Card>

      {/* Widget 2: Jadwal Les */}
      <Card variant="dashboard" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-base text-[#1D3557]">
              📅 Jadwal Les Rutin
            </h3>
            <Badge variant={activeSessions > 0 ? 'success' : 'coral'}>
              {activeSessions} Sesi Tersisa
            </Badge>
          </div>
          <div className="space-y-1 text-xs text-slate-600">
            <p className="font-bold text-sm text-[#1D3557]">{pool.name}</p>
            <p className="text-slate-500">{pool.address}</p>
            <p className="pt-1 font-semibold text-[#0077B6]">
              Kelas {reg.classType} · Pukul {reg.startTime} WIB
            </p>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100 mt-2 flex items-center justify-between text-xs text-slate-500">
          <span>Total Pertemuan:</span>
          <span className="font-bold text-slate-700">{reg.totalSessions} Pertemuan</span>
        </div>
      </Card>

      {/* Widget 3: Pembayaran */}
      <Card variant="dashboard" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-base text-[#1D3557]">
              💳 Pembayaran
            </h3>
            <Badge variant="azure">{reg.paymentMethod}</Badge>
          </div>
          <div className="space-y-1 text-xs text-slate-600">
            <p className="text-xs text-slate-400">Total Biaya Paket:</p>
            <p className="font-heading font-extrabold text-xl text-[#0077B6]">
              {formatRupiah(reg.totalPrice)}
            </p>
            <p className="text-slate-500 pt-1">
              Status: <span className="text-emerald-600 font-semibold">Lunas & Terverifikasi</span>
            </p>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100 mt-2 text-xs text-slate-500">
          Ukuran Baju: <span className="font-bold text-slate-700">{reg.shirtSize}</span>
        </div>
      </Card>
    </div>
  );
};
