import * as React from 'react';

export interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Glyph to render — typically an arrow (← / →). */
  children?: React.ReactNode;
  /** Accessible label, e.g. "Previous character". */
  ariaLabel?: string;
  disabled?: boolean;
}

/** Circular 44px navigation button (prev/next). */
export function NavButton(props: NavButtonProps): React.ReactElement;
