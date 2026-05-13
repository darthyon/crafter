import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { radius } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export type ProgressBarProps = {
  value: number;
  max: number;
  style?: StyleProp<ViewStyle>;
};

export function ProgressBar({ value, max, style }: ProgressBarProps) {
  const colors = useColors();
  const safeMax = Math.max(1, max);
  const safeValue = Math.max(0, Math.min(value, safeMax));
  const pct = safeValue / safeMax;

  return (
    <View
      style={[
        {
          height: 4,
          borderRadius: radius.full,
          backgroundColor: colors.border,
          overflow: 'hidden',
        },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: safeMax, now: safeValue }}
    >
      <View style={{ width: `${Math.round(pct * 100)}%`, height: '100%', backgroundColor: colors.textSecondary }} />
    </View>
  );
}

