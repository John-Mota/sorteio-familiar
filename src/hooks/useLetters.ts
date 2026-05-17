import { useMemo } from 'react';

/**
 * Parses a raw string of letters into a clean string[].
 *
 * Rules:
 * - If string contains spaces or commas → split by /[\s,]+/
 * - Otherwise → split char by char
 * - Always toUpperCase, filter empty strings
 */
export function useLetters(raw: string): string[] {
  return useMemo(() => {
    if (!raw.trim()) return [];
    const hasDelimiter = /[\s,]/.test(raw);
    let parts: string[];
    if (hasDelimiter) {
      parts = raw.split(/[\s,]+/);
    } else {
      parts = raw.split('');
    }
    return parts.map((s) => s.toUpperCase()).filter((s) => s.length > 0);
  }, [raw]);
}
