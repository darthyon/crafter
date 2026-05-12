import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconButton, Text } from '@/components/primitives';
import { EntryRow } from '@/components/ui/EntryRow';
import { useFolderDetailStore } from '@/stores/folderDetailStore';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export default function FolderDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const folderId = params.id;

  const { isLoading, error, folder, entries, load, openEntry } = useFolderDetailStore();

  useEffect(() => {
    if (!folderId) return;
    void load(folderId);
  }, [folderId, load]);

  const title = folder?.folder.name ?? 'Folder';

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
          <Text variant="brandTitle" numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {error ? (
          <Text variant="bodyMuted" style={{ color: colors.attention }}>
            {error}
          </Text>
        ) : null}

        <View style={styles.list}>
          {entries.map((entry, idx) => (
            <EntryRow
              key={entry.id}
              item={{ entry, folder: folder?.folder }}
              onPress={() => openEntry(router.push, entry.id)}
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
