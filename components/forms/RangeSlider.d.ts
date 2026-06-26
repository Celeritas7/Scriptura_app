import * as React from 'react';

export interface RangeSliderProps {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
  label?: string;
  /** Unit appended to the read-out, e.g. "px". */
  suffix?: string;
  showValue?: boolean;
}

/** Thin range slider with a quiz-blue thumb and inline value read-out. */
export function RangeSlider(props: RangeSliderProps): React.ReactElement;
