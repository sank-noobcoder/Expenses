import { Expense } from "@/lib/types";
import { ExpenseCard } from "./ExpenseCard";
import { Package } from "lucide-react";

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseClick?: (expense: Expense) => void;
  onExpenseDelete?: (id: string) => void;
}

export const ExpenseList = ({ expenses, onExpenseClick, onExpenseDelete }: ExpenseListProps) => {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No expenses yet</h3>
        <p className="text-sm text-muted-foreground">Start tracking your expenses by adding one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onClick={() => onExpenseClick?.(expense)}
          onDelete={onExpenseDelete}
        />
      ))}
    </div>
  );
};
