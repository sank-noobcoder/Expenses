import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/currency";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface MonthlyData {
  month: string;
  budget: number;
  spent: number;
  saved: number;
}

const History = () => {
  const { user } = useAuth();
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHistoryData();
    }
  }, [user]);

  const fetchHistoryData = async () => {
    try {
      const { data: settings } = await supabase
        .from("user_settings")
        .select("monthly_budget")
        .eq("user_id", user?.id)
        .single();

      const { data: expenses } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user?.id)
        .order("date", { ascending: false });

      if (expenses && settings) {
        const monthlyMap = new Map<string, number>();

        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          const currentTotal = monthlyMap.get(monthKey) || 0;
          monthlyMap.set(monthKey, currentTotal + Number(expense.amount));
        });

        const data: MonthlyData[] = Array.from(monthlyMap.entries())
          .map(([month, spent]) => ({
            month,
            budget: Number(settings.monthly_budget),
            spent,
            saved: Number(settings.monthly_budget) - spent,
          }))
          .sort((a, b) => b.month.localeCompare(a.month));

        setMonthlyData(data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async (data: MonthlyData) => {
  if (typeof window === "undefined") return;
  try {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF({ compress: true });

    // Set UTF-8 safe font
    doc.setFont("helvetica", "normal");

    const monthName = new Date(data.month + "-01").toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });

    // === HEADER ===
    doc.setFillColor(52, 152, 219);
    doc.rect(0, 0, 210, 30, "F");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(`Expense Report - ${monthName}`, 15, 20);

    // === SUMMARY BOX ===
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setDrawColor(200, 200, 200);
    doc.rect(10, 40, 190, 30);

    // Use a plain “Rs.” instead of ₹ to avoid encoding errors
    doc.text(`Budget: Rs. ${data.budget.toLocaleString("en-IN")}`, 15, 50);
    doc.text(`Total Spent: Rs. ${data.spent.toLocaleString("en-IN")}`, 15, 58);
    doc.text(
      `${data.saved >= 0 ? "Saved" : "Over Budget"}: Rs. ${Math.abs(
        data.saved
      ).toLocaleString("en-IN")}`,
      15,
      66
    );

    // === FETCH EXPENSES ===
    const startDate = `${data.month}-01`;
    const year = parseInt(data.month.split("-")[0]);
    const month = parseInt(data.month.split("-")[1]);
    const daysInMonth = new Date(year, month, 0).getDate();
    const endDate = `${data.month}-${daysInMonth}`;

    const { data: expenses } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user?.id)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true });

    if (expenses && expenses.length > 0) {
      const tableData = expenses.map((exp) => [
        new Date(exp.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        exp.category || "N/A",
        `Rs. ${Number(exp.amount).toLocaleString("en-IN")}`,
        exp.notes || "-",
      ]);

      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text("Detailed Expenses", 15, 85);

      autoTable(doc, {
        head: [["Date", "Category", "Amount", "Notes"]],
        body: tableData,
        startY: 90,
        theme: "grid",
        headStyles: {
          fillColor: [52, 152, 219],
          textColor: 255,
          halign: "center",
        },
        styles: {
          fontSize: 11,
          cellPadding: 3,
          lineColor: [240, 240, 240],
          font: "helvetica",
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });
    } else {
      doc.setFontSize(12);
      doc.text("No expenses recorded for this month.", 15, 90);
    }

    // === FOOTER ===
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("Generated by Hostel Pocket Buddy", 15, pageHeight - 10);

    doc.save(`expense-report-${data.month}.pdf`);
    toast.success("PDF downloaded successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to generate PDF");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
        <Navbar />
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-1">History</h1>
            <p className="text-muted-foreground">View your past expenses</p>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero pb-20 md:pb-0 md:pt-20">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-1 bg-gradient-primary bg-clip-text text-transparent">
            History
          </h1>
          <p className="text-muted-foreground">View your past expenses</p>
        </div>

        {monthlyData.length === 0 ? (
          <Card className="p-12 text-center shadow-lg bg-gradient-card border-border">
            <p className="text-muted-foreground">
              No expense history yet. Start adding expenses to see your monthly reports!
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <Card
                key={data.month}
                className="p-6 hover:shadow-xl transition-all animate-slide-up bg-gradient-card border-border hover:scale-[1.01]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {new Date(data.month + "-01").toLocaleDateString("en-IN", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {data.saved >= 0 ? "Saved" : "Over budget"}:{" "}
                      {formatCurrency(Math.abs(data.saved))}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generatePDF(data)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Budget</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatCurrency(data.budget)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Spent</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatCurrency(data.spent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Saved</p>
                    <p
                      className={`text-lg font-semibold ${
                        data.saved >= 0 ? "text-success" : "text-destructive"
                      }`}
                    >
                      {formatCurrency(Math.abs(data.saved))}
                      {data.saved < 0 && <TrendingUp className="inline h-4 w-4 ml-1" />}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
