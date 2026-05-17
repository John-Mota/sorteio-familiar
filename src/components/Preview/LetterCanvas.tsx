import React, { useMemo } from 'react';
import { useBubbleLetter } from '../../hooks/useBubbleLetter';
import type { DrawOptions } from '../../types';

interface LetterCanvasProps {
  letter: string;
  opts: DrawOptions;
}

/**
 * Renders a single letter on a square canvas using the bubble letter technique.
 * Size = cellPx × cellPx.
 */
const LetterCanvas: React.FC<LetterCanvasProps> = ({ letter, opts }) => {
  const { cellWidthPx, cellHeightPx } = opts;

  // Stable opts reference to avoid unnecessary redraws
  const stableOpts = useMemo(() => opts, [
    opts.fontFamily,
    opts.fontWeight,
    opts.inflate,
    opts.strokeWidth,
    opts.cellWidthPx,
    opts.cellHeightPx,
  ]);

  const { canvasRef } = useBubbleLetter(letter, stableOpts);

  return (
    <canvas
      ref={canvasRef}
      width={cellWidthPx}
      height={cellHeightPx}
      style={{
        width: `${opts.cellWidthMM}mm`,
        height: `${opts.cellHeightMM}mm`,
        display: 'block',
      }}
    />
  );
};

export default React.memo(LetterCanvas);
