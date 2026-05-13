import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountPinned({ size = 24, color }: IconProps) {
  const colors = useColors();
  const stroke = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 4 H15 L14 9 L18 12 H6 L10 9 Z"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path d="M12 12 V20" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

