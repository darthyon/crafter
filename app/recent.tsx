import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { IconButton, Text } from '@/components/primitives';
import { EntryRow } from '@/components/ui/EntryRow';
import { useRecentStore } from '@/stores/recentStore';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export default function RecentScreen() {
  const colors = useColors();
  const router = useRouter();
  const { isLoading, error, entries, load, openEntry } = useRecentStore();

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <IconButton
            onPress={() => router.back()}
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
          >
            <Feather name="chevron-left" size={24} color={colors.text} />
          </IconButton>
          <Text variant="brandTitle">Recent</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {error ? (
          <Text variant="bodyMuted" style={{ color: colors.attention }}>
            {error}
          </Text>
        ) : null}

        <View style={styles.list}>
          {entries.map((item, idx) => (
            <EntryRow
              key={item.entry.id}
              item={item}
              onPress={() => openEntry(router.push, item.entry.id)}
              showDivider={idx !== entries.length - 1}
            />
          ))}
        </View>

        {isLoading ? <Text variant="bodyMuted">Loading…</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
    gap: spacing.lg,
  },
  list: {
    gap: 0,
  },
});
