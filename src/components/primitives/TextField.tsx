import type { ComponentProps } from 'react';
import React, { forwardRef } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { TextInput } from 'react-native';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';
import { getTextStyle } from '@/styles/textStyles';

export type TextFieldProps = Omit<ComponentProps<typeof TextInput>, 'style'> & {
  variant?: 'editorTitle' | 'body';
  insetHorizontal?: number;
  style?: StyleProp<TextStyle>;
};

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { variant = 'body', insetHorizontal = spacing.lg, style, ...props }: TextFieldProps,
  ref,
) {
  const colors = useColors();
  const textStyle = variant === 'editorTitle' ? getTextStyle('editorTitle', colors) : getTextStyle('body', colors);

  return (
    <TextInput
      {...props}
      ref={ref}
      placeholderTextColor={colors.textPlaceholder}
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
