import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface DashboardHeaderProps {
  title: string;
  badgeText: string;
  userInfo: string;
  status: string;
  onStatusChange: (newStatus: 'approved' | 'rejected') => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  badgeText,
  userInfo,
  status,
  onStatusChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1D3557]">
            {title}
          </h1>
          <Badge variant="azure">{badgeText}</Badge>
        </div>
        <p className="text-sm text-slate-500">{userInfo}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">Demo Status:</span>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as 'approved' | 'rejected')}
          className="text-xs border border-gray-300 rounded p-1.5 bg-white text-slate-700"
        >
          <option value="approved">Status Disetujui</option>
          <option value="rejected">Status Ditolak</option>
        </select>
      </div>
    </div>
  );
};
