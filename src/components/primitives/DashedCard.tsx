import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { radius, spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export type DashedCardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  padding?: number;
}>;

export function DashedCard({ children, style, padding = spacing.lg }: DashedCardProps) {
  const colors = useColors();
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.border,
          borderRadius: radius.lg,
          backgroundColor: colors.surfaceRaised,
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

