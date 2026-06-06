import type { SupabaseClient } from '@supabase/supabase-js';

import type { Category, Expense, Family, FamilyEvent, Member, MemberId, Task } from '@/lib/domain';

import type { DataSource } from './data-source';

// ---------------------------------------------------------------------------
// Raw DB row shapes (snake_case → domain camelCase at mapper boundary)
// ---------------------------------------------------------------------------

interface MemberRow {
  id: string;
  name: string;
  color: string;
  streak: number;
  sort_order: number;
}

interface TaskRow {
  id: string;
  who: string;
  text: string;
  time: string;
  done: boolean;
}

interface EventRow {
  id: string;
  day: string;
  mon: string;
  dow: string;
  title: string;
  time: string;
  place: string;
  who: string;
}

interface ExpenseRow {
  id: string;
  title: string;
  cat: string;
  who: string;
  amount: number;
  when_label: string;
}

interface FamilyRow {
  id: number;
  name: string;
  you: string;
  split_members: string[];
  monthly_budget: number;
}

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

function toMember(row: MemberRow): Member {
  return {
    id: row.id as MemberId,
    name: row.name,
    color: row.color,
    streak: row.streak,
  };
}

function toTask(row: TaskRow): Task {
  return {
    id: row.id,
    who: row.who as MemberId,
    text: row.text,
    time: row.time,
    done: row.done,
  };
}

function toEvent(row: EventRow): FamilyEvent {
  return {
    id: row.id,
    day: row.day,
    mon: row.mon,
    dow: row.dow,
    title: row.title,
    time: row.time,
    place: row.place,
    who: row.who as MemberId,
  };
}

function toExpense(row: ExpenseRow): Expense {
  return {
    id: row.id,
    title: row.title,
    cat: row.cat as Category,
    who: row.who as MemberId,
    amount: row.amount,
    when: row.when_label,
  };
}

function toFamily(row: FamilyRow): Family {
  return {
    name: row.name,
    you: row.you as MemberId,
    splitMembers: row.split_members as MemberId[],
  };
}

// ---------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------

export class SupabaseDataSource implements DataSource {
  constructor(private readonly client: SupabaseClient) {}

  async listMembers(): Promise<Member[]> {
    const { data, error } = await this.client
      .from('members')
      .select('*')
      .order('sort_order');
    if (error) throw new Error(error.message);
    return (data as MemberRow[]).map(toMember);
  }

  async listTasks(): Promise<Task[]> {
    const { data, error } = await this.client.from('tasks').select('*').order('id');
    if (error) throw new Error(error.message);
    return (data as TaskRow[]).map(toTask);
  }

  async toggleTask(id: string): Promise<Task[]> {
    // Read current done state
    const { data: current, error: readError } = await this.client
      .from('tasks')
      .select('done')
      .eq('id', id)
      .single();
    if (readError) throw new Error(readError.message);

    const { error: updateError } = await this.client
      .from('tasks')
      .update({ done: !(current as { done: boolean }).done })
      .eq('id', id);
    if (updateError) throw new Error(updateError.message);

    return this.listTasks();
  }

  async listEvents(): Promise<FamilyEvent[]> {
    const { data, error } = await this.client.from('events').select('*').order('id');
    if (error) throw new Error(error.message);
    return (data as EventRow[]).map(toEvent);
  }

  async listExpenses(): Promise<Expense[]> {
    const { data, error } = await this.client.from('expenses').select('*').order('id');
    if (error) throw new Error(error.message);
    return (data as ExpenseRow[]).map(toExpense);
  }

  async getFamily(): Promise<Family> {
    const { data, error } = await this.client
      .from('family')
      .select('*')
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) throw new Error('family row missing — run supabase/seed.sql');
    return toFamily(data as FamilyRow);
  }

  async getMonthlyBudget(): Promise<number> {
    const { data, error } = await this.client
      .from('family')
      .select('monthly_budget')
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) throw new Error('family row missing — run supabase/seed.sql');
    return (data as Pick<FamilyRow, 'monthly_budget'>).monthly_budget;
  }
}
