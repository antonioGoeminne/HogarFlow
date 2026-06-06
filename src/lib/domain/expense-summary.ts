import type { Expense } from './expense';
import type { MemberId } from './member';

export interface ExpenseSummary {
  total: number;
  perPerson: { who: MemberId; value: number }[];
  fairShare: number;
  yourBalance: number;
  owed: boolean;
}

export function summarizeExpenses(
  expenses: Expense[],
  splitMembers: MemberId[],
  you: MemberId,
): ExpenseSummary {
  if (splitMembers.length === 0) {
    return { total: 0, perPerson: [], fairShare: 0, yourBalance: 0, owed: false };
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const fairShare = total / splitMembers.length;

  const perPerson = splitMembers
    .map((who) => ({
      who,
      value: expenses.filter((e) => e.who === who).reduce((sum, e) => sum + e.amount, 0),
    }))
    .filter((entry) => entry.value > 0);

  const yourPaid = perPerson.find((p) => p.who === you)?.value ?? 0;
  const yourBalance = Math.round(yourPaid - fairShare);
  const owed = yourBalance >= 0;

  return { total, perPerson, fairShare, yourBalance, owed };
}
