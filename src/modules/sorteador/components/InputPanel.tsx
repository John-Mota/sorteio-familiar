import React, { useState, useEffect } from 'react';
import type { SorteioMode } from '../types/sorteador.types';

interface InputPanelProps {
  mode: SorteioMode;
  onModeChange: (mode: SorteioMode) => void;
  onNamesChange: (raw: string) => void;
  onGenerateNumbers: (min: number, max: number) => void;
  removeAfterDraw: boolean;
  onToggleRemoveAfterDraw: () => void;
  onReset: () => void;
  entriesCount: number;
}

const InputPanel: React.FC<InputPanelProps> = ({
  mode,
  onModeChange,
  onNamesChange,
  onGenerateNumbers,
  removeAfterDraw,
  onToggleRemoveAfterDraw,
  onReset,
  entriesCount,
}) => {
  const [namesText, setNamesText] = useState('');
  const [minNum, setMinNum] = useState(1);
  const [maxNum, setMaxNum] = useState(100);

  // Sync textarea with the prop when it changes from outside? 
  // No, just call onNamesChange when namesText changes.
  useEffect(() => {
    if (mode === 'names') {
      const timeoutId = setTimeout(() => {
        onNamesChange(namesText);
      }, 300); // debounce slightly
      return () => clearTimeout(timeoutId);
    }
  }, [namesText, mode, onNamesChange]);

  const handleGenerateNumbers = () => {
    if (minNum <= maxNum) {
      onGenerateNumbers(minNum, maxNum);
    }
  };

  return (
    <div className="w-full lg:w-[280px] md:w-[260px] flex-shrink-0 bg-bg-surface border-r border-border h-full flex flex-col p-5 overflow-y-auto">
      <div className="flex bg-bg-elevated p-1 rounded-xl mb-6 border border-border">
        <button
          onClick={() => onModeChange('names')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
            mode === 'names'
              ? 'bg-bg-surface text-text-primary shadow-sm border border-border'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Nomes
        </button>
        <button
          onClick={() => onModeChange('numbers')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
            mode === 'numbers'
              ? 'bg-bg-surface text-text-primary shadow-sm border border-border'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Números
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {mode === 'names' ? (
          <div className="flex flex-col h-full">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Participantes
            </label>
            <textarea
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              placeholder="Digite um nome por linha&#10;Maria&#10;João&#10;Ana"
              className="flex-1 min-h-[150px] w-full bg-bg-base border border-border rounded-xl p-3 text-sm text-text-primary resize-none outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
            <div className="text-xs text-text-muted mt-2 text-right">
              {entriesCount} participante(s)
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1 block">
                  De:
                </label>
                <input
                  type="number"
                  value={minNum}
                  onChange={(e) => setMinNum(Number(e.target.value))}
                  className="w-full bg-bg-base border border-border rounded-xl p-2.5 text-sm text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1 block">
                  Até:
                </label>
                <input
                  type="number"
                  value={maxNum}
                  onChange={(e) => setMaxNum(Number(e.target.value))}
                  className="w-full bg-bg-base border border-border rounded-xl p-2.5 text-sm text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>
            </div>
            <button
              onClick={handleGenerateNumbers}
              className="w-full py-2.5 bg-bg-elevated border border-border rounded-xl text-sm font-medium text-text-primary hover:border-accent hover:text-accent transition-all"
            >
              Gerar lista
            </button>
            <div className="text-xs text-text-muted text-right">
              {entriesCount} número(s)
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-border flex flex-col gap-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={removeAfterDraw}
              onChange={onToggleRemoveAfterDraw}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${removeAfterDraw ? 'bg-accent' : 'bg-border'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${removeAfterDraw ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
          <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
            Remover após sorteio
          </span>
        </label>

        <button
          onClick={onReset}
          className="w-full py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl text-sm font-medium transition-all"
        >
          Resetar tudo
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
