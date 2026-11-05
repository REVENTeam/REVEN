import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CampaignDashboard from "./pages/CampaignDashboard";
import KanbanOrchestrator from "./pages/KanbanOrchestrator";
import SystemConfig from "./pages/SystemConfig";
import Login from "./pages/Login";

const DEMO_SESSION_KEY = "reven-demo-session";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"} component={CampaignDashboard} />
      <Route path={"/kanban"} component={KanbanOrchestrator} />
      <Route path={"/config"} component={SystemConfig} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppRouter() {
  const [location, setLocation] = useLocation();
  const [hasDemoSession, setHasDemoSession] = useState(
    () => sessionStorage.getItem(DEMO_SESSION_KEY) === "active",
  );

  useEffect(() => {
    if (!hasDemoSession && location !== "/login") {
      setLocation("/login");
    } else if (hasDemoSession && location === "/login") {
      setLocation("/");
    }
  }, [hasDemoSession, location, setLocation]);

  const enterDemo = () => {
    sessionStorage.setItem(DEMO_SESSION_KEY, "active");
    setHasDemoSession(true);
  };

  if (!hasDemoSession) {
    return <Login onLogin={enterDemo} />;
  }

  return <Router />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
