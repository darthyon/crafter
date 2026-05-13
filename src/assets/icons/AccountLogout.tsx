import Svg, { Rect } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountLogout({ size = 24, color }: IconProps) {
  const colors = useColors();
  const ink = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Door */}
      <Rect x={5} y={5} width={2} height={14} fill={ink} />
      <Rect x={7} y={4} width={8} height={2} fill={ink} />
      <Rect x={7} y={18} width={8} height={2} fill={ink} />
      <Rect x={13} y={6} width={2} height={12} fill={ink} />
      {/* Arrow */}
      <Rect x={15} y={11} width={6} height={2} fill={ink} />
      <Rect x={19} y={9} width={2} height={2} fill={ink} />
      <Rect x={19} y={13} width={2} height={2} fill={ink} />
    </Svg>
  );
}
