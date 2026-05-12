import type { PropsWithChildren } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { IconButton } from '@/components/primitives/IconButton';
import { Text } from '@/components/primitives/Text';
import { radius, spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export type BottomSheetProps = PropsWithChildren<{
  open: boolean;
  onRequestClose: () => void;
  title?: string;
  dismissOnBackdropPress?: boolean;
  showCloseButton?: boolean;
}>;

export function BottomSheet({
  open,
  onRequestClose,
  title,
  dismissOnBackdropPress = true,
  showCloseButton = true,
  children,
}: BottomSheetProps) {
  const colors = useColors();
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onRequestClose}>
      <Pressable
        style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' }}
        onPress={dismissOnBackdropPress ? onRequestClose : undefined}
      >
        <View
          onStartShouldSetResponder={() => true}
          style={{
            backgroundColor: colors.surfaceRaised,
            borderTopLeftRadius: radius.lg,
            borderTopRightRadius: radius.lg,
            paddingTop: spacing.md,
            paddingBottom: spacing.lg,
            paddingHorizontal: spacing.lg,
          }}
        >
          {title || showCloseButton ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: spacing.md,
              }}
            >
              <Text variant="sectionLabel">{(title ?? '').toUpperCase()}</Text>
              {showCloseButton ? (
                <IconButton onPress={onRequestClose} accessibilityLabel="Close sheet">
                  <Feather name="x" size={20} color={colors.text} />
                </IconButton>
              ) : (
                <View style={{ width: 44, height: 44 }} />
              )}
            </View>
          ) : null}
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}
