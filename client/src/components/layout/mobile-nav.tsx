import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  PieChart, 
  Briefcase, 
  Newspaper, 
  Search, 
  Layers,
  BookOpen
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/", icon: PieChart },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Screen", href: "/screener", icon: Search },
  { name: "Learn", href: "/education", icon: BookOpen },
];

export default function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
      <div className="grid grid-cols-5 h-16">
        {navigation.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.href} className={cn(
              "flex flex-col items-center justify-center h-full transition-colors",
              isActive 
                ? "text-primary" 
                : "text-neutral hover:text-primary"
            )}>
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
