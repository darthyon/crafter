import type { PressableProps, PressableStateCallbackType } from 'react-native';
import { Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { radius, spacing } from '@/styles/tokens';
import { Text } from '@/components/primitives/Text';
import { useColors } from '@/styles/theme';

type SearchFieldProps = Omit<PressableProps, 'style'> & {
  placeholder: string;
  style?: PressableProps['style'];
};

export function SearchField({ placeholder, style, ...props }: SearchFieldProps) {
  const colors = useColors();
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      style={(state: PressableStateCallbackType) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.lg,
          backgroundColor: colors.surfaceRaised,
          opacity: state.pressed ? 0.82 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      hitSlop={props.hitSlop ?? 8}
    >
      <Feather name="search" size={18} color={colors.textTertiary} />
      <View style={{ flex: 1 }}>
        <Text variant="placeholder" numberOfLines={1}>
          {placeholder}
        </Text>
      </View>
    </Pressable>
  );
}
