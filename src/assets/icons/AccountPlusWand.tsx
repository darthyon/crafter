import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountPlusWand({ size = 24, color }: IconProps) {
  const colors = useColors();
  const stroke = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 18 L18 6" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M15.5 5.5 L18.5 8.5" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M7 7 L8 9" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M5 10 L7 11" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M10 5 L11 7" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

