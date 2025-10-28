import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, PlusCircle, History, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      // Error handled in useAuth
    }
  };

  return (
    <>
      {/* 🌙 MOBILE VIEW */}
      {/* Move Theme Toggle to top-right */}
      <div className="md:hidden fixed top-4 right-4 z-50 bg-card/90 border border-border rounded-full p-2 shadow-md">
        <ThemeToggle />
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-40 flex items-center justify-around px-4 py-3 shadow-lg">
        <Link to="/dashboard" className="flex flex-col items-center gap-1 group transition-all">
          <Home
            className={`h-5 w-5 transition-colors ${
              isActive("/dashboard")
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          />
          <span
            className={`text-xs transition-colors ${
              isActive("/dashboard")
                ? "text-primary font-medium"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          >
            Home
          </span>
        </Link>

        <Link to="/history" className="flex flex-col items-center gap-1 group transition-all">
          <History
            className={`h-5 w-5 transition-colors ${
              isActive("/history")
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          />
          <span
            className={`text-xs transition-colors ${
              isActive("/history")
                ? "text-primary font-medium"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          >
            History
          </span>
        </Link>

        <Link
          to="/add-expense"
          className="flex flex-col items-center gap-1 group transition-all -mt-2"
        >
          <div className="bg-gradient-primary rounded-full p-3 shadow-md group-hover:shadow-lg transition-all">
            <PlusCircle className="h-6 w-6 text-white" />
          </div>
        </Link>

        <Link to="/settings" className="flex flex-col items-center gap-1 group transition-all">
          <Settings
            className={`h-5 w-5 transition-colors ${
              isActive("/settings")
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          />
          <span
            className={`text-xs transition-colors ${
              isActive("/settings")
                ? "text-primary font-medium"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          >
            Settings
          </span>
        </Link>

        <button
          onClick={handleSignOut}
          className="flex flex-col items-center gap-1 group transition-all"
        >
          <LogOut className="h-5 w-5 text-muted-foreground group-hover:text-destructive transition-colors" />
          <span className="text-xs text-muted-foreground group-hover:text-destructive transition-colors">
            Logout
          </span>
        </button>
      </nav>

      {/* 💻 DESKTOP NAVBAR (unchanged) */}
      <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-lg z-50 gap-2">
        <Button
          asChild
          variant={isActive("/dashboard") ? "default" : "ghost"}
          size="sm"
          className="rounded-full transition-all hover:scale-105"
        >
          <Link to="/dashboard" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>

        <Button
          asChild
          variant={isActive("/add-expense") ? "default" : "ghost"}
          size="sm"
          className="rounded-full transition-all hover:scale-105"
        >
          <Link to="/add-expense" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Expense
          </Link>
        </Button>

        <Button
          asChild
          variant={isActive("/history") ? "default" : "ghost"}
          size="sm"
          className="rounded-full transition-all hover:scale-105"
        >
          <Link to="/history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </Link>
        </Button>

        <Button
          asChild
          variant={isActive("/settings") ? "default" : "ghost"}
          size="sm"
          className="rounded-full transition-all hover:scale-105"
        >
          <Link to="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </Button>

        <div className="border-l border-border mx-2" />
        <ThemeToggle />
        <Button
          onClick={handleSignOut}
          variant="ghost"
          size="sm"
          className="rounded-full transition-all hover:scale-105 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </nav>
    </>
  );
};
