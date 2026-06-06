import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { GlassFab } from '@/components/glass-fab';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import {
  EVENTS,
  FAMILY,
  MEMBERS,
  MONTHLY_BUDGET,
  money,
  SEED_EXPENSES,
  SEED_TASKS,
  type FamilyEvent,
} from '@/constants/family';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function InicioScreen() {
  const theme = useTheme();
  const me = MEMBERS[FAMILY.you];

  const mine = SEED_TASKS.filter((t) => t.who === FAMILY.you);
  const pending = mine.filter((t) => !t.done);
  const spent = SEED_EXPENSES.reduce((sum, e) => sum + e.amount, 0);
  const budgetPct = Math.round((spent / MONTHLY_BUDGET) * 100);

  return (
    <View style={styles.root}>
      <Screen>
        {/* greeting */}
      <View style={styles.greeting}>
        <Avatar who={FAMILY.you} size={52} />
        <View>
          <ThemedText type="title" style={styles.hello}>
            Hola, {me.name}
          </ThemedText>
          <ThemedText type="small" themeColor="inkSoft" style={styles.subtle}>
            Estás en {FAMILY.name} · 4 personas
          </ThemedText>
        </View>
      </View>

      {/* featured: your tasks today */}
      <Link href="/tareas" asChild>
        <Pressable>
          <Card style={[styles.featured, { backgroundColor: theme.accentTint }]}>
            <View style={styles.featuredRow}>
              <View style={[styles.countBubble, { backgroundColor: theme.surface }]}>
                <ThemedText type="subtitle" themeColor="accentPress" style={styles.count}>
                  {pending.length}
                </ThemedText>
              </View>
              <View style={styles.flex1}>
                <ThemedText type="smallBold" style={styles.h2}>
                  {pending.length} pendientes hoy
                </ThemedText>
                <ThemedText type="small" themeColor="inkFaint">
                  Tus tareas en {FAMILY.name}
                </ThemedText>
              </View>
            </View>
            <View style={styles.chipsRow}>
              {mine.slice(0, 3).map((t) => (
                <View key={t.id} style={[styles.taskChip, { backgroundColor: theme.surface, borderColor: theme.lineSoft }]}>
                  <ThemedText
                    type="small"
                    themeColor="inkSoft"
                    style={t.done && styles.strike}>
                    {t.text}
                  </ThemedText>
                </View>
              ))}
            </View>
          </Card>
        </Pressable>
      </Link>

      {/* upcoming events */}
      <View style={styles.sectionHead}>
        <ThemedText type="smallBold" themeColor="inkFaint" style={styles.section}>
          Eventos próximos
        </ThemedText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventsRow}
        style={styles.eventsScroll}>
        {EVENTS.map((ev) => (
          <EventCard key={ev.id} ev={ev} />
        ))}
      </ScrollView>

      {/* expenses summary */}
      <View style={styles.sectionHead}>
        <ThemedText type="smallBold" themeColor="inkFaint" style={styles.section}>
          Gastos del mes
        </ThemedText>
      </View>
      <Link href="/gastos" asChild>
        <Pressable>
          <Card style={styles.expensesCard}>
            <View style={styles.expensesTop}>
              <View>
                <ThemedText type="small" themeColor="inkFaint">
                  Total junio
                </ThemedText>
                <ThemedText type="title" style={styles.total}>
                  {money(spent)}
                </ThemedText>
              </View>
              <View style={[styles.freePill, { backgroundColor: theme.accentTint }]}>
                <ThemedText type="smallBold" themeColor="good">
                  {money(MONTHLY_BUDGET - spent)} libre
                </ThemedText>
              </View>
            </View>
            <ProgressBar pct={spent / MONTHLY_BUDGET} color={theme.accent} track={theme.backgroundElement} />
            <ThemedText type="small" themeColor="inkFaint" style={styles.subtle}>
              {budgetPct}% del presupuesto de {money(MONTHLY_BUDGET)}
            </ThemedText>
          </Card>
        </Pressable>
      </Link>
      </Screen>
      <GlassFab onPress={() => {}} />
    </View>
  );
}

function EventCard({ ev }: { ev: FamilyEvent }) {
  const theme = useTheme();
  return (
    <Card style={styles.eventCard}>
      <View style={styles.eventTop}>
        <View style={[styles.dateBox, { backgroundColor: theme.accentTint }]}>
          <ThemedText type="smallBold" themeColor="accentPress" style={styles.eventDay}>
            {ev.day}
          </ThemedText>
          <ThemedText type="small" themeColor="accentPress" style={styles.eventMon}>
            {ev.mon}
          </ThemedText>
        </View>
        <Avatar who={ev.who} size={30} />
      </View>
      <View>
        <ThemedText type="smallBold" style={styles.eventTitle}>
          {ev.title}
        </ThemedText>
        <ThemedText type="small" themeColor="inkFaint">
          {ev.dow} · {ev.time}
        </ThemedText>
      </View>
    </Card>
  );
}

function ProgressBar({ pct, color, track }: { pct: number; color: string; track: string }) {
  return (
    <View style={[styles.progressTrack, { backgroundColor: track }]}>
      <View style={[styles.progressFill, { width: `${Math.min(pct, 1) * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  hello: {
    fontSize: 28,
    lineHeight: 32,
  },
  subtle: {
    marginTop: Spacing.half,
  },
  flex1: {
    flex: 1,
  },
  h2: {
    fontSize: 18,
  },
  featured: {
    padding: Spacing.three,
    marginBottom: Spacing.four,
  },
  featuredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  countBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 22,
    lineHeight: 28,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  taskChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    borderWidth: 1,
  },
  strike: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  sectionHead: {
    marginBottom: Spacing.two,
  },
  section: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventsScroll: {
    marginHorizontal: -Spacing.three,
    marginBottom: Spacing.four,
  },
  eventsRow: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  eventCard: {
    width: 168,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  eventTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateBox: {
    width: 46,
    height: 50,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDay: {
    fontSize: 20,
    lineHeight: 22,
  },
  eventMon: {
    fontSize: 10,
    letterSpacing: 1,
  },
  eventTitle: {
    fontSize: 16,
  },
  expensesCard: {
    padding: Spacing.three,
  },
  expensesTop: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  total: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: Spacing.half,
  },
  freePill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 999,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: Spacing.three,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
});
