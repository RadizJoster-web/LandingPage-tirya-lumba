import React from 'react';
import { Card } from '@/components/ui/Card';
import { StepIndicator } from '@/pages/daftar-murid/StepIndicator';

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
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-2xl mx-auto">
        <Card variant="form" className="p-6 sm:p-10 shadow-sm">
          <StepIndicator step={step} errorMsg={errorMsg} />
          {children}
        </Card>
      </div>
    </div>
  );
};
