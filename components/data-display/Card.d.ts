import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Adds hover lift + border brighten for selectable cards. */
  interactive?: boolean;
  /** CSS padding value. Defaults to the standard card step. */
  padding?: string;
}

/** Standard rounded surface panel (radius-2xl, hairline border). */
export function Card(props: CardProps): React.ReactElement;
