import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Card, Divider, IconButton, Text } from '@/components/primitives';
import { EntryRow } from '@/components/ui/EntryRow';
import { FolderRow } from '@/components/ui/FolderRow';
import { useFoldersStore } from '@/stores/foldersStore';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export default function FoldersScreen() {
  const colors = useColors();
  const router = useRouter();
  const {
    isLoading,
    error,
    foldersPreview,
    hasMoreFolders,
    recentPreview,
    hasMoreRecents,
    load,
    openFolder,
    openAllFolders,
    openAllRecents,
    openEntry,
  } = useFoldersStore();

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
          <Text variant="brandTitle">Folders</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {error ? (
          <Text variant="bodyMuted" style={{ color: colors.attention }}>
            {error}
          </Text>
        ) : null}

        <View style={styles.folderList}>
          {foldersPreview.map((summary) => (
            <FolderRow
              key={summary.folder.id}
              summary={summary}
              onPress={() => openFolder(router.push, summary.folder.id)}
            />
          ))}

          {hasMoreFolders ? (
            <IconButton
              onPress={() => openAllFolders(router.push)}
              accessibilityLabel="View all folders"
              accessibilityHint="Shows the full folder list"
              style={styles.viewAllButton}
            >
              <Card>
                <View style={styles.viewAllRow}>
                  <View style={styles.viewAllLeft}>
                    <Feather name="folder" size={18} color={colors.textSecondary} />
                    <Text>View all</Text>
                  </View>
                  <Feather name="chevron-right" size={20} color={colors.textSecondary} />
                </View>
              </Card>
            </IconButton>
          ) : null}
        </View>

        <View style={styles.recentsSection}>
          <Text variant="sectionLabel">RECENT ENTRIES</Text>

          <View style={styles.recentsList}>
            {recentPreview.map((item, idx) => (
              <EntryRow
                key={item.entry.id}
                item={item}
                onPress={() => openEntry(router.push, item.entry.id)}
                showDivider={idx !== recentPreview.length - 1}
              />
            ))}
          </View>

          {hasMoreRecents ? (
            <IconButton
              onPress={() => openAllRecents(router.push)}
              accessibilityLabel="View all recent entries"
              accessibilityHint="Shows the full recent entries list"
              style={styles.viewAllButton}
            >
              <Card>
                <View style={styles.viewAllRow}>
                  <View style={styles.viewAllLeft}>
                    <Feather name="clock" size={18} color={colors.textSecondary} />
                    <Text>View all recent entries</Text>
                  </View>
                  <Feather name="chevron-right" size={20} color={colors.textSecondary} />
                </View>
              </Card>
            </IconButton>
          ) : null}
        </View>

        {isLoading ? (
          <View style={{ paddingTop: spacing.lg }}>
            <Divider />
          </View>
        ) : null}
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
  folderList: {
    gap: spacing.md,
  },
  viewAllButton: {
    width: '100%',
    alignItems: 'stretch',
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAllLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  recentsSection: {
    gap: spacing.md,
  },
  recentsList: {
    gap: 0,
  },
});
