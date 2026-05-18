import React from 'react';
import {
  LetterInput,
  FontPicker,
  SizeControl,
  StrokeControl,
} from './SidebarControls';
import type { GridResult } from '../../types';
import { FONTS } from '../../utils/constants';

interface SidebarProps {
  lettersRaw: string;
  onLettersChange: (v: string) => void;

  selectedFontIdx: number;
  onFontChange: (idx: number) => void;

  heightCm: number;
  onHeightChange: (v: number) => void;
  grid: GridResult;

  strokeWidth: number;
  onStrokeChange: (v: number) => void;

  onPrint: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  lettersRaw,
  onLettersChange,
  selectedFontIdx,
  onFontChange,
  heightCm,
  onHeightChange,
  grid,
  strokeWidth,
  onStrokeChange,
  onPrint,
}) => {
  return (
    <aside className="sidebar no-print">
      <div className="sidebar-header">
        <h1>✂ Molde Alfabeto</h1>
        <p>Gerador de moldes para impressão em A4</p>
      </div>

      <div className="sidebar-body">
        <LetterInput value={lettersRaw} onChange={onLettersChange} />

        <FontPicker
          fonts={FONTS}
          selectedIdx={selectedFontIdx}
          onSelect={onFontChange}
        />

        <SizeControl
          heightCm={heightCm}
          onChange={onHeightChange}
          cols={grid.cols}
          rows={grid.rows}
          perPage={grid.perPage}
        />

        <StrokeControl strokeWidth={strokeWidth} onChange={onStrokeChange} />

        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <button id="btn-print" className="btn-print" onClick={onPrint}>
            🖨 Imprimir / Salvar PDF
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
