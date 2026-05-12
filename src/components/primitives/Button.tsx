import type { PropsWithChildren } from 'react';
import type { PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';
import { radius, spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = PropsWithChildren<
  PressableProps & {
    variant?: ButtonVariant;
    style?: StyleProp<ViewStyle>;
  }
>;

export function Button({ children, variant = 'primary', style, ...props }: ButtonProps) {
  const colors = useColors();
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      hitSlop={props.hitSlop ?? 8}
      style={(state: PressableStateCallbackType) => [
        {
          minHeight: 44,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.lg,
          backgroundColor: isPrimary ? colors.surface : 'transparent',
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

