import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
import { useColors } from '@/styles/theme';

/**
 * Crafter Default — an open notebook with writing lines.
 *
 * Monochrome pixel-outline. Recognizable at 24px.
 * Used as the default icon for entries without a specific craft category.
 */
export function CrafterDefault({ size = 24, color }: IconProps) {
  const colors = useColors();
  const resolvedColor = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Notebook body — open book shape */}
      <Path
        d="M4 5 C4 4 5 3 6 3 L18 3 C19 3 20 4 20 5 L20 19 C20 20 19 21 18 21 L6 21 C5 21 4 20 4 19 Z"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Spine */}
      <Path d="M12 3 L12 21" stroke={resolvedColor} strokeWidth={1.5} />
      {/* Writing lines — left page */}
      <Path d="M6.5 8 L10.5 8" stroke={resolvedColor} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M6.5 11.5 L10.5 11.5" stroke={resolvedColor} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M6.5 15 L10.5 15" stroke={resolvedColor} strokeWidth={1.5} strokeLinecap="round" />
      {/* Writing lines — right page */}
      <Path d="M13.5 8 L17.5 8" stroke={resolvedColor} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M13.5 11.5 L17.5 11.5" stroke={resolvedColor} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M13.5 15 L17.5 15" stroke={resolvedColor} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
