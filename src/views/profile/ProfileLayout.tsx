import React from 'react';

interface ProfileLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  sidebar,
  children,
}) => {
  return (
    <main className="min-h-[85vh] bg-[#F8FAFC] dark:bg-slate-950 pb-16">
      {/* Kerangka 2 Kolom (Desktop > 820px) / 1 Kolom (Mobile) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex flex-col md:flex-row items-start gap-6 lg:gap-8">
        {sidebar}
        {children}
      </div>
    </main>
  );
};
