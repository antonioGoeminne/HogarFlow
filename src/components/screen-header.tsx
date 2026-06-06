import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type ScreenHeaderProps = {
  title: string;
  sub?: string;
};

/** Large screen title + optional subtitle (the prototype `ScreenHeader`). */
export function ScreenHeader({ title, sub }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      {sub ? (
        <ThemedText type="small" themeColor="inkSoft" style={styles.sub}>
          {sub}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
  },
  title: {
    fontSize: 30,
    lineHeight: 34,
  },
  sub: {
    marginTop: Spacing.one,
  },
});
