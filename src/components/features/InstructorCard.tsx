import React from 'react';
import { Instructor } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DAYS_ID } from '@/lib/constants';

interface InstructorCardProps {
  data: Instructor;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({ data }) => {
  const activeDays = data.availableDays.map((d) => DAYS_ID[d]).join(', ');

  return (
    <Card variant="landing" className="flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl font-bold">
            🏊‍♂️
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#1D3557]">
              {data.name}
            </h3>
            <Badge variant="azure" className="mt-1">
              {data.license}
            </Badge>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-slate-600 mt-2">
          <p>
            <span className="font-semibold text-[#1D3557]">Hari Mengajar:</span> {activeDays}
          </p>
          <p>
            <span className="font-semibold text-[#1D3557]">Kolam Tersedia:</span> {data.poolIds.length} Lokasi Mitra
          </p>
        </div>
      </div>
    </Card>
  );
};

export default InstructorCard;
