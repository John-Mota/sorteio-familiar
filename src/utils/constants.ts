import type { FontConfig } from '../types';

export const PAD_MM = 8;
export const A4_W_MM = 210 - PAD_MM * 2; // 194mm
export const A4_H_MM = 297 - PAD_MM * 2; // 281mm
export const PREV_SCALE = 540 / 210;      // px per mm in preview ≈ 2.571

export const FONTS: FontConfig[] = [
  { name: 'Cooper Black (padrão)', family: 'Cooper Black, serif', weight: '900', inflate: 12 },
  { name: 'Bubble Bold',          family: 'Arial Black', weight: '900', inflate: 12 },
  { name: 'Rounded Soft',         family: 'Verdana',     weight: '900', inflate: 10 },
  { name: 'Impact Molde',         family: 'Impact',      weight: '900', inflate: 8  },
  { name: 'Georgia Bold',         family: 'Georgia',     weight: '900', inflate: 11 },
];
