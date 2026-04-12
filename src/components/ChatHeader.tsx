import React from 'react';
import { GemmaIcon } from './GemmaIcon';
import { UserProfile } from './UserProfile';

export const ChatHeader: React.FC = () => {
  return (
    <header className="p-6 flex justify-between items-center border-b border-[var(--md-sys-color-outline)]/20 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <GemmaIcon className="w-8 h-8" />
        <h1 className="text-2xl font-bold animate-gradient text-gradient">
          Gemma Open Access
        </h1>
      </div>
      <UserProfile />
    </header>
  );
};
