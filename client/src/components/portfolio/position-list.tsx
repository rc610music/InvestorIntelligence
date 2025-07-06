import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function PositionList() {
  const { user } = useAuth();
  const { data: positions = [], isLoading } = useQuery({
    queryKey: [`/api/portfolio/positions/${user?.id}`],
    enabled: !!user,
  });

  if (isLoading) {
    return <div>Loading positions...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Current Positions</CardTitle>
          <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm font-medium">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {positions.length === 0 ? (
          <div className="p-6 text-center text-neutral">
            <p>No positions found. Add your first position to get started.</p>
          </div>
        ) : (
          positions.slice(0, 5).map((position: any) => {
            const gainLoss = parseFloat(position.unrealizedGainLoss);
            const gainLossPercent = parseFloat(position.unrealizedGainLossPercent);
            const isPositive = gainLoss >= 0;

            return (
              <div key={position.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-primary text-sm">{position.symbol}</span>
                  </div>
                  <div>
                    <p className="font-medium">{position.name}</p>
                    <p className="text-sm text-neutral">
                      {position.shares} shares • ${position.avgPrice} avg
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${position.marketValue}</p>
                  <p className={`text-sm flex items-center ${isPositive ? 'text-success' : 'text-destructive'}`}>
                    {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {isPositive ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
