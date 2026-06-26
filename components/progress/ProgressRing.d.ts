import * as React from 'react';

export interface ProgressRingProps {
  value?: number;
  max?: number;
  /** Diameter in px. */
  size?: number;
  /** Ring thickness in px. */
  stroke?: number;
  accent?: 'practice' | 'quiz' | 'sheet' | 'review' | 'indic' | 'cjk';
  /** Big centered value (e.g. "24"). */
  label?: React.ReactNode;
  /** Small centered caption under the label (e.g. "/ 30 XP"). */
  sublabel?: React.ReactNode;
  /** Custom centered content (overrides label/sublabel). */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Circular progress ring with a centered read-out.
 *
 * @startingPoint section="Progress" subtitle="Daily-goal / completion ring" viewport="700x150"
 */
export function ProgressRing(props: ProgressRingProps): React.ReactElement;
