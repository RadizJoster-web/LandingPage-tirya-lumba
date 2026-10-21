import React from 'react';

interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
}

/** Satu pasangan label-nilai pada grid detail profil. */
export const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="mt-0.5 break-words text-sm font-semibold text-[#1D3557]">{value}</dd>
    </div>
  );
};
