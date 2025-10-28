export type ExpenseCategory = "Food" | "Stationery" | "Travel" | "Misc";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  notes?: string;
  receiptUrl?: string;
}

export interface Budget {
  monthlyAmount: number;
  firstDayOfMonth: number;
  totalSpent: number;
  expenses: Expense[];
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface MonthlyReport {
  month: string;
  budget: number;
  totalSpent: number;
  categoryBreakdown: Record<ExpenseCategory, number>;
  expenses: Expense[];
}
