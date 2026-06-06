import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type GlassFabProps = {
  onPress?: () => void;
};

/**
 * Floating "+" action button (the prototype's FAB). Renders Apple's Liquid
 * Glass via `GlassView` on iOS 26+ dev builds, and falls back to a solid
 * terracotta button everywhere else (older iOS, Android, web, Expo Go).
 */
export function GlassFab({ onPress }: GlassFabProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const glass = isLiquidGlassAvailable();

  return (
    <GlassView
      glassEffectStyle="regular"
      tintColor={theme.accent}
      isInteractive
      style={[
        styles.fab,
        { bottom: insets.bottom + BottomTabInset + Spacing.three, right: Spacing.four },
        // No real glass → make sure the button still reads as a solid accent FAB.
        !glass && { backgroundColor: theme.accent },
      ]}>
      <Pressable onPress={onPress} hitSlop={8} style={styles.press}>
        <Text style={styles.plus}>+</Text>
      </Pressable>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  press: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '300',
  },
});
