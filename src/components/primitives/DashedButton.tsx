import type { PropsWithChildren } from 'react';
import type { PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';
import { radius, spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export type DashedButtonProps = PropsWithChildren<
  PressableProps & {
    style?: StyleProp<ViewStyle>;
  }
>;

export function DashedButton({ children, style, ...props }: DashedButtonProps) {
  const colors = useColors();
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      hitSlop={props.hitSlop ?? 8}
      style={(state: PressableStateCallbackType) => [
        {
          minHeight: 44,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.border,
          borderRadius: radius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: props.disabled ? 0.45 : state.pressed ? 0.78 : 1,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>{children}</View>
    </Pressable>
  );
}

