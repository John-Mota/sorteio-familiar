import React from 'react';
import type { Entry } from '../types/sorteador.types';

interface ResultListProps {
  drawnHistory: Entry[];
  onRemove: (id: string) => void;
}

const ResultList: React.FC<ResultListProps> = ({ drawnHistory, onRemove }) => {
  const handleExport = () => {
    if (drawnHistory.length === 0) return;
    
    // Formato: "1º - Maria\n2º - João"
    const text = drawnHistory
      .map((entry, index) => `${index + 1}º - ${entry.value}`)
      .join('\n');
      
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sorteio_resultados.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "5px" }} className="w-full gap-5 h-full bg-bg-surface border-l border-border flex flex-col p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          🏆 Ordem dos Sorteados
        </h2>
        <span className="text-xs font-bold text-accent bg-accent/15 px-2 py-0.5 rounded-full">
          {drawnHistory.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 pr-1 -mr-1" role="list">
        {drawnHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-text-muted text-center p-4">
            <span className="text-3xl mb-2 opacity-50">📋</span>
            <p className="text-sm">Nenhum sorteio ainda</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {drawnHistory.map((entry, index) => {
              const order = index + 1;
              const isRecent = index === drawnHistory.length - 1;
              
              return (
                <div 
                  key={`${entry.id}-${index}`}
                  className={`flex items-center justify-between p-4 rounded-sm gap-5 bg-bg-elevated border transition-all ${
                    isRecent ? 'border-accent shadow-[0_0_15px_var(--accent-glow)]' : 'border-border'
                  }`}
                  style={{ animation: 'slideInRight 300ms ease-out', padding: "5px" }}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-xs font-bold text-text-muted w-6 flex-shrink-0">
                      {order}º
                    </span>
                    <span className="text-sm font-medium text-text-primary truncate" title={entry.value}>
                      {entry.value}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemove(entry.id)}
                    className="text-text-muted hover:text-red-400 p-1.5 rounded-lg hover:bg-bg-surface transition-colors ml-2"
                    aria-label="Remover"
                    title="Remover e voltar para sorteio"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-border">
        <button
          onClick={handleExport}
          disabled={drawnHistory.length === 0}
          className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            drawnHistory.length === 0
              ? 'bg-bg-elevated text-text-muted cursor-not-allowed border border-border'
              : 'bg-bg-elevated text-text-primary border border-border hover:border-accent hover:text-accent'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Exportar lista
        </button>
      </div>
    </div>
  );
};

export default ResultList;
