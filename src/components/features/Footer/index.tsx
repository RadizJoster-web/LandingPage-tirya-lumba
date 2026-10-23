import React from 'react';
import { FooterCompany } from './FooterCompany';
import { FooterSitemap } from './FooterSitemap';
import { FooterSocial } from './FooterSocial';
import { FooterBottom } from './FooterBottom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1D3557] text-slate-300 pt-14 pb-8 border-t border-blue-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <FooterCompany />
          <FooterSitemap />
          <FooterSocial />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
