import React from 'react';

interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
}

export const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-semibold text-[#1D3557] dark:text-slate-200">
        {value}
      </dd>
    </div>
  );
};
