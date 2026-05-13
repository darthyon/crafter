import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountCoffee({ size = 24, color }: IconProps) {
  const colors = useColors();
  const stroke = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 8 H14 V14 C14 16 12.5 18 10 18 C7.5 18 6 16 6 14 Z"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M14 9 H16 C17.5 9 18.5 10 18.5 11.5 C18.5 13 17.5 14 16 14 H14"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path d="M6 20 H14" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

