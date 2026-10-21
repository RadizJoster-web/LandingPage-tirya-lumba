'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { NavLinks } from './NavLinks';
import { NavAuthButtons } from './NavAuthButtons';
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
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#00B4D8] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c.6.5 1.2.8 2.5.8 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.2 0 1.9.3 2.5.8" />
                <path d="M2 16c.6.5 1.2.8 2.5.8 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.2 0 1.9.3 2.5.8" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-xl text-[#0077B6] tracking-tight">
              Tirya Lumba
            </span>
          </Link>

          <NavLinks />

          <div className="hidden md:flex items-center gap-3">
            <NavAuthButtons
              user={user}
              registration={registration}
              isLoading={isLoading}
              onLogout={handleLogout}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1D3557] hover:text-[#00B4D8] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
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
