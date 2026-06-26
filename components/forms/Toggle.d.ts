import * as React from 'react';

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Text shown to the right of the switch. */
  label?: string;
  disabled?: boolean;
}

/** Pill switch — practice-green when on. */
export function Toggle(props: ToggleProps): React.ReactElement;
