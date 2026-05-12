import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { useColors } from '@/styles/theme';

export function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  const colors = useColors();
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: colors.border,
        },
        style,
      ]}
    />
  );
}
