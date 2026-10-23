import React from 'react';
import { Card } from '@/components/ui/Card';
import { StepIndicator } from './StepIndicator';
import { MuridHeader } from './MuridHeader';

interface MuridWizardLayoutProps {
  step: 1 | 2 | 3;
  errorMsg: string;
  children: React.ReactNode;
}

export const MuridWizardLayout: React.FC<MuridWizardLayoutProps> = ({
  step,
  errorMsg,
  children,
}) => {
  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/40 via-white to-[#F8F9FA]">
      <div className="max-w-2xl mx-auto">
        <Card variant="form" className="p-6 sm:p-8">
          <MuridHeader />
          <StepIndicator step={step} errorMsg={errorMsg} />
          {children}
        </Card>
      </div>
    </div>
  );
};
