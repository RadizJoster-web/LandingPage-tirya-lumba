import React from 'react';

export const FooterSocial: React.FC = () => {
  return (
    <div>
      <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide">
        Media Sosial
      </h4>
      <ul className="space-y-2.5 text-sm">
        <li>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00B4D8] transition-colors flex items-center gap-2"
          >
            <span>📷</span> Instagram
          </a>
        </li>
        <li>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00B4D8] transition-colors flex items-center gap-2"
          >
            <span>▶️</span> YouTube Channel
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00B4D8] transition-colors flex items-center gap-2"
          >
            <span>💬</span> WhatsApp Konsultasi
          </a>
        </li>
      </ul>
    </div>
  );
};
