export interface FontConfig {
  name: string;
  family: string;
  weight: string;
  inflate: number;
}

export interface GridResult {
  cols: number;
  rows: number;
  perPage: number;
}

export interface DrawOptions {
  fontFamily: string;
  fontWeight: string;
  inflate: number;
  strokeWidth: number;
  cellPx: number;
}
