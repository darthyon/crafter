import type { PropsWithChildren } from 'react';
import type { PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from '@/components/primitives/Text';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export type RadioRowProps = PropsWithChildren<
  PressableProps & {
    selected?: boolean;
    style?: StyleProp<ViewStyle>;
    label: string;
    description?: string;
  }
>;

export function RadioRow({ selected = false, label, description, style, ...props }: RadioRowProps) {
  const colors = useColors();
  return (
    <Pressable
      {...props}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      hitSlop={props.hitSlop ?? 8}
      style={(state: PressableStateCallbackType) => [
        {
          minHeight: 44,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: spacing.sm,
          opacity: props.disabled ? 0.45 : state.pressed ? 0.78 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <View style={{ flex: 1, paddingRight: spacing.md }}>
        <Text>{label}</Text>
        {description ? <Text variant="bodyMuted">{description}</Text> : null}
      </View>
      <Feather
        name={selected ? 'check-circle' : 'circle'}
        size={18}
        color={selected ? colors.textSecondary : colors.border}
      />
    </Pressable>
  );
}

