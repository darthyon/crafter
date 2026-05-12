import type { ReactNode } from 'react';
import { View } from 'react-native';
import { spacing } from '@/styles/tokens';

export type ScreenHeaderProps = {
  left?: ReactNode;
  right?: ReactNode;
};

export function ScreenHeader({ left, right }: ScreenHeaderProps) {
  return (
    <View
      style={{
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ minWidth: 44, minHeight: 44, alignItems: 'flex-start', justifyContent: 'center' }}>
        {left}
      </View>
      <View style={{ minWidth: 44, minHeight: 44, alignItems: 'flex-end', justifyContent: 'center' }}>
        {right}
      </View>
    </View>
  );
}

