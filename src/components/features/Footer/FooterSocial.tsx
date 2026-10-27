import React from 'react';
import { CS_WHATSAPP } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';

export const FooterSocial: React.FC = () => {
  return (
    <div>
      <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide">
        Media Sosial &amp; Kontak
      </h4>
      <ul className="space-y-2.5 text-sm">
        <li>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00B4D8] transition-colors flex items-center justify-between text-slate-300"
          >
            <span>Instagram Resmi</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </li>
        <li>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00B4D8] transition-colors flex items-center justify-between text-slate-300"
          >
            <span>Kanal YouTube</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </li>
        <li>
          <a
            href={`https://wa.me/${CS_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00B4D8] transition-colors flex items-center justify-between text-[#00B4D8] font-semibold"
          >
            <span>Konsultasi WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </li>
      </ul>
    </div>
  );
};
