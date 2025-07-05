import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function OptionsHighlights() {
  const { data: plays = [], isLoading } = useQuery({
    queryKey: ['/api/options/plays'],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Options Plays</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Loading options...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Options Plays</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {plays.length === 0 ? (
          <div className="text-center py-4 text-neutral">
            <p>No options plays available.</p>
          </div>
        ) : (
          plays.slice(0, 3).map((play: any) => {
            const potentialReturn = parseFloat(play.potentialReturn || '0');
            
            return (
              <div 
                key={play.id} 
                className={`p-3 rounded-lg border ${
                  play.recommendation === 'BUY' ? 'border-success/20 bg-success/5' :
                  play.recommendation === 'WATCH' ? 'border-warning/20 bg-warning/5' :
                  'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">
                    {play.symbol} ${play.strike}{play.type.charAt(0).toUpperCase()}
                  </p>
                  <Badge 
                    variant="outline"
                    className={
                      play.recommendation === 'BUY' ? 'bg-success text-white border-success' :
                      play.recommendation === 'WATCH' ? 'bg-warning text-white border-warning' :
                      ''
                    }
                  >
                    {play.recommendation}
                  </Badge>
                </div>
                <p className="text-xs text-neutral">
                  Exp: {format(new Date(play.expiration), 'MM/dd')} • IV: {play.impliedVolatility}%
                </p>
                {potentialReturn > 0 && (
                  <p className={`text-xs font-medium mt-1 ${
                    play.recommendation === 'BUY' ? 'text-success' : 'text-warning'
                  }`}>
                    +{potentialReturn}% potential
                  </p>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
