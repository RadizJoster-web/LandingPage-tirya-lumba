import React from 'react';
import { Card } from '@/components/ui/Card';
import { StepIndicator } from '../daftar-murid/StepIndicator';

interface GuruWizardLayoutProps {
  step: 1 | 2 | 3;
  errorMsg: string;
  children: React.ReactNode;
}

export const GuruWizardLayout: React.FC<GuruWizardLayoutProps> = ({
  step,
  errorMsg,
  children,
}) => {
  return (
    <div className="min-h-[85vh] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] dark:bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <Card variant="form" className="p-6 sm:p-9">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Karier Pelatih Tirya Lumba
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D3557] tracking-tight dark:text-slate-100">
              Formulir Pendaftaran Pelatih
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Bergabung bersama jejaring instruktur renang profesional di Tangerang Raya
            </p>
          </div>

          <StepIndicator
            step={step}
            totalSteps={3}
            labels={['Biodata Diri', 'Kualifikasi & CV', 'Kolam & Jadwal']}
            errorMsg={errorMsg}
          />
          {children}
        </Card>
      </div>
    </div>
  );
};
