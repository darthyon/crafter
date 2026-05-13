import { useEffect, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { TopBar } from '@/components/layout/TopBar';
import { IdleAnimated } from '@/assets/mascot/IdleAnimated';
import { getIcon } from '@/assets/icons';
import { Card, Divider, IconButton, PressableRow, SearchField, SectionHeader, Text } from '@/components/primitives';
import { fonts, spacing } from '@/styles/tokens';
import { useHomeStore } from '@/stores/homeStore';
import { useColors } from '@/styles/theme';

/**
 * Home screen — the active play surface.
 *
 * Layout (top to bottom):
 *   - TopBar (brand + avatar)
 *   - Folders entry row
 *   - Search entry bar
 *   - Quick Note (static UI — wired in Phase 4)
 *   - Pinned Notes (static cards — wired in Phase 5)
 *
 * Rules from docs/system.md:
 *   - Home must stay session-oriented
 *   - No recent entries, no folder lists, no dashboards
 *   - Quick Note occupies roughly ¼ of the screen
 *   - Pinned shows 2 full cards + half of a 3rd
 */
export default function HomeScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const colors = useColors();

  const {
    isLoading,
    error,
    quickNoteDraft,
    pinnedEntries,
    load,
    setDraft,
    saveDraft,
    openDraftEditor,
    openFolders,
    openSearch,
    openPinned,
  } = useHomeStore();

  useEffect(() => {
    void load();
  }, [load]);

  const pinnedCardWidth = useMemo(() => {
    return Math.min(184, Math.max(164, Math.floor((screenWidth - spacing.lg * 2) * 0.54)));
  }, [screenWidth]);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <TopBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Folders entry ── */}
        <PressableRow
          onPress={() => openFolders(router.push)}
          accessibilityLabel="Open folders"
          accessibilityHint="Browse your worlds and recent entries"
          left={
            <>
              <Feather name="folder" size={18} color={colors.textSecondary} />
              <Text>Folders</Text>
            </>
          }
          right={<Feather name="chevron-right" size={20} color={colors.textSecondary} />}
        />

        {/* ── Search entry ── */}
        <SearchField
          onPress={() => openSearch(router.push)}
          placeholder="Search notes, recipes, materials…"
          accessibilityLabel="Search notes"
          accessibilityHint="Opens full-screen search"
        />

        {/* ── Quick Note ── */}
        <View style={styles.quickNoteSection}>
          <View style={styles.quickNoteHeaderRow}>
            <View style={styles.quickNoteHeaderLeft}>
              <Text variant="sectionLabel">QUICK NOTE</Text>
              {quickNoteDraft.isDirty ? (
                <View style={[styles.unsavedDot, { backgroundColor: colors.attention }]} />
              ) : null}
              {quickNoteDraft.isDirty ? <Text variant="action">Unsaved</Text> : null}
            </View>

            <View style={styles.quickNoteActions}>
              <IconButton
                onPress={() => void saveDraft()}
                disabled={!quickNoteDraft.isDirty || isLoading}
                accessibilityLabel="Save quick note"
                accessibilityHint="Saves the draft as an entry"
                style={styles.actionButton}
              >
                <Text variant="action">Save</Text>
              </IconButton>

              <Divider style={styles.actionDivider} />

              <IconButton
                onPress={() => openDraftEditor(router.push)}
                accessibilityLabel="Expand quick note"
                accessibilityHint="Opens the full editor with this draft"
                style={styles.actionButton}
              >
                <Feather name="maximize-2" size={16} color={colors.textSecondary} />
                <Text variant="action">Expand</Text>
              </IconButton>
            </View>
          </View>

          <Card style={styles.quickNoteSurface} padding={spacing.lg}>
            <TextInput
              value={quickNoteDraft.body}
              onChangeText={setDraft}
              multiline
              placeholder="Gather ideas. Jot it down. Craft it later."
              placeholderTextColor={colors.textPlaceholder}
              style={[styles.quickNoteInput, { color: colors.text }]}
              accessibilityLabel="Quick note"
            />
            <View style={styles.quickNoteMascot}>
              <IdleAnimated size={28} color={colors.textTertiary} />
            </View>
          </Card>
        </View>

        {/* ── Pinned Section ── */}
        <View style={styles.pinnedSection}>
          <SectionHeader
            label="PINNED"
            action={
              <IconButton
                onPress={() => router.push('/pinned')}
                accessibilityLabel="View all pinned notes"
                style={styles.viewAllButton}
              >
                <Feather name="grid" size={16} color={colors.textSecondary} />
                <Text variant="action">View all</Text>
              </IconButton>
            }
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pinnedList}
          >
            {pinnedEntries.map((item) => {
              const Icon = getIcon(item.iconId ?? 'crafter-default');
              return (
                <View key={item.id} style={{ width: pinnedCardWidth }}>
                  <IconButton
                    onPress={() => openPinned(router.push, item.id)}
                    accessibilityLabel={`Open pinned note: ${item.title}`}
                    accessibilityHint="Opens the full note"
                    style={styles.pinnedCardButton}
                  >
                    <Card style={styles.pinnedCard} padding={spacing.lg}>
                      <View style={styles.pinnedCardTopRow}>
                        <Icon size={28} color={colors.text} />
                        <View style={styles.pinnedCardTopActions}>
                          <Feather name="bookmark" size={16} color={colors.textSecondary} />
                          <Feather name="more-horizontal" size={18} color={colors.textSecondary} />
                        </View>
                      </View>

                      <View style={styles.pinnedCardContent}>
                        <Text variant="cardTitle" numberOfLines={2}>
                          {item.title}
                        </Text>
                        {item.subtitle ? (
                          <Text variant="cardSubtitle" numberOfLines={1}>
                            {item.subtitle}
                          </Text>
                        ) : null}
                        <Text variant="cardBody" numberOfLines={7} style={styles.pinnedCardBody}>
                          {item.body}
                        </Text>
                      </View>
                    </Card>
                  </IconButton>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {error ? (
          <Text variant="bodyMuted" style={[styles.errorText, { color: colors.attention }]}>
            {error}
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
    gap: spacing.lg,
  },

  /* ── Quick Note ── */
  quickNoteSection: {
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  quickNoteHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  quickNoteHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  unsavedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  quickNoteActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  actionDivider: {
    width: 1,
    height: 18,
    alignSelf: 'center',
  },
  quickNoteSurface: {
    position: 'relative',
    minHeight: 220,
  },
  quickNoteInput: {
    flex: 1,
    fontFamily: fonts.ui,
    fontSize: 16,
    lineHeight: 24,
    padding: 0,
    textAlignVertical: 'top',
  },
  quickNoteMascot: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    opacity: 0.9,
  },

  /* ── Pinned Section ── */
  pinnedSection: {
    gap: spacing.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 44,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
  },
  pinnedList: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  pinnedCardButton: {
    width: '100%',
    alignItems: 'stretch',
  },
  pinnedCard: {
    minHeight: 280,
    gap: spacing.lg,
  },
  pinnedCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinnedCardTopActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pinnedCardContent: {
    flex: 1,
    gap: spacing.sm,
  },
  pinnedCardBody: {
    marginTop: spacing.sm,
  },
  errorText: {
    marginTop: spacing.sm,
  },
});
