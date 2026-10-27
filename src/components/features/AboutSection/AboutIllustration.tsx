import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Award, ShieldCheck, Users } from 'lucide-react';

export const AboutIllustration: React.FC = () => {
  return (
    <div className="relative">
      {/* Soft rounded outer container (inspired by feature block in style.jpg) */}
      <div className="rounded-3xl bg-[#F8F9FA] p-6 sm:p-8 border border-slate-200/60 shadow-sm dark:bg-slate-950 dark:border-slate-800">
        {/* Crisp white inner card */}
        <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-lg shadow-blue-950/5 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Standar Kepelatihan
            </span>
            <Badge variant="azure" size="sm">
              PRSI Certified
            </Badge>
          </div>

          <div>
            <div className="text-3xl font-bold tracking-tight text-[#1D3557] font-heading dark:text-slate-100">
              100% Terverifikasi
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Sertifikasi keselamatan air &amp; biomekanik renang
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#0077B6]" />
                Protokol Keselamatan
              </span>
              <span className="font-semibold text-emerald-600">Terjamin</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Award className="w-4 h-4 text-[#0077B6]" />
                Akreditasi Pelatih
              </span>
              <span className="font-semibold text-[#1D3557] dark:text-slate-200">Level 1 &amp; 2 PRSI</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Users className="w-4 h-4 text-[#0077B6]" />
                Rasio Maksimum
              </span>
              <span className="font-semibold text-[#1D3557] dark:text-slate-200">1:5 Reguler • 1:1 Privat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
