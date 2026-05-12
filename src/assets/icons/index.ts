/**
 * Pixel Icon Registry — typed access to all Crafter icons.
 *
 * Usage:
 *   import { getIcon, IconId, CrafterDefault } from '@/assets/icons';
 *
 *   // Direct import (tree-shakeable):
 *   <CrafterDefault size={32} />
 *
 *   // Registry lookup (dynamic):
 *   const Icon = getIcon('cooking-recipe');
 *   <Icon size={24} />
 *
 * Adding a new icon:
 *   1. Create the SVG component file
 *   2. Import it below
 *   3. Add it to ICON_MAP
 *   4. Add it to the IconId union type
 */

import type React from 'react';
import { CrafterDefault } from './CrafterDefault';
import { CookingRecipe } from './CookingRecipe';
import { FarmingCrops } from './FarmingCrops';
import { Fallback } from './Fallback';
import type { IconProps } from './types';

export type { IconProps } from './types';

/**
 * All valid icon identifiers.
 *
 * Maps to categories from docs/stack.md.
 */
export type IconId =
  | 'crafter-default'
  | 'cooking-recipe'
  | 'preserves-jam'
  | 'farming-crops'
  | 'flowers-herbal-foraging'
  | 'wood-carpentry'
  | 'mining-ore'
  | 'fishing'
  | 'crafting-tools'
  | 'textile-yarn'
  | 'alchemy-potion'
  | 'decor-furniture-diy';

/** Icon component signature */
type IconComponent = React.FC<IconProps>;

/**
 * Internal map: icon ID → component.
 *
 * Missing implementations fall back to Fallback.
 * Add real SVG components here as they're built.
 */
const ICON_MAP: Record<string, IconComponent> = {
  'crafter-default': CrafterDefault,
  'cooking-recipe': CookingRecipe,
  'farming-crops': FarmingCrops,
};

/**
 * Resolve an icon by ID.
 *
 * Returns the icon component if implemented, Fallback otherwise.
 *
 * @example
 *   const Icon = getIcon('fishing');    // → Fallback (not yet built)
 *   const Icon = getIcon('crafter-default'); // → CrafterDefault
 */
export function getIcon(id: IconId | string): IconComponent {
  return ICON_MAP[id] ?? Fallback;
}

/**
 * Check if an icon ID has a real implementation (not just fallback).
 */
export function hasIcon(id: IconId | string): boolean {
  return id in ICON_MAP;
}

// Re-export individual components for direct tree-shakeable imports.
export { CrafterDefault } from './CrafterDefault';
export { CookingRecipe } from './CookingRecipe';
export { FarmingCrops } from './FarmingCrops';
export { Fallback } from './Fallback';
