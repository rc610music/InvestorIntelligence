import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketMovers() {
  const { data: movers = [], isLoading } = useQuery({
    queryKey: ['/api/market/movers'],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Movers</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Loading market movers...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Movers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {movers.length === 0 ? (
          <div className="text-center py-4 text-neutral">
            <p>No market movers data available.</p>
          </div>
        ) : (
          movers.slice(0, 6).map((stock: any) => {
            const changePercent = parseFloat(stock.changePercent);
            const isPositive = changePercent >= 0;

            return (
              <div key={stock.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{stock.symbol}</p>
                  <p className="text-xs text-neutral">${stock.currentPrice}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                    {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
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
