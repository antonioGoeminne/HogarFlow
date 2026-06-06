import { Platform, ScrollView, StyleSheet, View, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Scrollable screen shell: warm background, centered max-width column, and
 * bottom padding that clears the tab bar. Mirrors the prototype `.hf-scroll`.
 */
export function Screen({ children, contentContainerStyle, ...rest }: ScrollViewProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const platformPadding = Platform.select({
    web: { paddingTop: Spacing.five },
    default: { paddingTop: insets.top + Spacing.two },
  });

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      {...rest}>
      <View
        style={[
          styles.column,
          platformPadding,
          { paddingBottom: insets.bottom + BottomTabInset + Spacing.four },
        ]}>
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    flexGrow: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
  },
});
