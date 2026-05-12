import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
import { useColors } from '@/styles/theme';

/**
 * Farming Crops — a sprout/seedling with two leaves.
 *
 * Monochrome pixel-outline. Recognizable at 24px.
 * Used for farming, crops, gardening, plants, foraging.
 */
export function FarmingCrops({ size = 24, color }: IconProps) {
  const colors = useColors();
  const resolvedColor = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Stem */}
      <Path
        d="M12 21 L12 10"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Ground line */}
      <Path
        d="M5 21 L19 21"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <Path
        d="M12 14 C12 14 8 12 6 14 C6 17 9 16 11 15"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right leaf */}
      <Path
        d="M12 11 C12 11 16 9 18 11 C18 14 15 13 13 12"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
