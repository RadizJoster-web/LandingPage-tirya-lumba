import React from 'react';

interface ProfileLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  previewBar?: React.ReactNode;
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  sidebar,
  children,
  previewBar,
}) => {
  return (
    <main className="min-h-[85vh] bg-[#F8FAFC] dark:bg-slate-950 pb-16">
      {/* Bilah Pratinjau Prototype (Menempel di atas) */}
      {previewBar && (
        <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-gray-200/80 dark:border-slate-800 shadow-2xs">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
            {previewBar}
          </div>
        </div>
      )}

      {/* Kerangka 2 Kolom (Desktop) / 1 Kolom (Mobile) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex flex-col md:flex-row items-start gap-6 lg:gap-8">
        {sidebar}
        {children}
      </div>
    </main>
  );
};
