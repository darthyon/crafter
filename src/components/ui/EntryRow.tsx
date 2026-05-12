import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getIcon } from '@/assets/icons';
import { Divider, IconButton, Text } from '@/components/primitives';
import type { RecentEntry } from '@/lib/folders';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export function EntryRow({
  item,
  onPress,
  showDivider,
}: {
  item: RecentEntry;
  onPress: () => void;
  showDivider?: boolean;
}) {
  const colors = useColors();
  const entry = item.entry;
  const Icon = getIcon(entry.iconId ?? 'crafter-default');

  const leftLabel = entry.subtitle ?? item.folder?.name ?? '';
  const timeLabel = formatRelativeTime(entry.updatedAt);
  const subtitle = leftLabel && timeLabel ? `${leftLabel}  •  ${timeLabel}` : leftLabel || timeLabel;

  return (
    <View>
      <IconButton
        onPress={onPress}
        accessibilityLabel={`Open entry: ${entry.title}`}
        accessibilityHint="Opens the full note"
        style={styles.rowButton}
      >
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <Icon size={26} color={colors.text} />
          </View>

          <View style={styles.textCol}>
            <Text variant="cardTitle" numberOfLines={1}>
              {entry.title}
            </Text>
            <Text variant="cardSubtitle" numberOfLines={1}>
              {subtitle}
            </Text>
          </View>

          <IconButton
            onPress={() => {}}
            accessibilityLabel={`Entry actions for ${entry.title}`}
            accessibilityHint="Shows actions for this entry"
          >
            <Feather name="more-vertical" size={18} color={colors.textSecondary} />
          </IconButton>
        </View>
      </IconButton>

      {showDivider ? <Divider style={{ marginLeft: 48 }} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  rowButton: {
    width: '100%',
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  iconWrap: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
});

