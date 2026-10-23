import React from 'react';

const BRANDS = [
  'AquaGear',
  'SpeedoPro',
  'Dispora Tangerang',
  'PRSI',
  'HydroFit',
  'Tirta Sehat',
];

/** Marquee dua salinan identik agar loop mulus; hover menghentikan animasi. */
export const BrandMarquee: React.FC = () => {
  return (
    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center"
        >
          {BRANDS.map((brand) => (
            <li
              key={brand}
              className="px-8 sm:px-12 font-heading font-extrabold text-lg sm:text-2xl text-[#0077B6] whitespace-nowrap hover:text-[#00B4D8] transition-colors"
            >
              {brand}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
