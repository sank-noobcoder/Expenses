import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BudgetOverview } from "@/components/BudgetOverview";
import { ExpenseList } from "@/components/ExpenseList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getDaysInCurrentMonth, getCurrentMonthYear, getCurrentMonthKey, getCurrentDay } from "@/lib/date";
import { Expense } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const [monthlyBudget, setMonthlyBudget] = useState(4000);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch user settings for monthly budget
        const { data: settings } = await supabase
          .from("user_settings")
          .select("monthly_budget")
          .eq("user_id", user.id)
          .single();

        if (settings) {
          setMonthlyBudget(Number(settings.monthly_budget));
        }

        // Fetch current month's expenses
        const currentMonth = getCurrentMonthKey();
        const { data: expensesData, error } = await supabase
          .from("expenses")
          .select("*")
          .eq("user_id", user.id)
          .gte("date", `${currentMonth}-01`)
          .lte("date", `${currentMonth}-31`)
          .order("date", { ascending: false });

        if (error) throw error;

        setExpenses(expensesData as Expense[] || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Real-time subscription for expenses
    const channel = supabase
      .channel("expenses-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "expenses",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleDeleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);

      if (error) throw error;

      toast.success("Expense deleted successfully");
      setExpenses(expenses.filter(exp => exp.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    }
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const daysInMonth = getDaysInCurrentMonth();
  const currentDay = getCurrentDay();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero pb-20 md:pb-0 md:pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-1 bg-gradient-primary bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-muted-foreground">{getCurrentMonthYear()}</p>
        </div>

        <div className="space-y-6">
          <BudgetOverview
            monthlyBudget={monthlyBudget}
            totalSpent={totalSpent}
            daysInMonth={daysInMonth}
            currentDay={currentDay}
          />

          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Expenses</h2>
              <Button size="sm" asChild className="bg-gradient-primary hover:shadow-lg transition-all">
                <Link to="/add-expense" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add New
                </Link>
              </Button>
            </div>

            <ExpenseList expenses={expenses} onExpenseDelete={handleDeleteExpense} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
