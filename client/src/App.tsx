import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Portfolio from "@/pages/Portfolio";
import AddAsset from "@/pages/AddAsset";
import MarketData from "@/pages/MarketData";
import Transactions from "@/pages/Transactions";
import Profile from "@/pages/Profile";
import BottomNav from "@/components/BottomNav";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/add" component={AddAsset} />
      <Route path="/markets" component={MarketData} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Router />
            <BottomNav />
            <Toaster />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
