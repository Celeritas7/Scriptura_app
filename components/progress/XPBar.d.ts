import * as React from 'react';

export interface XPBarProps {
  value?: number;
  max?: number;
  /** Level number/label shown in the leading chip. */
  level?: React.ReactNode;
  accent?: 'practice' | 'quiz' | 'indic' | 'review';
  showValue?: boolean;
  style?: React.CSSProperties;
}

/** Horizontal XP / level progress bar with a level chip. */
export function XPBar(props: XPBarProps): React.ReactElement;
