import { useRef, useEffect, useCallback } from 'react';
import type { DrawOptions } from '../types';
import { drawBubbleLetter } from '../utils/drawBubbleLetter';

/**
 * Hook that manages a canvas ref and triggers re-renders when dependencies change.
 * Returns { canvasRef, redraw }.
 */
export function useBubbleLetter(letter: string, opts: DrawOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawBubbleLetter(ctx, letter, opts);
  }, [letter, opts]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  return { canvasRef, redraw };
}
