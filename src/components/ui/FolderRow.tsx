import { Image, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getIcon } from '@/assets/icons';
import { Card, IconButton, Text } from '@/components/primitives';
import type { FolderSummary } from '@/lib/folders';
import { spacing, radius } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export function FolderRow({
  summary,
  onPress,
  onPressMenu,
}: {
  summary: FolderSummary;
  onPress: () => void;
  onPressMenu?: () => void;
}) {
  const colors = useColors();
  const folder = summary.folder;
  const Icon = getIcon(folder.iconId ?? 'crafter-default');

  return (
    <IconButton onPress={onPress} accessibilityLabel={`Open folder: ${folder.name}`} style={styles.rowButton}>
      <Card style={styles.card} padding={spacing.lg}>
        <View style={styles.row}>
          <View style={styles.thumbWrap}>
            {folder.imageUri ? (
              <Image source={{ uri: folder.imageUri }} style={styles.thumb} />
            ) : (
              <View style={[styles.thumbFallback, { backgroundColor: colors.surface }]}>
                <Icon size={22} color={colors.text} />
              </View>
            )}
          </View>

          <View style={styles.textCol}>
            <Text variant="cardTitle" numberOfLines={1}>
              {folder.name}
            </Text>
            <Text variant="cardSubtitle" numberOfLines={1}>
              {summary.entryCount} entries
            </Text>
          </View>

          <IconButton
            onPress={onPressMenu ?? (() => {})}
            accessibilityLabel={`Folder actions for ${folder.name}`}
            accessibilityHint="Shows actions like rename or delete"
          >
            <Feather name="more-vertical" size={18} color={colors.textSecondary} />
          </IconButton>
        </View>
      </Card>
    </IconButton>
  );
}

const styles = StyleSheet.create({
  rowButton: {
    width: '100%',
    alignItems: 'stretch',
  },
  card: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  thumbWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  thumbFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
});

