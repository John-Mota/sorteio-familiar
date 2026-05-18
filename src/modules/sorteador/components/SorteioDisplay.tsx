import React from 'react';

interface SorteioDisplayProps {
  isAnimating: boolean;
  currentDisplay: string;
  hasEntries: boolean;
  hasAvailableEntries: boolean;
  onDraw: () => void;
  drawnHistoryLength: number;
  totalEntries: number;
}

const SorteioDisplay: React.FC<SorteioDisplayProps> = ({
  isAnimating,
  currentDisplay,
  hasEntries,
  hasAvailableEntries,
  onDraw,
  drawnHistoryLength,
  totalEntries,
}) => {
  const isIdle = !isAnimating && !currentDisplay;
  const isResult = !isAnimating && !!currentDisplay;

  return (
    <div   style={{ padding: "5px" }} className="gap-5 flex-1 flex flex-col items-center justify-center p-12 bg-bg-base relative overflow-hidden">
      <div className={`relative flex items-center justify-center w-full max-w-4xl aspect-[3/2] sm:aspect-auto sm:h-[400px] rounded-3xl transition-all duration-300 ${
        isAnimating ? 'border-2 border-accent shadow-[0_0_40px_var(--accent-glow)]' : 'border border-border bg-bg-surface shadow-sm'
      }`} style={isAnimating ? { animation: 'glowPulse 0.8s ease-in-out infinite' } : {}}>
        
        {isIdle && (
          <div className="flex flex-col items-center text-text-muted">
            <div className="text-6xl mb-4 animate-pulse">🎲</div>
            <p className="text-lg font-medium">Clique em Sortear</p>
          </div>
        )}

        {isAnimating && (
          <div 
            className="text-accent font-black tracking-tight"
            style={{ 
              fontSize: 'clamp(48px, 8vw, 96px)',
              animation: 'shake 0.08s linear infinite, slotSpin 0.12s linear infinite' 
            }}
          >
            {currentDisplay}
          </div>
        )}

        {isResult && (
          <div className="flex flex-col items-center" style={{ animation: 'resultPop 400ms ease-out forwards' }}>
            <div 
              className="text-text-primary font-black tracking-tight mb-4 text-center px-4 break-words max-w-full"
              style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
            >
              {currentDisplay}
            </div>
            <div className="bg-bg-elevated text-text-muted px-4 py-1.5 rounded-full text-sm font-medium border border-border">
              {drawnHistoryLength} sorteado(s) de {totalEntries} total
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 w-full max-w-md">
        <button
          onClick={onDraw}
          disabled={!hasEntries || (!hasAvailableEntries && !isAnimating) || isAnimating}
          className={`w-full py-4 px-8 rounded-2xl text-xl font-bold transition-all duration-200 flex items-center justify-center gap-3 ${
            isAnimating || !hasEntries || (!hasAvailableEntries && !isAnimating)
              ? 'bg-bg-elevated text-text-muted cursor-not-allowed border border-border'
              : 'bg-accent text-white hover:bg-accent-hover shadow-[0_4px_14px_var(--accent-glow)] hover:-translate-y-1 hover:shadow-[0_6px_20px_var(--accent-glow)]'
          }`}
          aria-label={isAnimating ? 'Sorteando' : 'Sortear participante'}
        >
          {isAnimating ? (
            'Sorteando...'
          ) : (
            <>
              <span className="text-2xl">🎲</span>
              {isResult ? 'Sortear Novamente' : 'Sortear'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SorteioDisplay;
