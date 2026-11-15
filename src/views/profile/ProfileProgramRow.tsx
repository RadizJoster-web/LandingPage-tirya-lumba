import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { RegistrationSnapshot } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { InstructorProfileWidget } from './InstructorProfileWidget';

interface ProfileProgramRowProps {
  snapshot?: RegistrationSnapshot | null;
}

export const ProfileProgramRow: React.FC<ProfileProgramRowProps> = ({ snapshot }) => {
  if (!snapshot) {
    return (
      <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="sm:w-1/3 space-y-1">
          <h3 className="text-sm font-bold text-[#1D3557] dark:text-slate-100">Program Kursus</h3>
          <p className="text-xs text-slate-400">Anda belum terdaftar dalam program pelatihan renang.</p>
        </div>
        <div className="sm:w-2/3 flex flex-col sm:flex-row gap-3">
          <Link href="/daftar/murid" className="flex-1">
            <Button variant="primary" size="sm" isFullRounded={false} className="w-full flex items-center justify-center gap-1.5 text-xs">
              <span>Daftar Murid</span><ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Link href="/daftar/guru" className="flex-1">
            <Button variant="outline" size="sm" isFullRounded={false} className="w-full flex items-center justify-center gap-1.5 text-xs">
              <span>Daftar Pelatih</span><ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isStudent = snapshot.kind === 'student';

  if (isStudent) {
    return (
      <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="sm:w-1/3 space-y-1">
          <h3 className="text-sm font-bold text-[#1D3557] dark:text-slate-100">Program &amp; Jadwal</h3>
          <p className="text-xs text-slate-400">Rincian paket kursus, lokasi kolam renang, dan pelatih resmi.</p>
        </div>
        <div className="sm:w-2/3 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Paket Kursus Renang</label>
              <div className="rounded-xl border border-gray-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-[#1D3557] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                Paket {snapshot.packageType || 'Reguler'}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Lokasi Kolam Renang</label>
              <div className="rounded-xl border border-gray-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-[#1D3557] flex items-center gap-1.5 truncate dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
                <span className="truncate">{snapshot.locationLabel || 'Kolam Mitra'}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Jadwal Sesi Pertemuan</label>
            <div className="rounded-xl border border-gray-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-[#1D3557] flex items-center gap-1.5 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
              <span>{snapshot.firstMeetSession || 'Sesi Terjadwal'}</span>
            </div>
          </div>
          {snapshot.instructorName && (
            <div className="pt-1"><InstructorProfileWidget snapshot={snapshot} /></div>
          )}
        </div>
      </div>
    );
  }

  const cv = mediaUrl(snapshot.cvUrl);
  return (
    <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="sm:w-1/3 space-y-1">
        <h3 className="text-sm font-bold text-[#1D3557] dark:text-slate-100">Kualifikasi Kepelatihan</h3>
        <p className="text-xs text-slate-400">Lisensi kepelatihan, pengalaman lapangan, dan dokumen portofolio.</p>
      </div>
      <div className="sm:w-2/3 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Lisensi Resmi</label>
            <div className="rounded-xl border border-gray-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-[#1D3557] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
              {snapshot.license || 'Lisensi Pelatih Nasional'}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Pengalaman Mengajar</label>
            <div className="rounded-xl border border-gray-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-[#1D3557] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
              {snapshot.experience || '–'}
            </div>
          </div>
        </div>
        {cv && (
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Dokumen CV Pelatih</label>
            <a href={cv} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8]">
              <span>Buka Dokumen CV Pelatih (PDF)</span><ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
