import React from 'react';

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
        className="p-2 text-[#1D3557] hover:text-[#00B4D8] focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
    </div>
  );
};
