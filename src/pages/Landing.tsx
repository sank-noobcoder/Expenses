import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingDown, Bell, FileText, Shield, Smartphone } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between backdrop-blur-sm">
          <h1 className="font-bold text-2xl md:text-3xl bg-gradient-primary bg-clip-text text-transparent">
            HostelSpend
          </h1>
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-12 md:py-20 text-center animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl rounded-full mx-auto w-3/4 h-96" />
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6">
                Track Your Hostel
                <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                  Expenses Smartly
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-4">
                Simple, powerful expense tracking designed for students. Stay within budget, 
                track daily spending, and never worry about running out of money mid-month.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                <Button size="lg" asChild className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all hover:scale-105 w-full sm:w-auto">
                  <Link to="/dashboard">Start Tracking Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto hover:scale-105 transition-all">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">
            Everything You Need
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <FeatureCard
              icon={<Wallet className="h-8 w-8" />}
              title="Budget Tracking"
              description="Set your monthly budget and see exactly how much you can spend each day."
            />
            <FeatureCard
              icon={<TrendingDown className="h-8 w-8" />}
              title="Daily Allowance"
              description="Know your daily spending limit based on remaining budget."
            />
            <FeatureCard
              icon={<Bell className="h-8 w-8" />}
              title="Smart Notifications"
              description="Get alerts when you reach 50% and 90% of your monthly budget."
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="Monthly Reports"
              description="Download detailed PDF reports with category-wise breakdowns."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Secure & Private"
              description="Your financial data is encrypted and never shared."
            />
            <FeatureCard
              icon={<Smartphone className="h-8 w-8" />}
              title="Mobile Friendly"
              description="Beautiful responsive design works perfectly on all devices."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-primary text-white py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Ready to Take Control?</h3>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join students who are managing their hostel expenses smarter.
            </p>
            <Button size="lg" variant="secondary" asChild className="shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <Link to="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 HostelSpend. Built for students, by sanket with ❤️.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-5 md:p-6 hover:shadow-elegant hover:scale-[1.02] transition-all duration-300 group">
      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
        {icon}
      </div>
      <h4 className="text-lg md:text-xl font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm md:text-base text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
