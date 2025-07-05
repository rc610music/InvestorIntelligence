import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

export default function Options() {
  const { data: plays = [], isLoading } = useQuery({
    queryKey: ['/api/options/plays'],
  });

  if (isLoading) {
    return <div>Loading options...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Options Analysis</h1>
        <p className="text-neutral">Top options plays and opportunities</p>
      </div>

      {/* Options Plays */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Options Plays</CardTitle>
        </CardHeader>
        <CardContent>
          {(plays as any[]).length === 0 ? (
            <div className="text-center py-8 text-neutral">
              <p>No options plays available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(plays as any[]).map((play: any) => {
                const isCall = play.type === 'call';
                const potentialReturn = parseFloat(play.potentialReturn || '0');
                
                return (
                  <div key={play.id} className={`p-4 rounded-lg border-2 ${
                    play.recommendation === 'BUY' ? 'border-success/20 bg-success/5' :
                    play.recommendation === 'WATCH' ? 'border-warning/20 bg-warning/5' :
                    'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-primary text-sm">{play.symbol}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">
                              ${play.strike} {play.type.toUpperCase()}
                            </h3>
                            {isCall ? (
                              <TrendingUp className="w-4 h-4 text-success" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-destructive" />
                            )}
                          </div>
                          <p className="text-sm text-neutral">
                            Exp: {format(new Date(play.expiration), 'MM/dd/yyyy')} • 
                            Premium: ${play.premium}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          play.recommendation === 'BUY' ? 'default' :
                          play.recommendation === 'WATCH' ? 'secondary' :
                          'outline'
                        }
                        className={
                          play.recommendation === 'BUY' ? 'bg-success text-white' :
                          play.recommendation === 'WATCH' ? 'bg-warning text-white' :
                          ''
                        }
                      >
                        {play.recommendation}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-neutral">Implied Volatility</p>
                        <p className="font-medium">{play.impliedVolatility}%</p>
                      </div>
                      {play.delta && (
                        <div>
                          <p className="text-xs text-neutral">Delta</p>
                          <p className="font-medium">{play.delta}</p>
                        </div>
                      )}
                      {potentialReturn > 0 && (
                        <div>
                          <p className="text-xs text-neutral">Potential Return</p>
                          <p className="font-medium text-success">+{potentialReturn}%</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-neutral">Type</p>
                        <p className="font-medium capitalize">{play.type}</p>
                      </div>
                    </div>

                    {play.analysis && (
                      <div className="flex items-start space-x-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                        <p className="text-neutral">{play.analysis}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Options Education */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Options Trading Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 text-success">Popular Strategies</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm">Covered Call</h5>
                    <p className="text-xs text-neutral">Own stock + sell call option for income</p>
                    <p className="text-xs text-success">Best for: Neutral to slightly bullish outlook</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm">Cash-Secured Put</h5>
                    <p className="text-xs text-neutral">Sell put while holding cash to buy shares</p>
                    <p className="text-xs text-success">Best for: Want to own stock at lower price</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm">Protective Put</h5>
                    <p className="text-xs text-neutral">Own stock + buy put for downside protection</p>
                    <p className="text-xs text-success">Best for: Portfolio insurance</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-warning">Risk Management</h4>
                <ul className="space-y-2 text-sm text-neutral">
                  <li>• Position size: Max 2-5% of portfolio per trade</li>
                  <li>• Monitor implied volatility percentile</li>
                  <li>• Set profit targets (25-50% of max profit)</li>
                  <li>• Use stop losses at 2x credit received</li>
                  <li>• Avoid earnings announcements unless intended</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Option Greeks Explained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">Delta (Δ)</h5>
                <p className="text-sm text-blue-700 mb-1">Price sensitivity to underlying stock movement</p>
                <p className="text-xs text-blue-600">Range: 0 to 1 (calls), 0 to -1 (puts)</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">Gamma (Γ)</h5>
                <p className="text-sm text-green-700 mb-1">Rate of change of delta</p>
                <p className="text-xs text-green-600">Higher near expiration and at-the-money</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800 mb-2">Theta (Θ)</h5>
                <p className="text-sm text-purple-700 mb-1">Time decay - option value lost per day</p>
                <p className="text-xs text-purple-600">Always negative for long options</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h5 className="font-medium text-orange-800 mb-2">Vega (υ)</h5>
                <p className="text-sm text-orange-700 mb-1">Sensitivity to implied volatility changes</p>
                <p className="text-xs text-orange-600">Higher for longer-dated options</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Options Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Options Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium">Stock Price</label>
              <input type="number" className="w-full p-2 border rounded" placeholder="100.00" />
            </div>
            <div>
              <label className="text-sm font-medium">Strike Price</label>
              <input type="number" className="w-full p-2 border rounded" placeholder="105.00" />
            </div>
            <div>
              <label className="text-sm font-medium">Days to Expiration</label>
              <input type="number" className="w-full p-2 border rounded" placeholder="30" />
            </div>
            <div>
              <label className="text-sm font-medium">Implied Volatility (%)</label>
              <input type="number" className="w-full p-2 border rounded" placeholder="25" />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button>Calculate Call</Button>
            <Button variant="outline">Calculate Put</Button>
            <Button variant="outline">Greeks</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
