import type { ComponentProps } from 'react';
import React, { forwardRef } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { TextInput } from 'react-native';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';
import { getTextStyle } from '@/styles/textStyles';

export type TextAreaProps = Omit<ComponentProps<typeof TextInput>, 'style'> & {
  variant?: 'editorBody' | 'body';
  insetHorizontal?: number;
  style?: StyleProp<TextStyle>;
};

export const TextArea = forwardRef<TextInput, TextAreaProps>(function TextArea(
  { variant = 'editorBody', insetHorizontal = spacing.lg, style, ...props }: TextAreaProps,
  ref,
) {
  const colors = useColors();
  const textStyle = variant === 'editorBody' ? getTextStyle('editorBody', colors) : getTextStyle('body', colors);

  return (
    <TextInput
      {...props}
      ref={ref}
      multiline
      placeholderTextColor={colors.textPlaceholder}
      textAlignVertical="top"
      style={[
        textStyle,
        {
          paddingHorizontal: insetHorizontal,
          paddingVertical: spacing.md,
        },
        style,
      ]}
    />
  );
});
