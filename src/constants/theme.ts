/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

/**
 * HogarFlow palette. Ported from the warm OKLCH design tokens in the prototype
 * (hf-styles.css) to hex, because React Native's native color parser does not
 * understand `oklch()` — only the web target would have rendered them.
 */
export const Colors = {
  light: {
    text: '#36302A',
    background: '#F7F4EF',
    backgroundElement: '#F1EDE6',
    backgroundSelected: '#E6E1DA',
    textSecondary: '#6B6359',
    // HogarFlow tokens
    surface: '#FFFFFF',
    ink: '#36302A',
    inkSoft: '#6B6359',
    inkFaint: '#9A9388',
    line: '#E6E1DA',
    lineSoft: '#EFEBE5',
    accent: '#C46A30',
    accentPress: '#AE5C24',
    accentTint: '#F6E7DA',
    onAccent: '#FFFFFF',
    good: '#3DA86E',
    warn: '#D89A3C',
  },
  dark: {
    text: '#F2ECE4',
    background: '#1A1715',
    backgroundElement: '#221E1B',
    backgroundSelected: '#2E2925',
    textSecondary: '#B8AFA4',
    // HogarFlow tokens
    surface: '#242019',
    ink: '#F2ECE4',
    inkSoft: '#B8AFA4',
    inkFaint: '#87807A',
    line: '#332E29',
    lineSoft: '#2A2622',
    accent: '#C46A30',
    accentPress: '#D27E45',
    accentTint: '#3A2A1E',
    onAccent: '#FFFFFF',
    good: '#3DA86E',
    warn: '#D89A3C',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/** Per-member hues — stable across light/dark (from the prototype `--m-*`). */
export const MemberColors = {
  teal: '#36A9BE',
  coral: '#E58A6A',
  green: '#4DAF7C',
  violet: '#B189D6',
  amber: '#D7A33F',
} as const;

export type MemberColor = keyof typeof MemberColors;

/** Expense category → member hue mapping (from the prototype `CAT_COLOR`). */
export const CategoryColors = {
  Mercado: MemberColors.green,
  Servicios: MemberColors.amber,
  Transporte: MemberColors.teal,
  Salud: MemberColors.violet,
  Otros: MemberColors.coral,
} as const;

/** Corner radii (from the prototype `--r-*`). */
export const Radius = {
  lg: 28,
  md: 20,
  sm: 14,
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
