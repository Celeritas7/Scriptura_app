import * as React from 'react';

export interface TabProps {
  children?: React.ReactNode;
  /** Leading glyph — the script character for content tabs, or an emoji for mode tabs. */
  icon?: React.ReactNode;
  /** Optional count badge (stacked layout). */
  count?: number | string;
  active?: boolean;
  /** Active-fill hue. */
  accent?: 'practice' | 'quiz' | 'sheet' | 'review' | 'indic' | 'cjk';
  /** `inline` = icon+label row (mode tabs); `stacked` = glyph/label/count column (content tabs). */
  layout?: 'inline' | 'stacked';
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Two-level navigation tab.
 *
 * @startingPoint section="Navigation" subtitle="Mode & content tabs with accent fills" viewport="700x150"
 */
export function Tab(props: TabProps): React.ReactElement;
