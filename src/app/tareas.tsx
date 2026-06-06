import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SegBar } from '@/components/seg-bar';
import { ThemedText } from '@/components/themed-text';
import { useTasks, useMembers, useFamily } from '@/api';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/auth';
import { useUIStore, type TasksFilter } from '@/stores/ui-store';
import type { Member, Task } from '@/lib/domain';

export default function TareasScreen() {
  const { tasks, toggle } = useTasks();
  const { members } = useMembers();
  const { family } = useFamily();
  const { tasksFilter, setTasksFilter } = useUIStore();
  const you = useAuth().user?.memberId;

  const present = members.filter((m) => tasks.some((t) => t.who === m.id));
  const shown = tasksFilter === 'todos' ? present : present.filter((m) => m.id === you);
  const totalPending = tasks.filter((t) => !t.done).length;

  return (
    <Screen>
      <ScreenHeader title="Tareas" sub={`${totalPending} pendientes en ${family.name}`} />
      <View style={styles.seg}>
        <SegBar
          value={tasksFilter}
          onChange={(v) => setTasksFilter(v as TasksFilter)}
          options={[
            { id: 'todos', label: 'Toda la familia' },
            { id: 'mias', label: 'Mías' },
          ]}
        />
      </View>
      {shown.map((member) => (
        <PersonCard
          key={member.id}
          member={member}
          tasks={tasks.filter((t) => t.who === member.id)}
          onToggle={toggle}
          isYou={member.id === you}
        />
      ))}
    </Screen>
  );
}

function PersonCard({
  member,
  tasks,
  onToggle,
  isYou,
}: {
  member: Member;
  tasks: Task[];
  onToggle: (id: string) => void;
  isYou: boolean;
}) {
  const theme = useTheme();
  const done = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? done / tasks.length : 0;
  const allDone = done === tasks.length && tasks.length > 0;
  const barColor = allDone ? theme.good : member.color;

  return (
    <Card style={styles.personCard}>
      <View style={styles.personHead}>
        <Avatar name={member.name} color={member.color} size={46} />
        <View style={styles.flex1}>
          <View style={styles.nameRow}>
            <ThemedText type="smallBold" style={styles.name}>
              {member.name}
            </ThemedText>
            {isYou ? (
              <View style={[styles.youPill, { backgroundColor: theme.accentTint }]}>
                <ThemedText type="small" themeColor="accentPress" style={styles.youText}>
                  Tú
                </ThemedText>
              </View>
            ) : null}
          </View>
          <ThemedText type="small" themeColor="inkFaint">
            {member.streak} días seguidos
          </ThemedText>
        </View>
        <View style={styles.scoreBox}>
          <ThemedText type="smallBold" style={[styles.score, { color: barColor }]}>
            {done}/{tasks.length}
          </ThemedText>
          <ThemedText type="small" themeColor="inkFaint" style={styles.scoreLabel}>
            {allDone ? '¡Listo!' : 'hechas'}
          </ThemedText>
        </View>
      </View>

      <View style={[styles.progressTrack, { backgroundColor: theme.backgroundElement }]}>
        <View style={[styles.progressFill, { width: `${pct * 100}%`, backgroundColor: barColor }]} />
      </View>

      <View style={styles.taskList}>
        {tasks.map((t, i) => (
          <Pressable
            key={t.id}
            onPress={() => onToggle(t.id)}
            style={[styles.taskRow, i > 0 && { borderTopColor: theme.lineSoft, borderTopWidth: 1 }]}>
            <View
              style={[
                styles.check,
                t.done
                  ? { backgroundColor: member.color, borderColor: member.color }
                  : { borderColor: theme.line },
              ]}>
              {t.done ? <ThemedText style={styles.checkMark}>✓</ThemedText> : null}
            </View>
            <ThemedText
              type="small"
              themeColor={t.done ? 'inkFaint' : 'ink'}
              style={[styles.flex1, t.done && styles.strike]}>
              {t.text}
            </ThemedText>
            <ThemedText type="small" themeColor="inkFaint">
              {t.time}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  seg: {
    marginBottom: Spacing.four,
  },
  flex1: {
    flex: 1,
  },
  personCard: {
    padding: Spacing.three,
    marginBottom: Spacing.three,
  },
  personHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  name: {
    fontSize: 18,
  },
  youPill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 1,
    borderRadius: 999,
  },
  youText: {
    fontSize: 11,
  },
  scoreBox: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 20,
  },
  scoreLabel: {
    fontSize: 11,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: Spacing.three,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  taskList: {
    marginTop: Spacing.two,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 18,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
});
