import { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/currency";
import { formatDateShort } from "@/lib/date";
import { CategoryBadge } from "./CategoryBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image as ImageIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ExpenseCardProps {
  expense: Expense;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

export const ExpenseCard = ({ expense, onClick, onDelete }: ExpenseCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card 
      className="p-4 hover:shadow-lg transition-all cursor-pointer border-border bg-gradient-card animate-slide-up hover:scale-[1.02] duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <CategoryBadge category={expense.category} size="sm" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{formatDateShort(expense.date)}</span>
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild onClick={handleDelete}>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Expense</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this expense of {formatCurrency(expense.amount)}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(expense.id);
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-2xl font-bold text-foreground">{formatCurrency(expense.amount)}</p>
          {expense.notes && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{expense.notes}</p>
          )}
        </div>

        <div className="flex gap-2">
          {expense.receiptUrl && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <ImageIcon className="h-4 w-4 text-primary" />
            </div>
          )}
          {expense.notes && !expense.receiptUrl && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
