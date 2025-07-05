import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Portfolio from "@/pages/portfolio";
import News from "@/pages/news";
import Calendar from "@/pages/calendar";
import Screener from "@/pages/screener";
import Options from "@/pages/options";
import Education from "@/pages/education";
import Sidebar from "@/components/layout/sidebar";
import MobileHeader from "@/components/layout/mobile-header";
import MobileNav from "@/components/layout/mobile-nav";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/news" component={News} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/screener" component={Screener} />
      <Route path="/options" component={Options} />
      <Route path="/education" component={Education} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {isMobile && <MobileHeader />}
          
          <div className="flex min-h-screen">
            {!isMobile && <Sidebar />}
            
            <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
              <Router />
            </main>
          </div>
          
          {isMobile && <MobileNav />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
