import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { user } = useAuth();
  const [monthlyBudget, setMonthlyBudget] = useState("4000");
  const [firstDayOfMonth, setFirstDayOfMonth] = useState("1");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setMonthlyBudget(data.monthly_budget.toString());
          setFirstDayOfMonth(data.first_day_of_month.toString());
          setEmailNotifications(data.email_notifications);
          setPushNotifications(data.push_notifications);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("user_settings")
        .update({
          monthly_budget: parseFloat(monthlyBudget),
          first_day_of_month: parseInt(firstDayOfMonth),
          email_notifications: emailNotifications,
          push_notifications: pushNotifications,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your budget and preferences</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 animate-slide-up">
            <h2 className="text-xl font-semibold text-foreground mb-4">Budget Settings</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Monthly Budget (₹)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                  min="0"
                  step="100"
                />
                <p className="text-xs text-muted-foreground">
                  Your total budget for the month
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstDay">First Day of Month</Label>
                <Select value={firstDayOfMonth} onValueChange={setFirstDayOfMonth}>
                  <SelectTrigger id="firstDay">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                      <SelectItem key={day} value={String(day)}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  When your monthly budget cycle starts
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-xl font-semibold text-foreground mb-4">Notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified at 50% and 90% of budget
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive budget alerts via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </div>
          </Card>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-gradient-primary"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
