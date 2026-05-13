import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountFolders({ size = 24, color }: IconProps) {
  const colors = useColors();
  const stroke = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7 C4 6 5 5 6 5 H10 L12 7 H18 C19 7 20 8 20 9 V18 C20 19 19 20 18 20 H6 C5 20 4 19 4 18 Z"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path d="M4 10 H20" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

