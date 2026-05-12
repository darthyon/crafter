import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/primitives';
import { useColors } from '@/styles/theme';

export default function AccountScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="brandTitle">Account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
