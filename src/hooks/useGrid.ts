import { useMemo } from 'react';
import type { GridResult } from '../types';
import { calcGrid } from '../utils/calcGrid';

/**
 * Memoized hook wrapping the pure calcGrid function.
 * Returns cols, rows, perPage for the given heightCm.
 */
export function useGrid(heightCm: number): GridResult {
  return useMemo(() => calcGrid(heightCm), [heightCm]);
}
