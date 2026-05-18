export type SorteioMode = 'names' | 'numbers';

export interface Entry {
  id: string;           // uuid ou index-based
  value: string;        // nome ou número como string
  drawn: boolean;       // já foi sorteado
}

export interface SorteadorState {
  mode: SorteioMode;
  entries: Entry[];
  drawnHistory: Entry[];   // ordem dos sorteados (primeiro sorteado = index 0)
  isAnimating: boolean;
  currentDisplay: string;  // valor sendo mostrado durante animação
  removeAfterDraw: boolean;
}
