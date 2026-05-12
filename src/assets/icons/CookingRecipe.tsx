import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
import { useColors } from '@/styles/theme';

/**
 * Cooking Recipe — a small cooking pot on a stove.
 *
 * Monochrome pixel-outline. Recognizable at 24px.
 * Used for cooking recipes, ingredients, meal prep notes.
 */
export function CookingRecipe({ size = 24, color }: IconProps) {
  const colors = useColors();
  const resolvedColor = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Pot body */}
      <Path
        d="M5 11 L5 18 C5 19.5 6 20 7 20 L17 20 C18 20 19 19.5 19 18 L19 11"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Pot rim */}
      <Path
        d="M4 9 L20 9"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Left handle */}
      <Path
        d="M4 11 L2 11"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Right handle */}
      <Path
        d="M20 11 L22 11"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Steam wisps */}
      <Path
        d="M9 7.5 C9 6 8 5.5 8 4.5"
        stroke={resolvedColor}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M12 7 C12 5.5 11 5 11 4"
        stroke={resolvedColor}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M15 7.5 C15 6 14 5.5 14 4.5"
        stroke={resolvedColor}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
