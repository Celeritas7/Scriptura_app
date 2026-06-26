import * as React from 'react';

export type SegmentOption = string | { value: string; label: string };

export interface SegmentedControlProps {
  options: SegmentOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Accent used for the active pill. */
  accent?: 'practice' | 'quiz' | 'sheet' | 'review' | 'indic' | 'cjk';
  style?: React.CSSProperties;
}

/**
 * Row of rounded option pills; the active one fills with an accent.
 *
 * @startingPoint section="Forms" subtitle="Segmented pill control for modes & ranges" viewport="700x150"
 */
export function SegmentedControl(props: SegmentedControlProps): React.ReactElement;
