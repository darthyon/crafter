import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Card } from '@/components/primitives/Card';
import { Text } from '@/components/primitives/Text';
import { spacing } from '@/styles/tokens';

export type StatCardProps = {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  style?: StyleProp<ViewStyle>;
};

export function StatCard({ icon, value, label, style }: StatCardProps) {
  return (
    <Card style={[{ alignItems: 'center' }, style]} padding={spacing.lg}>
      <View style={{ paddingBottom: spacing.md }}>{icon}</View>
      <Text variant="statNumber">{value}</Text>
      <Text variant="statLabel" style={{ textAlign: 'center' }}>
        {label}
      </Text>
    </Card>
  );
}

