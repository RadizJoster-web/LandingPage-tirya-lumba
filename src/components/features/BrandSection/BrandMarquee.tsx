import React from 'react';

const BRANDS = [
  'AquaGear',
  'SpeedoPro',
  'Dispora Tangerang',
  'PRSI Banten',
  'HydroFit',
  'Tirta Sehat',
  'Dolphin Club',
  'Arena Pro',
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] py-3">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center"
        >
          {BRANDS.map((brand) => (
            <li
              key={brand}
              className="px-8 sm:px-14 font-heading font-bold text-lg sm:text-xl text-slate-400 whitespace-nowrap opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:text-[#0077B6] transition-all duration-300 cursor-default select-none tracking-tight"
            >
              {brand}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
