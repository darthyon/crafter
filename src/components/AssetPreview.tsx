import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CrafterDefault, CookingRecipe, FarmingCrops } from '@/assets/icons';
import { Idle } from '@/assets/mascot';
import { spacing, colors, fontSizes, fonts } from '@/styles/tokens';

/**
 * Minimal visual QA preview — renders all 3 icons + mascot at target sizes.
 *
 * Remove this component before Phase 3 (Home screen build).
 * This is only for verifying:
 *   - consistency at small sizes (24, 32, 44)
 *   - same visual weight
 *   - no random fills
 *   - clean fallback behavior
 */
export function AssetPreview() {
  const sizes = [24, 32, 44] as const;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Asset Preview</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icons</Text>
        {sizes.map((s) => (
          <View key={s} style={styles.row}>
            <Text style={styles.label}>{s}px</Text>
            <CrafterDefault size={s} />
            <CookingRecipe size={s} />
            <FarmingCrops size={s} />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mascot (idle)</Text>
        {sizes.map((s) => (
          <View key={s} style={styles.row}>
            <Text style={styles.label}>{s}px</Text>
            <Idle size={s} />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fallback icon</Text>
        <View style={styles.row}>
          <Text style={styles.label}>24px</Text>
          <CrafterDefault size={24} />
          <CookingRecipe size={24} />
          <FarmingCrops size={24} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing['2xl'],
    gap: spacing['3xl'],
  },
  title: {
    ...fontSizes.title,
    color: colors.text,
    fontFamily: fonts.uiSemiBold,
  },
  section: { gap: spacing.lg },
  sectionTitle: {
    ...fontSizes.heading,
    color: colors.textSecondary,
    fontFamily: fonts.uiMedium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  label: {
    ...fontSizes.caption,
    color: colors.textTertiary,
    width: 40,
    fontFamily: fonts.ui,
  },
});
