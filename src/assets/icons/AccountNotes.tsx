import Svg, { Path, Rect } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountNotes({ size = 24, color }: IconProps) {
  const colors = useColors();
  const stroke = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="6" y="4" width="12" height="16" rx="2" stroke={stroke} strokeWidth={1.5} />
      <Path d="M9 9 H15" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M9 12 H15" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M9 15 H13" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

