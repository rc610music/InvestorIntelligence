import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
          {plays.length === 0 ? (
            <div className="text-center py-8 text-neutral">
              <p>No options plays available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {plays.map((play: any) => {
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
      <Card>
        <CardHeader>
          <CardTitle>Options Trading Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-success">Key Strategies</h4>
              <ul className="space-y-1 text-sm text-neutral">
                <li>• Covered calls for income generation</li>
                <li>• Cash-secured puts for entry points</li>
                <li>• Protective puts for downside protection</li>
                <li>• Iron condors for range-bound markets</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-warning">Risk Management</h4>
              <ul className="space-y-1 text-sm text-neutral">
                <li>• Never risk more than 2% per trade</li>
                <li>• Monitor IV percentile before entry</li>
                <li>• Set profit targets and stop losses</li>
                <li>• Avoid trading during low liquidity</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
