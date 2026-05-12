import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Idle } from '@/assets/mascot';
import { IconButton, Text } from '@/components/primitives';
import { spacing, fonts } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

/**
 * Top navigation bar for Home screen.
 *
 * Layout:
 *   Left: mascot mark + "Crafter" title (display font)
 *   Right: avatar icon
 *
 * In the Home mock, search is a full-width bar below TopBar,
 * so TopBar only includes the account/avatar affordance.
 */
export function TopBar() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colors = useColors();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.sm, backgroundColor: colors.background },
      ]}
    >
      <View style={styles.left}>
        <Idle size={28} color={colors.text} />
        <Text variant="brandTitle" style={styles.title}>
          Crafter
        </Text>
      </View>

      <IconButton
        onPress={() => router.push('/account')}
        style={[styles.avatar, { backgroundColor: colors.surface }]}
        accessibilityRole="button"
        accessibilityLabel="Open account"
        accessibilityHint="View your profile and settings"
      >
        <Text style={[styles.avatarText, { color: colors.text }]}>Y</Text>
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    // Slightly tighter than the default display role to match the mock.
    lineHeight: 36,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: fonts.uiMedium,
    fontSize: 16,
  },
});
