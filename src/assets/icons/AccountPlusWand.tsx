import Svg, { Rect } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountPlusWand({ size = 24, color }: IconProps) {
  const colors = useColors();
  const ink = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Sparkles */}
      <Rect x={6} y={6} width={1} height={1} fill={ink} />
      <Rect x={7} y={5} width={1} height={3} fill={ink} />
      <Rect x={5} y={7} width={3} height={1} fill={ink} />

      <Rect x={16} y={4} width={1} height={1} fill={ink} />
      <Rect x={17} y={3} width={1} height={3} fill={ink} />
      <Rect x={15} y={5} width={3} height={1} fill={ink} />

      {/* Wand diagonal (chunky pixel) */}
      <Rect x={7} y={17} width={2} height={2} fill={ink} />
      <Rect x={9} y={15} width={2} height={2} fill={ink} />
      <Rect x={11} y={13} width={2} height={2} fill={ink} />
      <Rect x={13} y={11} width={2} height={2} fill={ink} />
      <Rect x={15} y={9} width={2} height={2} fill={ink} />
    </Svg>
  );
}
