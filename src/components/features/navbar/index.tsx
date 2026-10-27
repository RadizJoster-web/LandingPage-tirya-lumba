'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { BrandLogo } from './BrandLogo';
import { NavigationList } from './NavigationList';
import { AuthProfile } from './AuthProfile';
import { MobileToggle } from './MobileToggle';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, registration, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-slate-200/60 transition-all dark:bg-slate-900/80 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          <div className="flex items-center gap-8">
            <BrandLogo />
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <NavigationList />
          </div>

          <div className="flex items-center gap-3">
            <AuthProfile
              user={user}
              registration={registration}
              isLoading={isLoading}
              onLogout={handleLogout}
            />
            <MobileToggle
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        user={user}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
