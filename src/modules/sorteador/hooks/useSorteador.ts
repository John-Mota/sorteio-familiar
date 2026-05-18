import { useState, useCallback, useRef } from 'react';
import type { Entry, SorteioMode, SorteadorState } from '../types/sorteador.types';
import { parseEntries } from '../utils/parseEntries';

export function useSorteador() {
  const [state, setState] = useState<SorteadorState>({
    mode: 'names',
    entries: [],
    drawnHistory: [],
    isAnimating: false,
    currentDisplay: '',
    removeAfterDraw: true,
  });

  const timerRef = useRef<number | null>(null);

  const setEntries = useCallback((raw: string) => {
    setState((prev) => ({
      ...prev,
      entries: parseEntries(raw),
      drawnHistory: [],
      currentDisplay: '',
    }));
  }, []);

  const generateNumbers = useCallback((min: number, max: number) => {
    const newEntries: Entry[] = [];
    const limit = Math.min(max - min + 1, 500); // Prevent massive arrays
    for (let i = 0; i < limit; i++) {
      const val = (min + i).toString();
      newEntries.push({
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        value: val,
        drawn: false,
      });
    }
    setState((prev) => ({
      ...prev,
      entries: newEntries,
      drawnHistory: [],
      currentDisplay: '',
    }));
  }, []);

  const setMode = useCallback((mode: SorteioMode) => {
    setState((prev) => ({
      ...prev,
      mode,
      entries: [],
      drawnHistory: [],
      currentDisplay: '',
    }));
  }, []);

  const toggleRemoveAfterDraw = useCallback(() => {
    setState((prev) => ({
      ...prev,
      removeAfterDraw: !prev.removeAfterDraw,
    }));
  }, []);

  const draw = useCallback(() => {
    setState((prev) => {
      const available = prev.entries.filter((e) => !e.drawn);
      if (available.length === 0 || prev.isAnimating) return prev;

      // Start animation
      const winnerIndex = Math.floor(Math.random() * available.length);
      const winner = available[winnerIndex];

      let elapsed = 0;
      const duration = 2500;
      const intervalMs = 80;

      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }

      timerRef.current = window.setInterval(() => {
        elapsed += intervalMs;
        if (elapsed >= duration) {
          // Stop animation
          window.clearInterval(timerRef.current!);
          timerRef.current = null;
          
          setState((curr) => {
            const updatedEntries = curr.entries.map((e) => 
              (e.id === winner.id && curr.removeAfterDraw) ? { ...e, drawn: true } : e
            );
            
            return {
              ...curr,
              isAnimating: false,
              currentDisplay: winner.value,
              entries: updatedEntries,
              drawnHistory: [winner, ...curr.drawnHistory],
            };
          });
        } else {
          // Slot machine effect
          const randomIdx = Math.floor(Math.random() * available.length);
          setState((curr) => ({
            ...curr,
            currentDisplay: available[randomIdx].value,
          }));
        }
      }, intervalMs);

      return {
        ...prev,
        isAnimating: true,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      entries: prev.entries.map((e) => ({ ...e, drawn: false })),
      drawnHistory: [],
      currentDisplay: '',
      isAnimating: false,
    }));
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      drawnHistory: prev.drawnHistory.filter((e) => e.id !== id),
      entries: prev.entries.map((e) => 
        e.id === id ? { ...e, drawn: false } : e
      ),
    }));
  }, []);

  return {
    ...state,
    setEntries,
    generateNumbers,
    setMode,
    toggleRemoveAfterDraw,
    draw,
    reset,
    removeFromHistory,
  };
}
