import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingUp, Layers, Target, ArrowUp, ArrowDown } from "lucide-react";

export default function PortfolioStats() {
  const { data: summary, isLoading } = useQuery({
    queryKey: [`/api/portfolio/summary/demo-user-123`],
  });

  if (isLoading) {
    return <div>Loading portfolio stats...</div>;
  }

  if (!summary) {
    return null;
  }

  const totalGainLoss = parseFloat(summary.totalGainLoss || '0');
  const totalGainLossPercent = parseFloat(summary.totalGainLossPercent || '0');
  const dayPL = parseFloat(summary.dayPL || '0');
  const dayPercent = parseFloat(summary.dayPercent || '0');

  const isTotalPositive = totalGainLoss >= 0;
  const isDayPositive = dayPL >= 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral">Total Value</p>
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold">${summary.totalValue}</p>
          <p className={`text-sm flex items-center mt-1 ${isTotalPositive ? 'text-success' : 'text-destructive'}`}>
            {isTotalPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
            <span>{isTotalPositive ? '+' : ''}${totalGainLoss.toFixed(2)} ({totalGainLossPercent.toFixed(2)}%)</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral">Day P&L</p>
            <TrendingUp className={`h-4 w-4 ${isDayPositive ? 'text-success' : 'text-destructive'}`} />
          </div>
          <p className={`text-2xl font-bold ${isDayPositive ? 'text-success' : 'text-destructive'}`}>
            {isDayPositive ? '+' : ''}${dayPL.toFixed(2)}
          </p>
          <p className={`text-sm flex items-center mt-1 ${isDayPositive ? 'text-success' : 'text-destructive'}`}>
            {isDayPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
            <span>{isDayPositive ? '+' : ''}{dayPercent.toFixed(2)}%</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral">Positions</p>
            <Layers className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold">{summary.positions}</p>
          <p className="text-sm text-neutral mt-1">
            <span>{summary.activePositions} Active</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral">Win Rate</p>
            <Target className="h-4 w-4 text-warning" />
          </div>
          <p className="text-2xl font-bold">68%</p>
          <p className="text-sm text-neutral mt-1">
            <span>15W / 7L</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
