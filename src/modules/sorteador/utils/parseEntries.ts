import type { Entry } from '../types/sorteador.types';

export function parseEntries(raw: string): Entry[] {
  const lines = raw.split('\n');
  const values = new Set<string>();
  const entries: Entry[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !values.has(trimmed)) {
      values.add(trimmed);
      entries.push({
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        value: trimmed,
        drawn: false,
      });
      if (entries.length >= 500) break;
    }
  }
  
  return entries;
}
