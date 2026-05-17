import React, { useRef, useEffect } from 'react';
import { drawBubbleLetter } from '../../utils/drawBubbleLetter';
import type { FontConfig, DrawOptions } from '../../types';

interface LetterInputProps {
  value: string;
  onChange: (v: string) => void;
}

export const LetterInput: React.FC<LetterInputProps> = ({ value, onChange }) => (
  <div>
    <p className="section-label">Letras</p>
    <textarea
      id="letter-input"
      className="letter-textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nou: A B C  ou: A,B,C'}
      spellCheck={false}
    />
    <p className="letter-hint">
      Sem espaço → uma por letra &nbsp;|&nbsp; Com espaço/vírgula → split
    </p>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────

interface FontPickerProps {
  fonts: FontConfig[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
}

const THUMB_PX = 38;

export const FontPicker: React.FC<FontPickerProps> = ({ fonts, selectedIdx, onSelect }) => {
  return (
    <div>
      <p className="section-label">Fonte</p>
      <div className="font-list">
        {fonts.map((font, idx) => (
          <FontOption
            key={font.family + font.weight}
            font={font}
            isSelected={idx === selectedIdx}
            onClick={() => onSelect(idx)}
          />
        ))}
      </div>
    </div>
  );
};

interface FontOptionProps {
  font: FontConfig;
  isSelected: boolean;
  onClick: () => void;
}

const FontOption: React.FC<FontOptionProps> = ({ font, isSelected, onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const opts: DrawOptions = {
      fontFamily: font.family,
      fontWeight: font.weight,
      inflate: font.inflate,
      strokeWidth: 5,
      cellWidthPx: THUMB_PX,
      cellHeightPx: THUMB_PX,
    };
    drawBubbleLetter(ctx, 'A', opts);
  }, [font]);

  return (
    <div
      className={`font-option${isSelected ? ' selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      id={`font-option-${font.family.replace(/\s+/g, '-')}`}
    >
      <canvas
        ref={canvasRef}
        width={THUMB_PX}
        height={THUMB_PX}
        style={{ width: THUMB_PX, height: THUMB_PX, borderRadius: 6, flexShrink: 0 }}
      />
      <span className="font-option-name">{font.name}</span>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────

interface SizeControlProps {
  heightCm: number;
  onChange: (v: number) => void;
  cols: number;
  rows: number;
  perPage: number;
}

const PRESETS = [5, 8, 12, 16, 20];
const MIN_CM = 3;
const MAX_CM = 22;

export const SizeControl: React.FC<SizeControlProps> = ({
  heightCm,
  onChange,
  cols,
  rows,
  perPage,
}) => {
  const pct = ((heightCm - MIN_CM) / (MAX_CM - MIN_CM)) * 100;

  return (
    <div>
      <p className="section-label">Tamanho da letra</p>
      <div className="slider-container">
        <div className="slider-row">
          <input
            id="size-slider"
            type="range"
            min={MIN_CM}
            max={MAX_CM}
            step={0.5}
            value={heightCm}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{ '--pct': `${pct}%` } as React.CSSProperties}
          />
          <div className="slider-value">
            {heightCm}
            <span className="slider-unit"> cm</span>
          </div>
        </div>

        <div className="presets">
          {PRESETS.map((p) => (
            <button
              key={p}
              id={`preset-${p}cm`}
              className={`preset-btn${heightCm === p ? ' active' : ''}`}
              onClick={() => onChange(p)}
            >
              {p} cm
            </button>
          ))}
        </div>

        <div className="grid-info">
          {cols} × {rows} = {perPage} por página
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────

interface StrokeControlProps {
  strokeWidth: number;
  onChange: (v: number) => void;
}

const MIN_STROKE = 1;
const MAX_STROKE = 16;

export const StrokeControl: React.FC<StrokeControlProps> = ({ strokeWidth, onChange }) => {
  const pct = ((strokeWidth - MIN_STROKE) / (MAX_STROKE - MIN_STROKE)) * 100;

  return (
    <div>
      <p className="section-label">Espessura do contorno</p>
      <div className="slider-container">
        <div className="slider-row">
          <input
            id="stroke-slider"
            type="range"
            min={MIN_STROKE}
            max={MAX_STROKE}
            step={0.5}
            value={strokeWidth}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{ '--pct': `${pct}%` } as React.CSSProperties}
          />
          <div className="slider-value">
            {strokeWidth}
            <span className="slider-unit"> px</span>
          </div>
        </div>
      </div>
    </div>
  );
};
