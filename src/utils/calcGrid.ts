import type { GridResult } from '../types';
import { A4_W_MM, A4_H_MM } from './constants';

/**
 * Pure function: calculates grid dimensions for a given letter height.
 * Cells are square, so heightCm drives both cols and rows.
 */
export function calcGrid(heightCm: number): GridResult {
  const cellHeightMM = heightCm * 10;
  const cellWidthMM = cellHeightMM * 0.75;
  const cols = Math.max(1, Math.floor(A4_W_MM / cellWidthMM));
  const rows = Math.max(1, Math.floor(A4_H_MM / cellHeightMM));
  const perPage = cols * rows;
  return { cols, rows, perPage };
}
