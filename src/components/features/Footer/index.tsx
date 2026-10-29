'use client';

import React from 'react';
import { FooterCompany } from './FooterCompany';
import { FooterSitemap } from './FooterSitemap';
import { FooterSocial } from './FooterSocial';
import { FooterBottom } from './FooterBottom';
import { MotionStagger, MotionStaggerItem, MotionFadeIn } from '@/components/ui/motion';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1D3557] text-slate-300 pt-14 pb-8 border-t border-blue-900/40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionStagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <MotionStaggerItem direction="up" distance={16} duration={0.5} className="md:col-span-2">
            <FooterCompany />
          </MotionStaggerItem>
          <MotionStaggerItem direction="up" distance={16} duration={0.5}>
            <FooterSitemap />
          </MotionStaggerItem>
          <MotionStaggerItem direction="up" distance={16} duration={0.5}>
            <FooterSocial />
          </MotionStaggerItem>
        </MotionStagger>

        <MotionFadeIn direction="up" distance={12} delay={0.2} duration={0.5}>
          <FooterBottom />
        </MotionFadeIn>
      </div>
    </footer>
  );
};

export default Footer;
