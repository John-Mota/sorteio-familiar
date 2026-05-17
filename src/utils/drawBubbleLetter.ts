import type { DrawOptions } from '../types';

/**
 * Pure function: draws a single bubble/mold letter onto a canvas context.
 *
 * Technique: 5-layer rendering
 *  1. Thick outer black stroke  → border of the mold
 *  2. White inner stroke        → separates border from fill
 *  3. White fillText            → body of the letter
 *  4. Thin inner stroke         → inner cut line (for cutting guide)
 *  5. White fillText final      → cleans up
 */
export function drawBubbleLetter(
  ctx: CanvasRenderingContext2D,
  letter: string,
  opts: DrawOptions,
): void {
  const { fontFamily, fontWeight, inflate, strokeWidth, cellPx } = opts;
  const S = cellPx;

  ctx.clearRect(0, 0, S, S);

  if (!letter || !letter.trim()) return;

  const char = letter.trim()[0];

  // ── Step 1: calibrate fontSize so the letter occupies ~88% of cell height ──
  let fontSize = S * 0.88;

  const measure = (size: number) => {
    ctx.font = `${fontWeight} ${size}px "${fontFamily}"`;
    const m = ctx.measureText(char);
    return (m.actualBoundingBoxAscent ?? 0) + (m.actualBoundingBoxDescent ?? 0);
  };

  // Binary-search the correct font size (max 6 iterations)
  const targetH = S * 0.88;
  let lo = 8;
  let hi = S * 1.2;
  for (let i = 0; i < 8; i++) {
    const mid = (lo + hi) / 2;
    if (measure(mid) < targetH) lo = mid;
    else hi = mid;
  }
  fontSize = lo;

  const cx = S / 2;
  const cy = S / 2 + fontSize * 0.03;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const setFont = () => {
    ctx.font = `${fontWeight} ${fontSize}px "${fontFamily}"`;
  };

  // ── Layer 1: thick outer black stroke ────────────────────────────────────
  setFont();
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = (inflate + strokeWidth) * 2;
  ctx.strokeText(char, cx, cy);

  // ── Layer 2: white inner stroke ──────────────────────────────────────────
  setFont();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = inflate * 2;
  ctx.strokeText(char, cx, cy);

  // ── Layer 3: white fill (letter body) ───────────────────────────────────
  setFont();
  ctx.fillStyle = '#ffffff';
  ctx.fillText(char, cx, cy);

  // ── Layer 4: thin inner cut line ─────────────────────────────────────────
  setFont();
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 1.8;
  ctx.strokeText(char, cx, cy);

  // ── Layer 5: final white fill (clean-up) ─────────────────────────────────
  setFont();
  ctx.fillStyle = '#ffffff';
  ctx.fillText(char, cx, cy);
}
