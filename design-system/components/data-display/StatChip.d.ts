import * as React from 'react';

export interface StatChipProps {
  value: React.ReactNode;
  label: React.ReactNode;
  /** Color of the value. */
  tone?: 'neutral' | 'correct' | 'incorrect' | 'streak' | 'quiz' | 'practice';
  /** `true` = large stacked tile (review stats); default = inline chip (quiz bar). */
  block?: boolean;
}

/** Compact stat — bold value + muted label on an inset surface. */
export function StatChip(props: StatChipProps): React.ReactElement;
