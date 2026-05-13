import Svg, { Rect } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountPinned({ size = 24, color }: IconProps) {
  const colors = useColors();
  const ink = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Head */}
      <Rect x={9} y={5} width={6} height={2} fill={ink} />
      {/* Neck */}
      <Rect x={10} y={7} width={4} height={2} fill={ink} />
      {/* Arms */}
      <Rect x={8} y={9} width={8} height={2} fill={ink} />
      {/* Point */}
      <Rect x={11} y={11} width={2} height={8} fill={ink} />
      <Rect x={10} y={19} width={4} height={1} fill={ink} />
    </Svg>
  );
}
