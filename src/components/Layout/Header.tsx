import React from 'react';

export type ModuleType = 'sorteador' | 'molde';

interface HeaderProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeModule, onModuleChange }) => {
  return (
    <header className="h-[56px] px-6 bg-bg-surface border-b border-border flex items-center justify-between shrink-0 select-none">
      <div className="text-text-primary font-semibold text-lg flex items-center gap-2">
        ✨ Studio Molde
      </div>
      <nav className="flex items-center gap-2">
        <button
          onClick={() => onModuleChange('sorteador')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeModule === 'sorteador'
              ? 'bg-accent/15 text-accent border border-accent'
              : 'bg-transparent text-text-muted hover:bg-bg-elevated border border-transparent'
          }`}
        >
          🎲 Sorteador
        </button>
        <button
          onClick={() => onModuleChange('molde')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeModule === 'molde'
              ? 'bg-accent/15 text-accent border border-accent'
              : 'bg-transparent text-text-muted hover:bg-bg-elevated border border-transparent'
          }`}
        >
          🔤 Molde Alfabeto
        </button>
      </nav>
    </header>
  );
};

export default Header;
