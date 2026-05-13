import Svg, { Rect } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

export function AccountFolders({ size = 24, color }: IconProps) {
  const colors = useColors();
  const ink = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Tab */}
      <Rect x={5} y={6} width={6} height={2} fill={ink} />
      <Rect x={4} y={8} width={16} height={2} fill={ink} />
      {/* Body */}
      <Rect x={4} y={10} width={2} height={9} fill={ink} />
      <Rect x={18} y={10} width={2} height={9} fill={ink} />
      <Rect x={4} y={19} width={16} height={2} fill={ink} />
    </Svg>
  );
}
