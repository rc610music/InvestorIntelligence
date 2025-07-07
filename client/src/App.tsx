import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOnboardingTour } from "@/hooks/use-onboarding-tour";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Portfolio from "@/pages/portfolio";
import News from "@/pages/news";
import Calendar from "@/pages/calendar";
import Screener from "@/pages/screener";
import Options from "@/pages/options";
import Education from "@/pages/education";
import AIInsights from "@/pages/ai-insights";
import OptionsFlow from "@/pages/options-flow";
import SocialSentiment from "@/pages/social-sentiment";
import ValuePredictor from "@/pages/value-predictor";
import MarketIntelligence from "@/pages/market-intelligence";
import MarketTrends from "@/pages/market-trends";
import Disclaimer from "@/pages/disclaimer";
import LandingPage from "@/pages/landing-page";
import Sidebar from "@/components/layout/sidebar";
import MobileHeader from "@/components/layout/mobile-header";
import MobileNav from "@/components/layout/mobile-nav";
import OnboardingTour from "@/components/onboarding/onboarding-tour";

function Router() {
  const [location] = useLocation();
  
  // Landing page route - separate from main app
  if (location === "/" || location === "/landing") {
    return <LandingPage />;
  }
  
  // Main application routes - all under /app
  return (
    <Switch>
      <Route path="/app" component={Dashboard} />
      <Route path="/app/portfolio" component={Portfolio} />
      <Route path="/app/news" component={News} />
      <Route path="/app/calendar" component={Calendar} />
      <Route path="/app/screener" component={Screener} />
      <Route path="/app/options" component={Options} />
      <Route path="/app/education" component={Education} />
      <Route path="/app/ai-insights" component={AIInsights} />
      <Route path="/app/options-flow" component={OptionsFlow} />
      <Route path="/app/social-sentiment" component={SocialSentiment} />
      <Route path="/app/value-predictor" component={ValuePredictor} />
      <Route path="/app/market-intelligence" component={MarketIntelligence} />
      <Route path="/app/market-trends" component={MarketTrends} />
      <Route path="/app/disclaimer" component={Disclaimer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const isMobile = useIsMobile();
  const { isOpen, closeTour } = useOnboardingTour();
  const [location] = useLocation();
  
  // Check if we're on the landing page or main app
  const isLandingPage = location === "/" || location === "/landing";
  const isAppRoute = location.startsWith("/app");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLandingPage ? (
          // Landing page layout - no sidebar/nav
          <Router />
        ) : (
          // Main app layout - with sidebar/nav
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {isMobile && <MobileHeader />}
            
            <div className="flex min-h-screen">
              {!isMobile && <Sidebar />}
              
              <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
                <Router />
              </main>
            </div>
            
            {isMobile && <MobileNav />}
            
            {/* Onboarding tour only for app routes */}
            {isAppRoute && <OnboardingTour isOpen={isOpen} onClose={closeTour} />}
          </div>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
