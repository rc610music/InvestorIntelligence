import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  PieChart, 
  Briefcase, 
  Newspaper, 
  Calendar, 
  Search, 
  Layers,
  Settings,
  BarChart3,
  BookOpen,
  Brain,
  Activity,
  MessageCircle,
  Calculator,
  Globe,
  TrendingUp,
  Scale,
  GraduationCap
} from "lucide-react";
import appIcon from "@assets/20250429_1104_Graphene Stock Tracker Icon_remix_01jt116mh7ek9sdtcr41gyfxeb_1751837863498.png";

const navigation = [
  { name: "Dashboard", href: "/app", icon: PieChart },
  { name: "Portfolio", href: "/app/portfolio", icon: Briefcase },
  { name: "Market News", href: "/app/news", icon: Newspaper },
  { name: "Calendar", href: "/app/calendar", icon: Calendar },
  { name: "Screener", href: "/app/screener", icon: Search },
  { name: "Options", href: "/app/options", icon: Layers },
  { name: "Education", href: "/app/education", icon: BookOpen },
];

const advancedNavigation = [
  { name: "Market Intelligence", href: "/app/market-intelligence", icon: Globe },
  { name: "AI Insights", href: "/app/ai-insights", icon: Brain },
  { name: "Market Trends", href: "/app/market-trends", icon: TrendingUp },
  { name: "Options Flow", href: "/app/options-flow", icon: Activity },
  { name: "Social Sentiment", href: "/app/social-sentiment", icon: MessageCircle },
  { name: "Value Predictor", href: "/app/value-predictor", icon: Calculator },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-white shadow-sm flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden">
            <img 
              src={appIcon} 
              alt="StockSense" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">StockSense</h1>
            <p className="text-sm text-neutral">Portfolio Analytics</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-6">
          {/* Core Features */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Core Features</h3>
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link href={item.href} className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}>
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Advanced Analytics */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Advanced Analytics</h3>
            <ul className="space-y-2">
              {advancedNavigation.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link href={item.href} className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}>
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Tour & User Profile */}
      <div className="p-4 border-t space-y-3">
        <button
          onClick={() => {
            localStorage.removeItem('stocksense-tour-completed');
            localStorage.removeItem('stocksense-tour-seen');
            window.location.reload();
          }}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-sm font-medium">Take Investment Tour</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium">AJ</span>
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Alex Johnson</p>
            <p className="text-xs text-neutral">Pro Plan</p>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Settings className="w-4 h-4 text-neutral" />
          </button>
        </div>
      </div>
    </aside>
  );
}
