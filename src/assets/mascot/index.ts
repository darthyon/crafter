/**
 * Mascot Registry — typed access to Crafter's notebook companion.
 *
 * Usage:
 *   import { getMascot, MascotState } from '@/assets/mascot';
 *
 *   const Mascot = getMascot('idle');
 *   <Mascot size={48} />
 *
 *   // Direct import (tree-shakeable):
 *   import { Idle } from '@/assets/mascot';
 *   <Idle size={32} />
 *
 * Adding a new state:
 *   1. Create the SVG component file
 *   2. Import it below
 *   3. Add it to MASCOT_MAP
 *   4. Add it to the MascotState union type
 */

import type React from 'react';
import { Idle } from './Idle';
import { Fallback } from './Fallback';
import type { MascotProps } from './types';

export type { MascotProps } from './types';

/**
 * All valid mascot states.
 *
 * Maps to states from docs/stack.md.
 * Unimplemented states resolve to idle via the registry.
 */
export type MascotState =
  | 'idle'
  | 'writing-01'
  | 'writing-02'
  | 'writing-03'
  | 'waving'
  | 'sleepy'
  | 'sparkle';

/** Mascot component signature */
type MascotComponent = React.FC<MascotProps>;

/**
 * Internal map: state → component.
 *
 * Only 'idle' is implemented in V1.
 * All other states fall through to 'idle' in the resolver below,
 * or resolve to Fallback if the key is unknown.
 */
const MASCOT_MAP: Record<string, MascotComponent> = {
  idle: Idle,
};

/**
 * Resolve a mascot state to its component.
 *
 * Returns the state's component if implemented, 'idle' as fallback,
 * or Fallback as the ultimate safety net.
 *
 * @example
 *   const Mascot = getMascot('writing-01'); // → Idle (not yet built)
 *   const Mascot = getMascot('idle');        // → Idle
 */
export function getMascot(state: MascotState | string): MascotComponent {
  if (state in MASCOT_MAP) {
    return MASCOT_MAP[state];
  }
  // All unimplemented states gracefully degrade to idle
  return MASCOT_MAP['idle'] ?? Fallback;
}

/**
 * Check if a mascot state has a unique implementation (not idle fallback).
 */
export function hasMascot(state: MascotState | string): boolean {
  return state in MASCOT_MAP;
}

// Re-export individual components for direct tree-shakeable imports.
export { Idle } from './Idle';
export { Fallback } from './Fallback';
