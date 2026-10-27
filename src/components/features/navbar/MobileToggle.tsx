import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileToggle: React.FC<MobileToggleProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <div className="flex md:hidden">
      <button
        type="button"
        onClick={onToggle}
        className="p-2 text-[#1D3557] hover:text-[#00B4D8] focus:outline-none transition-colors"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
};
