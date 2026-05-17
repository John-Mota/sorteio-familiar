import React from 'react';
import LetterCanvas from './LetterCanvas';
import type { FontConfig, DrawOptions } from '../../types';
import { PAD_MM, PREV_SCALE } from '../../utils/constants';

interface PageSheetProps {
  letters: string[];
  cols: number;
  rows: number;
  cellWidthPx: number;
  cellHeightPx: number;
  cellWidthMM: number;
  cellHeightMM: number;
  pageNumber: number;
  fontConfig: FontConfig;
  strokeWidth: number;
}

const PageSheet: React.FC<PageSheetProps> = ({
  letters,
  cols,
  rows,
  cellWidthPx,
  cellHeightPx,
  cellWidthMM,
  cellHeightMM,
  pageNumber,
  fontConfig,
  strokeWidth,
}) => {
  const drawOpts: DrawOptions = {
    fontFamily: fontConfig.family,
    fontWeight: fontConfig.weight,
    inflate: fontConfig.inflate,
    strokeWidth,
    cellWidthPx,
    cellHeightPx,
    cellWidthMM,
    cellHeightMM,
  };

  const availableWidthMM = 210 - PAD_MM * 2;
  const availableHeightMM = 297 - PAD_MM * 2;

  const gridWidthMM = cols * cellWidthMM;
  const gridHeightMM = rows * cellHeightMM;

  const topOffsetMM = PAD_MM + (availableHeightMM - gridHeightMM) / 2;
  const leftOffsetMM = PAD_MM + (availableWidthMM - gridWidthMM) / 2;

  return (
    <div className="page-sheet">

      <div
        className="letter-grid"
        style={{
          top: `${topOffsetMM}mm`,
          left: `${leftOffsetMM}mm`,
          gridTemplateColumns: `repeat(${cols}, ${cellWidthMM}mm)`,
          gridTemplateRows: `repeat(${rows}, ${cellHeightMM}mm)`,
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


    </div>
  );
};

export default React.memo(PageSheet);
