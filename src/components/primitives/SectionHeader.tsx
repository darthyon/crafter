import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/primitives/Text';

export function SectionHeader({ label, action }: { label: string; action?: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text variant="sectionLabel">{label}</Text>
      {action}
    </View>
  );
}

