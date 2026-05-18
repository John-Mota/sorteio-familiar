import React, { useState } from 'react';
import InputPanel from './InputPanel';
import SorteioDisplay from './SorteioDisplay';
import ResultList from './ResultList';
import { useSorteador } from '../hooks/useSorteador';

type MobileTab = 'input' | 'display' | 'results';

const SorteadorLayout: React.FC = () => {
  const sorteador = useSorteador();
  const [mobileTab, setMobileTab] = useState<MobileTab>('display');

  const totalEntries = sorteador.entries.length;
  const hasEntries = totalEntries > 0;
  const availableEntriesCount = sorteador.entries.filter(e => !e.drawn).length;
  const hasAvailableEntries = availableEntriesCount > 0;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-bg-base text-text-primary">
      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-bg-surface border-b border-border p-2 shrink-0">
        <button 
          onClick={() => setMobileTab('input')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mobileTab === 'input' ? 'bg-bg-elevated text-text-primary border border-border shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
        >
          Participantes
        </button>
        <button 
          onClick={() => setMobileTab('display')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mobileTab === 'display' ? 'bg-bg-elevated text-text-primary border border-border shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
        >
          Sorteio
        </button>
        <button 
          onClick={() => setMobileTab('results')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mobileTab === 'results' ? 'bg-bg-elevated text-text-primary border border-border shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
        >
          Resultado
        </button>
      </div>

      {/* THREE COLUMNS: Responsive hiding based on mobileTab on small screens */}
      
      {/* Left Column (Input) */}
      <div className={`${mobileTab === 'input' ? 'flex' : 'hidden'} md:flex flex-col flex-1 md:flex-none md:w-[260px] lg:w-[280px] h-full`}>
        <InputPanel
          mode={sorteador.mode}
          onModeChange={sorteador.setMode}
          onNamesChange={sorteador.setEntries}
          onGenerateNumbers={sorteador.generateNumbers}
          removeAfterDraw={sorteador.removeAfterDraw}
          onToggleRemoveAfterDraw={sorteador.toggleRemoveAfterDraw}
          onReset={sorteador.reset}
          entriesCount={totalEntries}
        />
      </div>

      {/* Middle/Right Container for Tablet */}
      <div className={`${mobileTab !== 'input' ? 'flex' : 'hidden'} md:flex flex-col lg:flex-row flex-1 h-full overflow-hidden`}>
        
        {/* Center Column (Display) */}
        <div className={`${mobileTab === 'display' ? 'flex' : 'hidden'} md:flex lg:flex flex-col flex-1 h-full`}>
          <SorteioDisplay
            isAnimating={sorteador.isAnimating}
            currentDisplay={sorteador.currentDisplay}
            hasEntries={hasEntries}
            hasAvailableEntries={hasAvailableEntries}
            onDraw={sorteador.draw}
            drawnHistoryLength={sorteador.drawnHistory.length}
            totalEntries={totalEntries}
          />
        </div>

        {/* Right Column (Results) */}
        <div className={`${mobileTab === 'results' ? 'flex' : 'hidden'} md:flex lg:flex flex-col flex-1 md:flex-none lg:w-[280px] h-full lg:border-l-0 md:border-t lg:border-t-0 border-border`}>
          <ResultList
            drawnHistory={sorteador.drawnHistory}
            onRemove={sorteador.removeFromHistory}
          />
        </div>
        
      </div>
    </div>
  );
};

export default SorteadorLayout;
