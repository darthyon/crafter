import Svg, { Rect } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountCoffee({ size = 24, color }: IconProps) {
  const colors = useColors();
  const ink = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Cup body */}
      <Rect x={7} y={8} width={9} height={2} fill={ink} />
      <Rect x={6} y={10} width={2} height={7} fill={ink} />
      <Rect x={14} y={10} width={2} height={7} fill={ink} />
      <Rect x={7} y={17} width={9} height={2} fill={ink} />
      {/* Handle */}
      <Rect x={16} y={11} width={2} height={5} fill={ink} />
      <Rect x={18} y={12} width={1} height={3} fill={ink} />
      {/* Saucer */}
      <Rect x={6} y={20} width={12} height={1} fill={ink} />
    </Svg>
  );
}
