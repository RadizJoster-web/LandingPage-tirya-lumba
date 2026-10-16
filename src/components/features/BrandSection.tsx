import React from 'react';

const BRANDS = [
  { name: 'AquaGear', role: 'Official Equipment' },
  { name: 'SpeedoPro', role: 'Swimwear Partner' },
  { name: 'Dispora Tangerang', role: 'Official Endorsement' },
  { name: 'PRSI', role: 'Curriculum Standard' },
  { name: 'HydroFit', role: 'Hydration & Nutrition' },
  { name: 'Tirta Sehat', role: 'Water Quality Partner' },
];

export const BrandSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">
          Bekerjasama dengan Organisasi & Brand Olahraga Terkemuka
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 opacity-85">
          {BRANDS.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center group cursor-default">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-[#0077B6] group-hover:text-[#00B4D8] transition-colors">
                {brand.name}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {brand.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
