import type { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

export type BottomActionDockProps = PropsWithChildren<{
  leftPadding?: number;
  rightPadding?: number;
  topBorder?: boolean;
  separator?: ReactNode;
}>;

export function BottomActionDock({
  children,
  leftPadding = spacing.lg,
  rightPadding = spacing.lg,
  topBorder = true,
  separator,
}: BottomActionDockProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingLeft: leftPadding,
        paddingRight: rightPadding,
        paddingTop: spacing.sm,
        paddingBottom: Math.max(insets.bottom, spacing.md),
        backgroundColor: colors.background,
        borderTopWidth: topBorder ? 1 : 0,
        borderTopColor: colors.border,
        flexDirection: 'row',
        alignItems: 'stretch',
      }}
    >
      {separator ? (
        <>
          {/* Caller is responsible for placing separators between children */}
          {children}
        </>
      ) : (
        children
      )}
    </View>
  );
}

