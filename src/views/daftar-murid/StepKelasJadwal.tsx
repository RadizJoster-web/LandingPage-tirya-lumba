import React from 'react';
import { MuridStep2Props } from './types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CoachSelector } from './CoachSelector';
import { PoolPackagePicker } from './PoolPackagePicker';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

export const StepKelasJadwal: React.FC<MuridStep2Props> = ({
  areas,
  areaId,
  setAreaId,
  areaLocations,
  locationId,
  onSelectLocation,
  locationPackages,
  packageId,
  setPackageId,
  firstMeetDate,
  setFirstMeetDate,
  sessions,
  sessionLoading,
  sessionName,
  setSessionName,
  instructors,
  instructorLoading,
  instructorId,
  setInstructorId,
  isLoadingData,
  onSubmit,
  onBack,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={onSubmit} className="space-y-6 animate-fade-in">
      <PoolPackagePicker
        areas={areas}
        areaId={areaId}
        setAreaId={setAreaId}
        areaLocations={areaLocations}
        locationId={locationId}
        onSelectLocation={onSelectLocation}
        locationPackages={locationPackages}
        packageId={packageId}
        setPackageId={setPackageId}
        isLoadingData={isLoadingData}
      />

      <div className="space-y-4">
        <Input
          label="Tanggal Mulai Les Pertama *"
          type="date"
          min={todayStr}
          value={firstMeetDate}
          onChange={(e) => setFirstMeetDate(e.target.value)}
          required
        />

        {/* Time slot pills for sessionName */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Pilihan Sesi Jam Latihan *
          </label>
          {!firstMeetDate ? (
            <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-lg border border-slate-200/60 dark:bg-slate-900 dark:border-slate-800">
              Pilih tanggal mulai les terlebih dahulu untuk melihat jadwal sesi yang aktif di kolam ini.
            </p>
          ) : sessionLoading ? (
            <p className="text-xs text-slate-400 p-3 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
              Memuat sesi yang tersedia...
            </p>
          ) : sessions.length === 0 ? (
            <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
              Tidak ada sesi latihan terdaftar pada hari tersebut di kolam ini. Silakan coba pilih hari atau tanggal lain.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {sessions.map((session) => {
                const isSelected = sessionName === session.sessionName;
                return (
                  <button
                    key={session.id}
                    type="button"
                    onClick={() => setSessionName(session.sessionName)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'border-[#00B4D8] bg-[#E0FBFC] text-[#0077B6] font-bold shadow-xs'
                        : 'border-gray-200 bg-white text-slate-700 hover:border-[#00B4D8]/50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold">{session.sessionName}</span>
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {session.startTime} – {session.endTime}
                      </span>
                    </div>
                    <Clock className={`w-4 h-4 ${isSelected ? 'text-[#0077B6]' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <CoachSelector
        sessionReady={Boolean(locationId && firstMeetDate && sessionName)}
        availableCoaches={instructors}
        isLoading={instructorLoading}
        coachId={instructorId}
        setCoachId={setInstructorId}
      />

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          size="md"
          isFullRounded={false}
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={false}
          className="font-semibold flex items-center gap-2"
        >
          <span>Lanjut ke Pembayaran</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
