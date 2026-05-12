import type { ReactNode } from 'react';
import type { PressableProps, PressableStateCallbackType } from 'react-native';
import { Pressable, View } from 'react-native';
import { spacing } from '@/styles/tokens';

type PressableRowProps = PressableProps & {
  left?: ReactNode;
  right?: ReactNode;
  style?: PressableProps['style'];
};

export function PressableRow({ left, right, style, ...props }: PressableRowProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      hitSlop={props.hitSlop ?? 8}
      style={(state: PressableStateCallbackType) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: spacing.sm,
          opacity: state.pressed ? 0.78 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        {left}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>{right}</View>
    </Pressable>
  );
}
