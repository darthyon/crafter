import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountWords({ size = 24, color }: IconProps) {
  const colors = useColors();
  const stroke = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 19 L9 15 L18 6 C19 5 20.5 6.5 19.5 7.5 L10.5 16.5 L6 19 Z"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path d="M8.5 15.5 L10 17" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M14 7.5 L16.5 10" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

