import React, { useMemo } from 'react';
import PageSheet from './PageSheet';
import type { FontConfig } from '../../types';
import { PREV_SCALE } from '../../utils/constants';

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
  // cellPx: convert heightCm (in mm) to preview pixels
  const cellPx = Math.round(heightCm * 10 * PREV_SCALE);

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
        <PageSheet
          key={idx}
          letters={pageLetters}
          cols={cols}
          rows={rows}
          cellPx={cellPx}
          pageNumber={idx + 1}
          fontConfig={fontConfig}
          strokeWidth={strokeWidth}
        />
      ))}
    </div>
  );
};

export default PreviewArea;
