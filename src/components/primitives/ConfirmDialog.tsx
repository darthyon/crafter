import type { PropsWithChildren } from 'react';
import { Modal, View } from 'react-native';
import { Card } from '@/components/primitives/Card';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export type ConfirmDialogProps = PropsWithChildren<{
  open: boolean;
  onRequestClose: () => void;
}>;

export function ConfirmDialog({ open, onRequestClose, children }: ConfirmDialogProps) {
  const colors = useColors();
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onRequestClose}>
      <View style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: spacing.lg }}>
        <Card padding={spacing.lg}>{children}</Card>
      </View>
    </Modal>
  );
}

