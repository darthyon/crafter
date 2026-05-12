import type { PropsWithChildren } from 'react';
import type { PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';
import { spacing } from '@/styles/tokens';

export type DockActionProps = PropsWithChildren<
  PressableProps & {
    style?: StyleProp<ViewStyle>;
  }
>;

export function DockAction({ children, style, ...props }: DockActionProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      hitSlop={props.hitSlop ?? 6}
      style={(state: PressableStateCallbackType) => [
        {
          flex: 1,
          minHeight: 56,
          paddingVertical: spacing.sm,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: props.disabled ? 0.45 : state.pressed ? 0.72 : 1,
        },
        style,
      ]}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: spacing.xs }}>{children}</View>
    </Pressable>
  );
}
