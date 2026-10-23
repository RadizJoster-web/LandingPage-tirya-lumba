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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#0077B6]/10 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          <BrandLogo />
          <NavigationList />
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
