import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SegBar } from '@/components/seg-bar';
import { ThemedText } from '@/components/themed-text';
import { useExpenses, useMembers, useFamily } from '@/api';
import { useUIStore, type ExpensesTab } from '@/stores/ui-store';
import { CategoryColors, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { money } from '@/lib/format/money';
import type { Expense, Member } from '@/lib/domain';

export default function GastosScreen() {
  const theme = useTheme();
  const { expensesTab, setExpensesTab } = useUIStore();
  const { expenses, summary } = useExpenses();
  const { byId } = useMembers();
  const { family } = useFamily();

  const { total, perPerson, yourBalance: youBalance, owed } = summary;

  return (
    <Screen>
      <ScreenHeader title="Gastos" sub={`${family.name} · Junio 2026`} />

      {/* total + split */}
      <Card style={styles.totalCard}>
        <View style={styles.totalHead}>
          <ThemedText type="small" themeColor="inkFaint">
            Total junio
          </ThemedText>
          <ThemedText type="title" style={styles.totalAmount}>
            {money(total)}
          </ThemedText>
        </View>
        <View style={[styles.splitBar, { backgroundColor: theme.backgroundElement }]}>
          {perPerson.map((p) => (
            <View key={p.who} style={{ flex: p.value, backgroundColor: p.color }} />
          ))}
        </View>
        <View style={styles.legend}>
          {perPerson.map((p) => (
            <View key={p.who} style={styles.legendRow}>
              <View style={[styles.dot, { backgroundColor: p.color }]} />
              <ThemedText type="small" style={styles.legendName}>
                {byId[p.who]?.name ?? ''}
              </ThemedText>
              <ThemedText type="smallBold">{money(p.value)}</ThemedText>
            </View>
          ))}
        </View>
      </Card>

      {/* balance / settle */}
      <Card style={[styles.balanceCard, owed && { backgroundColor: theme.accentTint }]}>
        <View style={styles.flex1}>
          <ThemedText type="small" themeColor="inkFaint">
            Tu balance
          </ThemedText>
          <ThemedText type="smallBold" style={styles.balanceText}>
            {owed ? 'Te deben ' : 'Debes '}
            <ThemedText type="smallBold" themeColor={owed ? 'good' : 'accentPress'}>
              {money(Math.abs(youBalance))}
            </ThemedText>
          </ThemedText>
        </View>
        <Pressable style={[styles.settleBtn, { backgroundColor: theme.ink }]}>
          <ThemedText type="smallBold" themeColor="background">
            Saldar
          </ThemedText>
        </Pressable>
      </Card>

      <View style={styles.seg}>
        <SegBar
          value={expensesTab}
          onChange={(v) => setExpensesTab(v as ExpensesTab)}
          options={[
            { id: 'movimientos', label: 'Movimientos' },
            { id: 'categorias', label: 'Categorías' },
          ]}
        />
      </View>

      {expensesTab === 'movimientos' ? (
        <Card style={styles.listCard}>
          {expenses.map((g, i) => (
            <View key={g.id} style={i > 0 && { borderTopColor: theme.lineSoft, borderTopWidth: 1 }}>
              <ExpenseRow expense={g} member={byId[g.who]} />
            </View>
          ))}
        </Card>
      ) : (
        <CategoryList expenses={expenses} total={summary.total} />
      )}
    </Screen>
  );
}

function ExpenseRow({ expense, member }: { expense: Expense; member: Member | undefined }) {
  const color = CategoryColors[expense.cat];
  return (
    <View style={styles.expenseRow}>
      <View style={[styles.catDot, { backgroundColor: color }]} />
      <View style={styles.flex1}>
        <ThemedText type="smallBold">{expense.title}</ThemedText>
        <View style={styles.expenseMeta}>
          <Avatar name={member?.name ?? ''} color={member?.color ?? ''} size={16} />
          <ThemedText type="small" themeColor="inkFaint">
            {member?.name ?? ''} · {expense.when}
          </ThemedText>
        </View>
      </View>
      <View style={styles.expenseAmount}>
        <ThemedText type="smallBold" style={styles.amount}>
          {money(expense.amount)}
        </ThemedText>
        <ThemedText type="small" themeColor="inkFaint" style={styles.cat}>
          {expense.cat}
        </ThemedText>
      </View>
    </View>
  );
}

function CategoryList({ expenses, total }: { expenses: Expense[]; total: number }) {
  const theme = useTheme();
  const byCat = new Map<string, number>();
  expenses.forEach((e) => byCat.set(e.cat, (byCat.get(e.cat) ?? 0) + e.amount));
  const rows = [...byCat.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <Card style={styles.categoryCard}>
      {rows.map(([cat, amt]) => (
        <View key={cat}>
          <View style={styles.categoryHead}>
            <ThemedText type="smallBold">{cat}</ThemedText>
            <ThemedText type="smallBold">{money(amt)}</ThemedText>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: theme.backgroundElement }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${(amt / total) * 100}%`, backgroundColor: CategoryColors[cat as keyof typeof CategoryColors] },
              ]}
            />
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  totalCard: {
    padding: Spacing.three,
    marginBottom: Spacing.three,
  },
  totalHead: {
    marginBottom: Spacing.three,
  },
  totalAmount: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: Spacing.half,
  },
  splitBar: {
    flexDirection: 'row',
    height: 14,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: Spacing.three,
  },
  legend: {
    gap: Spacing.two,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendName: {
    flex: 1,
  },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    marginBottom: Spacing.four,
  },
  balanceText: {
    fontSize: 18,
    marginTop: Spacing.half,
  },
  settleBtn: {
    height: 38,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seg: {
    marginBottom: Spacing.three,
  },
  listCard: {
    paddingHorizontal: Spacing.three,
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  catDot: {
    width: 42,
    height: 42,
    borderRadius: Radius.sm,
  },
  expenseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginTop: Spacing.half,
  },
  expenseAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
  },
  cat: {
    fontSize: 11,
  },
  categoryCard: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  categoryHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.one,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
});
