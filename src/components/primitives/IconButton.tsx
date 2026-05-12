import type { PropsWithChildren } from 'react';
import type { PressableProps, PressableStateCallbackType } from 'react-native';
import { Pressable } from 'react-native';

type IconButtonProps = PropsWithChildren<
  PressableProps & {
    style?: PressableProps['style'];
    accessibilityLabel?: string;
    accessibilityHint?: string;
  }
>;

export function IconButton({
  style,
  accessibilityLabel,
  accessibilityHint,
  children,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={(state: PressableStateCallbackType) => [
        {
          minWidth: 44,
          minHeight: 44,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: props.disabled ? 0.45 : state.pressed ? 0.72 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      hitSlop={props.hitSlop ?? 8}
    >
      {children}
    </Pressable>
  );
}
