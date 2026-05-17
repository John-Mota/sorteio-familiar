import type { GridResult } from '../types';
import { A4_W_MM, A4_H_MM } from './constants';

/**
 * Pure function: calculates grid dimensions for a given letter height.
 * Cells are square, so heightCm drives both cols and rows.
 */
export function calcGrid(heightCm: number): GridResult {
  const cellMM = heightCm * 10;
  const cols = Math.max(1, Math.floor(A4_W_MM / cellMM));
  const rows = Math.max(1, Math.floor(A4_H_MM / cellMM));
  const perPage = cols * rows;
  return { cols, rows, perPage };
}
