import { formatCurrency } from "@/lib/currency";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

interface BudgetOverviewProps {
  monthlyBudget: number;
  totalSpent: number;
  daysInMonth: number;
  currentDay: number;
}

export const BudgetOverview = ({ monthlyBudget, totalSpent, daysInMonth, currentDay }: BudgetOverviewProps) => {
  const remaining = monthlyBudget - totalSpent;
  const percentSpent = (totalSpent / monthlyBudget) * 100;
  const remainingDays = Math.max(daysInMonth - currentDay + 1, 1); // At least 1 day
  const dailyAllowance = remaining / remainingDays;
  const isOverBudget = totalSpent > monthlyBudget;

  return (
    <div className="bg-gradient-primary rounded-2xl p-6 text-white shadow-lg animate-fade-in relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold opacity-90">This Month</h2>
          <div className="bg-white/20 p-2 rounded-full">
            <Wallet className="h-5 w-5" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm opacity-80 mb-1">Total Budget</p>
            <p className="text-4xl font-bold tracking-tight">{formatCurrency(monthlyBudget)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-white/20 p-1 rounded-lg">
                  <TrendingDown className="h-4 w-4" />
                </div>
                <p className="text-xs opacity-80">Spent</p>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
            </div>

            <div className={`backdrop-blur-sm rounded-xl p-4 transition-all ${isOverBudget ? 'bg-red-500/30 hover:bg-red-500/40' : 'bg-white/10 hover:bg-white/15'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-white/20 p-1 rounded-lg">
                  {isOverBudget ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </div>
                <p className="text-xs opacity-80">Remaining</p>
              </div>
              <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-100' : ''}`}>
                {formatCurrency(Math.abs(remaining))}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Progress</span>
              <span className="font-semibold">{percentSpent.toFixed(0)}%</span>
            </div>
            <Progress 
              value={Math.min(percentSpent, 100)} 
              className="h-3 bg-white/20"
            />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/15 transition-all">
            <p className="text-xs opacity-80 mb-1">Daily Allowance ({remainingDays} days left)</p>
            <p className="text-2xl font-bold">
              {dailyAllowance >= 0 ? formatCurrency(dailyAllowance) : formatCurrency(0)}
              <span className="text-sm font-normal opacity-80">/day</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
