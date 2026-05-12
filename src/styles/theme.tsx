import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import type { Theme } from '@/styles/themes';
import { darkTheme, lightTheme } from '@/styles/themes';

const ThemeContext = createContext<Theme>(lightTheme);

export function ThemeProvider({ children }: PropsWithChildren) {
  const scheme = useColorScheme();
  const theme = useMemo(() => (scheme === 'dark' ? darkTheme : lightTheme), [scheme]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useColors() {
  return useTheme().colors;
}

