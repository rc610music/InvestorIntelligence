import { Bell, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold">InvestPro</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0">
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-medium">AJ</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
