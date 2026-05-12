export type ThemeName = 'light' | 'dark';

export type ThemeColors = {
  text: string;
  textSecondary: string;
  textTertiary: string;
  textPlaceholder: string;
  attention: string;
  border: string;
  surface: string;
  surfaceRaised: string;
  background: string;
  overlay: string;
};

export type Theme = {
  name: ThemeName;
  colors: ThemeColors;
};

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    // Neutral grays, slightly warm, no true black/white.
    text: '#4E4C47',
    textSecondary: '#6D6860',
    textTertiary: '#736F69',
    textPlaceholder: '#77716B', // AA on light background at 16px
    attention: '#EF4444',
    border: '#E1DDD6',
    surface: '#F7F6F3',
    surfaceRaised: '#FFFEFC',
    background: '#FFFEFC',
    overlay: 'rgba(17, 17, 17, 0.4)',
  },
};

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    // Neutral darks with a warm bias; avoid pure black.
    background: '#12110F',
    surface: '#171613',
    surfaceRaised: '#1D1B18',
    border: '#2B2824',
    text: '#F1EEE9',
    textSecondary: '#C9C3BA',
    textTertiary: '#A39C92',
    textPlaceholder: '#8A8278',
    attention: '#F87171',
    overlay: 'rgba(0, 0, 0, 0.55)',
  },
};
