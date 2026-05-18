import React, { useMemo } from 'react';
import PageSheet from './PageSheet';
import type { FontConfig } from '../../types';

interface PreviewAreaProps {
  letters: string[];
  cols: number;
  rows: number;
  perPage: number;
  heightCm: number;
  fontConfig: FontConfig;
  strokeWidth: number;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({
  letters,
  cols,
  rows,
  perPage,
  heightCm,
  fontConfig,
  strokeWidth,
}) => {
  const cellHeightMM = heightCm * 10;
  const cellWidthMM = cellHeightMM * 0.75;

  // 300 DPI for super sharp printing
  const CANVAS_SCALE = 300 / 25.4;
  const cellHeightPx = Math.round(cellHeightMM * CANVAS_SCALE);
  const cellWidthPx = Math.round(cellWidthMM * CANVAS_SCALE);

  // Split letters into pages
  const pages = useMemo(() => {
    if (letters.length === 0) return [[]];
    const result: string[][] = [];
    for (let i = 0; i < letters.length; i += perPage) {
      result.push(letters.slice(i, i + perPage));
    }
    return result;
  }, [letters, perPage]);

  const pageCount = pages.length;

  return (
    <div className="preview-area">
      <span className="preview-count no-print">
        {pageCount === 1 ? '1 página' : `${pageCount} páginas`}
        {' · '}
        {letters.length} {letters.length === 1 ? 'letra' : 'letras'}
      </span>

      {pages.map((pageLetters, idx) => (
        <div className="page-sheet-wrapper" key={idx}>
          <PageSheet
            letters={pageLetters}
            cols={cols}
            rows={rows}
            cellWidthPx={cellWidthPx}
            cellHeightPx={cellHeightPx}
            cellWidthMM={cellWidthMM}
            cellHeightMM={cellHeightMM}
            pageNumber={idx + 1}
            fontConfig={fontConfig}
            strokeWidth={strokeWidth}
          />
        </div>
      ))}
    </div>
  );
};

export default PreviewArea;
