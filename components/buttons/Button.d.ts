import * as React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonAccent = 'practice' | 'quiz' | 'sheet' | 'review' | 'indic' | 'cjk' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. `primary` is a gradient fill + glow; `secondary` is a bordered surface; `ghost` is transparent. */
  variant?: ButtonVariant;
  /** Which functional hue to use (drives the gradient and glow on primary). */
  accent?: ButtonAccent;
  /** Padding/scale preset. */
  size?: ButtonSize;
  /** Optional leading glyph (emoji or character) shown before the label. */
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary call-to-action button in the Scriptura system.
 *
 * @startingPoint section="Buttons" subtitle="Gradient action button with colored glow" viewport="700x150"
 */
export function Button(props: ButtonProps): React.ReactElement;
