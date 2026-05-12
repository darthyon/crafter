import { useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { getIcon } from '@/assets/icons';
import { Card, IconButton, Text } from '@/components/primitives';
import { usePinnedStore } from '@/stores/pinnedStore';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export default function PinnedScreen() {
  const colors = useColors();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const { entries, isLoading, error, load, openEntry } = usePinnedStore();

  useEffect(() => {
    void load();
  }, [load]);

  const { numColumns, contentWidth, itemWidth, gridGap } = useMemo(() => {
    const maxContentWidth = 520;
    const safeWidth = Math.max(0, screenWidth);
    const nextNumColumns = safeWidth < 360 ? 1 : 2;
    const nextContentWidth = Math.min(safeWidth, maxContentWidth);
    const nextGap = spacing.md;

    const horizontalPadding = spacing.lg;
    const available = nextContentWidth - horizontalPadding * 2 - (nextNumColumns === 2 ? nextGap : 0);
    const nextItemWidth = Math.floor(available / nextNumColumns);

    return {
      numColumns: nextNumColumns,
      contentWidth: nextContentWidth,
      itemWidth: Math.max(0, nextItemWidth),
      gridGap: nextGap,
    };
  }, [screenWidth]);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <View
        style={[
          styles.topBar,
          { width: contentWidth, alignSelf: 'center', paddingHorizontal: spacing.lg },
        ]}
      >
        <View style={styles.topBarLeft}>
          <IconButton
            onPress={() => router.back()}
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
          >
            <Feather name="chevron-left" size={24} color={colors.text} />
          </IconButton>
          <Text variant="brandTitle">Pinned</Text>
        </View>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { width: contentWidth, alignSelf: 'center', paddingHorizontal: spacing.lg },
        ]}
        columnWrapperStyle={numColumns === 2 ? [styles.columnWrapper, { gap: gridGap }] : undefined}
        refreshing={isLoading}
        onRefresh={() => void load()}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            {error ? (
              <Text variant="bodyMuted" style={[styles.errorText, { color: colors.attention }]}>
                {error}
              </Text>
            ) : null}
          </View>
        }
        renderItem={({ item }) => {
          const Icon = getIcon(item.iconId ?? 'crafter-default');
          return (
            <View style={{ width: itemWidth }}>
              <IconButton
                onPress={() => openEntry(router.push, item.id)}
                accessibilityLabel={`Open pinned note: ${item.title}`}
                accessibilityHint="Opens the full note"
                style={styles.cardButton}
              >
                <Card style={styles.card} padding={spacing.lg}>
                  <View style={styles.cardTopRow}>
                    <Icon size={28} color={colors.text} />
                    <View style={styles.cardTopActions}>
                      <Feather name="bookmark" size={16} color={colors.textSecondary} />
                      <Feather name="more-horizontal" size={18} color={colors.textSecondary} />
                    </View>
                  </View>

                  <View style={styles.cardContent}>
                    <Text variant="cardTitle" numberOfLines={2}>
                      {item.title}
                    </Text>
                    {item.subtitle ? (
                      <Text variant="cardSubtitle" numberOfLines={1}>
                        {item.subtitle}
                      </Text>
                    ) : null}
                    <Text variant="cardBody" numberOfLines={8} style={styles.cardBody}>
                      {item.body}
                    </Text>
                  </View>
                </Card>
              </IconButton>
            </View>
          );
        }}
        ListEmptyComponent={
          !isLoading && !error ? (
            <View style={styles.emptyState}>
              <Text variant="brandTitle">No pinned notes</Text>
              <Text variant="bodyMuted" style={{ marginTop: spacing.sm }}>
                Pin important notes to keep them here.
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  listContent: {
    paddingBottom: spacing['4xl'],
    gap: spacing.md,
  },
  listHeader: {
    paddingBottom: spacing.md,
  },
  errorText: {
    marginTop: spacing.sm,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardButton: {
    width: '100%',
    alignItems: 'stretch',
  },
  card: {
    width: '100%',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTopActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cardContent: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  cardBody: {
    marginTop: spacing.sm,
  },
  emptyState: {
    paddingTop: spacing['3xl'],
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
});
