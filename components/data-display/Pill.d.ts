import * as React from 'react';

export interface PillProps {
  children?: React.ReactNode;
  /** Native-script glyph shown before the label (e.g. မြန်မာ). */
  native?: React.ReactNode;
  /** CSS font-family for the native glyph, e.g. var(--font-burmese). */
  nativeFont?: string;
  active?: boolean;
  accent?: 'indic' | 'cjk' | 'practice' | 'quiz' | 'sheet' | 'review';
  onClick?: () => void;
}

/** Language-selection chip / tag pill with optional native glyph. */
export function Pill(props: PillProps): React.ReactElement;
