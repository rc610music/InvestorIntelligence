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
  BookOpen
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: PieChart },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Market News", href: "/news", icon: Newspaper },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Screener", href: "/screener", icon: Search },
  { name: "Options", href: "/options", icon: Layers },
  { name: "Education", href: "/education", icon: BookOpen },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-white shadow-sm flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">InvestPro</h1>
            <p className="text-sm text-neutral">Portfolio Analytics</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
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
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
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
