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
      <PortfolioStats />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Portfolio Positions */}
        <div className="lg:col-span-2">
          <PositionList />
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

      {/* Market Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="font-semibold mb-2">Market Sentiment</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">Bullish</p>
              <p className="text-sm text-neutral">Driven by AI sector growth and Fed dovish signals</p>
            </div>
            <div className="p-6 border rounded-lg bg-gradient-to-br from-green-50 to-green-100">
              <h3 className="font-semibold mb-2">Volatility Index (VIX)</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">16.8</p>
              <p className="text-sm text-neutral">Low volatility, stable market conditions</p>
            </div>
            <div className="p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <h3 className="font-semibold mb-2">Sector Leader</h3>
              <p className="text-2xl font-bold text-purple-600 mb-1">Technology</p>
              <p className="text-sm text-neutral">+3.2% sector performance this week</p>
            </div>
            <div className="p-6 border rounded-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <h3 className="font-semibold mb-2">Next Fed Meeting</h3>
              <p className="text-2xl font-bold text-orange-600 mb-1">Jan 29</p>
              <p className="text-sm text-neutral">Rate cut probability: 65%</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Add Position
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Screen Stocks
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                View Options
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Market Research
              </Button>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Learning Center</h4>
            <div className="space-y-2 text-sm">
              <p className="text-neutral">Expand your investment knowledge</p>
              <Button variant="outline" size="sm" className="w-full">
                Browse Guides
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
