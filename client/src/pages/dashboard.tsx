import { useQuery } from "@tanstack/react-query";
import PortfolioStats from "@/components/portfolio/portfolio-stats";
import PositionList from "@/components/portfolio/position-list";
import MarketMovers from "@/components/dashboard/market-movers";
import NewsFeed from "@/components/dashboard/news-feed";
import EconomicCalendar from "@/components/dashboard/economic-calendar";
import OptionsHighlights from "@/components/dashboard/options-highlights";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Dashboard() {
  // Initialize sample data on first load
  useQuery({
    queryKey: ['/api/init-sample-data'],
    queryFn: async () => {
      const response = await fetch('/api/init-sample-data', { method: 'POST' });
      return response.json();
    },
    staleTime: Infinity,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Portfolio Overview</h1>
          <p className="text-neutral">Real-time analysis of your investments</p>
        </div>
        <div className="mt-3 lg:mt-0">
          <Button className="w-full lg:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Position
          </Button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <PortfolioStats userId={1} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Portfolio Positions */}
        <div className="lg:col-span-2">
          <PositionList userId={1} />
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          <MarketMovers />
          <OptionsHighlights />
        </div>
      </div>

      {/* News and Calendar */}
      <div className="grid lg:grid-cols-2 gap-6">
        <NewsFeed />
        <EconomicCalendar />
      </div>
    </div>
  );
}
