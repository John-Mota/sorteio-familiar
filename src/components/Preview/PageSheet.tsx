import React from 'react';
import LetterCanvas from './LetterCanvas';
import type { FontConfig, DrawOptions } from '../../types';
import { PAD_MM, PREV_SCALE } from '../../utils/constants';

interface PageSheetProps {
  letters: string[];
  cols: number;
  rows: number;
  cellPx: number;
  pageNumber: number;
  fontConfig: FontConfig;
  strokeWidth: number;
}

const PageSheet: React.FC<PageSheetProps> = ({
  letters,
  cols,
  rows,
  cellPx,
  pageNumber,
  fontConfig,
  strokeWidth,
}) => {
  const padPx = PAD_MM * PREV_SCALE;

  const drawOpts: DrawOptions = {
    fontFamily: fontConfig.family,
    fontWeight: fontConfig.weight,
    inflate: fontConfig.inflate,
    strokeWidth,
    cellPx,
  };

  return (
    <div className="page-sheet">
      <span className="page-title">Molde Alfabeto</span>

      <div
        className="letter-grid"
        style={{
          top: padPx,
          left: padPx,
          gridTemplateColumns: `repeat(${cols}, ${cellPx}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellPx}px)`,
        }}
      >
        {letters.map((letter, idx) => (
          <LetterCanvas
            key={`${letter}-${idx}`}
            letter={letter}
            opts={drawOpts}
          />
        ))}
      </div>

      <span className="page-number">p. {pageNumber}</span>
    </div>
  );
};

export default React.memo(PageSheet);
