'use client';

import React from 'react';
import { RegistrationSnapshot } from '@/types';
import { User, Phone, Mail, MapPin, Building, Shirt, CreditCard } from 'lucide-react';

interface ProfilePublicInfoRowProps {
  fullName: string;
  phone?: string | null;
  email: string;
  address?: string | null;
  snapshot?: RegistrationSnapshot | null;
}

const PAYMENT_LABEL: Record<string, string> = {
  BANK_TRANSFER: 'Transfer Bank',
  CASH: 'Tunai di Kolam',
  QRIS: 'QRIS Digital',
};

export const ProfilePublicInfoRow: React.FC<ProfilePublicInfoRowProps> = ({
  fullName,
  phone,
  email,
  address,
  snapshot,
}) => {
  const isStudent = snapshot?.kind === 'student';

  return (
    <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="sm:w-1/3 space-y-1">
        <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
          Data Identitas &amp; Kontak
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Informasi identitas akun dan detail administrasi resmi yang terdaftar pada sistem.
        </p>
      </div>

      <div className="sm:w-2/3 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-0.5 dark:bg-slate-800/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
              <User className="w-3 h-3 text-[#0077B6]" />
              <span>Nama Lengkap</span>
            </div>
            <p className="font-heading text-xs font-bold text-[#1D3557] truncate dark:text-slate-100">
              {fullName || '–'}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-0.5 dark:bg-slate-800/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
              <Mail className="w-3 h-3 text-[#0077B6]" />
              <span>Alamat Email</span>
            </div>
            <p className="text-xs font-semibold text-[#1D3557] truncate dark:text-slate-100">
              {email}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-0.5 dark:bg-slate-800/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
              <Phone className="w-3 h-3 text-[#0077B6]" />
              <span>Nomor WhatsApp / HP</span>
            </div>
            <p className="text-xs font-semibold text-[#1D3557] truncate dark:text-slate-100">
              {phone || '–'}
            </p>
          </div>

          {address && (
            <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-0.5 dark:bg-slate-800/60 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                <MapPin className="w-3 h-3 text-[#0077B6]" />
                <span>Domisili</span>
              </div>
              <p className="text-xs font-semibold text-[#1D3557] truncate dark:text-slate-100">
                {address}
              </p>
            </div>
          )}

          {/* Student Specific Fields */}
          {isStudent && snapshot && (
            <>
              {snapshot.schoolOrOffice && (
                <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-0.5 dark:bg-slate-800/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                    <Building className="w-3 h-3 text-[#0077B6]" />
                    <span>Sekolah / Kantor</span>
                  </div>
                  <p className="text-xs font-semibold text-[#1D3557] truncate dark:text-slate-100">
                    {snapshot.schoolOrOffice}
                  </p>
                </div>
              )}

              {snapshot.tshirtSize && (
                <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-0.5 dark:bg-slate-800/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                    <Shirt className="w-3 h-3 text-[#0077B6]" />
                    <span>Ukuran Kaos Renang</span>
                  </div>
                  <p className="text-xs font-bold text-[#0077B6]">
                    Ukuran {snapshot.tshirtSize}
                  </p>
                </div>
              )}

              {snapshot.paymentMethod && (
                <div className="p-3 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-0.5 dark:bg-slate-800/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                    <CreditCard className="w-3 h-3 text-[#0077B6]" />
                    <span>Metode Pembayaran</span>
                  </div>
                  <p className="text-xs font-semibold text-[#1D3557] dark:text-slate-100">
                    {PAYMENT_LABEL[snapshot.paymentMethod] ?? snapshot.paymentMethod}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
