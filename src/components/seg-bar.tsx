import { Pressable, StyleSheet, View } from 'react-native';

import type { SegBarProps } from '@/components/seg-bar.types';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type { SegBarProps, SegOption } from '@/components/seg-bar.types';

/**
 * Pill segmented control (the prototype `SegBar`). Default + web fallback.
 * Native variants live in `seg-bar.ios.tsx` (SwiftUI) and `seg-bar.android.tsx`
 * (Jetpack Compose) — Metro resolves those on each platform automatically.
 */
export function SegBar({ value, onChange, options }: SegBarProps) {
  const theme = useTheme();
  return (
    <View style={[styles.bar, { backgroundColor: theme.backgroundElement, borderColor: theme.lineSoft }]}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <Pressable
            key={o.id}
            onPress={() => onChange(o.id)}
            style={[styles.segment, active && { backgroundColor: theme.surface }]}>
            <ThemedText type="smallBold" themeColor={active ? 'ink' : 'inkFaint'}>
              {o.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    gap: Spacing.one,
    padding: Spacing.one,
    borderRadius: 999,
    borderWidth: 1,
  },
  segment: {
    flex: 1,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
