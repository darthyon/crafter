import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountLogout({ size = 24, color }: IconProps) {
  const colors = useColors();
  const stroke = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 4 H12 C13 4 14 5 14 6 V18 C14 19 13 20 12 20 H5 Z"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path d="M14 12 H20" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M18 10 L20 12 L18 14" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

