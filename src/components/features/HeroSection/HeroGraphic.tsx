import React from 'react';

export const HeroGraphic: React.FC = () => {
  return (
    <div className="lg:col-span-5 flex justify-center">
      <div className="relative w-full max-w-md">
        {/* Glassmorphic card illustration wrapper */}
        <div className="relative rounded-3xl bg-gradient-to-tr from-[#0077B6] via-[#00B4D8] to-[#90e0ef] p-6 shadow-2xl shadow-blue-900/20 text-white overflow-hidden">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-[#FF6F59]/30 rounded-full blur-2xl" />

          <div className="relative z-10 space-y-6">
            {/* Decorative Waves SVG */}
            <div className="h-44 sm:h-52 flex items-center justify-center">
              <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10,80 Q 80,40 160,80 T 310,80"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 10,120 Q 80,80 160,120 T 310,120"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 10,160 Q 80,120 160,160 T 310,160"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Swimming circle / float ring */}
                <circle cx="240" cy="50" r="22" fill="#FF6F59" opacity="0.9" />
                <circle cx="240" cy="50" r="12" fill="#ffffff" />
              </svg>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-100">
                  Metode Belajar
                </span>
                <span className="text-xs bg-[#FF6F59] px-2.5 py-0.5 rounded-full font-bold">
                  PRSI Standard
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold">
                Pengenalan Air → Gaya Dada → Bebas → Prestasi
              </p>
            </div>
          </div>
        </div>

        {/* Floating review card */}
        <div className="absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-blue-50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E0FBFC] flex items-center justify-center text-lg">
            🏊
          </div>
          <div>
            <div className="flex text-amber-400 text-xs">★★★★★</div>
            <p className="text-xs font-bold text-[#1D3557]">
              Pendaftaran 100% Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
