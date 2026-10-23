import React from 'react';
import { NavAuthButtons } from './NavAuthButtons';
import { AuthUser, RegistrationSnapshot } from '@/types';

interface AuthProfileProps {
  user: AuthUser | null;
  registration: RegistrationSnapshot | null;
  isLoading: boolean;
  onLogout: () => void;
}

export const AuthProfile: React.FC<AuthProfileProps> = ({
  user,
  registration,
  isLoading,
  onLogout,
}) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <NavAuthButtons
        user={user}
        registration={registration}
        isLoading={isLoading}
        onLogout={onLogout}
      />
    </div>
  );
};
