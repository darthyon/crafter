import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { radius, spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  padding?: number;
}>;

export function Card({ children, style, padding = spacing.lg }: CardProps) {
  const colors = useColors();
  return (
    <View
      style={[
        {
          borderWidth: 1,
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
