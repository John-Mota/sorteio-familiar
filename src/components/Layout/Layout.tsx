import React from 'react';
import Header, { type ModuleType } from './Header';

interface LayoutProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeModule, onModuleChange, children }) => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-bg-base text-text-primary font-sans">
      <Header activeModule={activeModule} onModuleChange={onModuleChange} />
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default Layout;
