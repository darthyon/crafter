import type { TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';
import { Text as RNText } from 'react-native';
import { getTextStyle } from '@/styles/textStyles';
import { useColors } from '@/styles/theme';

export type TextVariant =
  | 'brandTitle'
  | 'sectionLabel'
  | 'body'
  | 'bodyMuted'
  | 'action'
  | 'placeholder'
  | 'cardTitle'
  | 'cardSubtitle'
  | 'cardBody'
  | 'editorBody'
  | 'editorTitle';

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
};

export function Text({ variant = 'body', style, ...props }: TextProps) {
  const colors = useColors();
  return <RNText {...props} style={[getTextStyle(variant, colors), style]} />;
}
