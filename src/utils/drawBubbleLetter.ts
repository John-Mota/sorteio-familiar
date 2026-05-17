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
  const { fontFamily, fontWeight, strokeWidth, cellWidthPx: W, cellHeightPx: H } = opts;

  ctx.clearRect(0, 0, W, H);

  if (!letter || !letter.trim()) return;

  const char = letter.trim()[0];

  // ── Step 1: calibrate fontSize so the letter occupies ~88% of cell height ──
  let fontSize = H * 0.88;

  const measure = (size: number) => {
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
    const m = ctx.measureText(char);
    const h = (m.actualBoundingBoxAscent ?? 0) + (m.actualBoundingBoxDescent ?? 0);
    // Para a largura, precisamos somar strokeWidth pois ele expande as bordas
    const w = m.width + (strokeWidth * 2);
    return { h, w };
  };

  // Binary-search the correct font size (max 8 iterations)
  const targetH = H * 0.88;
  const targetW = W * 0.88;
  
  let lo = 8;
  let hi = H * 1.5;
  for (let i = 0; i < 8; i++) {
    const mid = (lo + hi) / 2;
    const { h, w } = measure(mid);
    if (h < targetH && w < targetW) lo = mid;
    else hi = mid;
  }
  fontSize = lo;

  const cx = W / 2;
  const cy = H / 2 + fontSize * 0.03;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const setFont = () => {
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  };

  setFont();
  
  // ── Layer 1: Black Outline ───────────────────────────────────────────────
  // Multiply by 2 because stroke is drawn centered on the path, so half is inside.
  // We want the full strokeWidth visible on the outside.
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = strokeWidth * 2;
  ctx.strokeText(char, cx, cy);

  // ── Layer 2: White Fill ──────────────────────────────────────────────────
  // Drawn after stroke so the inside remains completely white
  ctx.fillStyle = '#ffffff';
  ctx.fillText(char, cx, cy);
}
