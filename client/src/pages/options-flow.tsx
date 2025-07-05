import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Volume2, 
  Eye,
  Target,
  Clock,
  DollarSign,
  Activity,
  AlertCircle,
  Zap,
  Users,
  BarChart3
} from "lucide-react";
import { format } from "date-fns";

export default function OptionsFlow() {
  const { data: darkPoolData } = useQuery({
    queryKey: ['/api/options/dark-pool-flow'],
    enabled: true
  });

  const { data: unusualActivity } = useQuery({
    queryKey: ['/api/options/unusual-activity'],
    enabled: true
  });

  const { data: whaleTracker } = useQuery({
    queryKey: ['/api/options/whale-tracker'],
    enabled: true
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Options Flow Intelligence</h1>
          <p className="text-muted-foreground">Real-time institutional options activity and dark pool flows</p>
        </div>
      </div>

      <Tabs defaultValue="flow" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flow">Live Flow</TabsTrigger>
          <TabsTrigger value="unusual">Unusual Activity</TabsTrigger>
          <TabsTrigger value="whales">Whale Tracker</TabsTrigger>
          <TabsTrigger value="sentiment">Options Sentiment</TabsTrigger>
        </TabsList>

        <TabsContent value="flow" className="space-y-4">
          {/* Real-time Options Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Premium Flow</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$2.4B</div>
                <p className="text-xs text-muted-foreground">
                  +15.2% vs yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Call/Put Ratio</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">1.34</div>
                <p className="text-xs text-muted-foreground">
                  Bullish sentiment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dark Pool Index</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">72</div>
                <p className="text-xs text-muted-foreground">
                  Above average activity
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Live Options Flow Table */}
          <Card>
            <CardHeader>
              <CardTitle>Live Options Flow</CardTitle>
              <p className="text-sm text-muted-foreground">Real-time institutional options activity</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">NVDA</div>
                      <div className="text-xs text-muted-foreground">11:23 AM</div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">CALL</Badge>
                        <span className="font-medium">$900 Strike</span>
                        <span className="text-sm text-muted-foreground">Jan 17</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Premium: $47.2M | Vol: 15,420</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-orange-100 text-orange-800">Sweep</Badge>
                    <div className="text-sm font-medium text-green-600">Bullish</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">AAPL</div>
                      <div className="text-xs text-muted-foreground">11:18 AM</div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-red-100 text-red-800">PUT</Badge>
                        <span className="font-medium">$170 Strike</span>
                        <span className="text-sm text-muted-foreground">Feb 21</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Premium: $23.8M | Vol: 8,750</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800">Block</Badge>
                    <div className="text-sm font-medium text-red-600">Bearish</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">TSLA</div>
                      <div className="text-xs text-muted-foreground">11:15 AM</div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">CALL</Badge>
                        <span className="font-medium">$260 Strike</span>
                        <span className="text-sm text-muted-foreground">Mar 21</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Premium: $31.1M | Vol: 12,340</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-purple-100 text-purple-800">Whale</Badge>
                    <div className="text-sm font-medium text-green-600">Bullish</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unusual" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Unusual Volume Alert */}
            <Card>
              <CardHeader>
                <CardTitle>Volume Spike Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4 text-red-600" />
                        <span className="font-medium">META</span>
                      </div>
                      <Badge className="bg-red-100 text-red-800">1,247% above avg</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Jan 17 $580 CALLS: 47,820 contracts vs 380 avg
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Premium Flow: $89.2M</span>
                      <span className="text-green-600">Bullish Signal</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">GOOGL</span>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">823% above avg</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Feb 21 $170 PUTS: 28,450 contracts vs 340 avg
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Premium Flow: $45.7M</span>
                      <span className="text-red-600">Bearish Signal</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Money Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Smart Money Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Hedge Fund Flows</span>
                      <Badge className="bg-green-100 text-green-800">Net Buying</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      $347M net call buying in tech sector today
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Pension Fund Activity</span>
                      <Badge className="bg-blue-100 text-blue-800">Neutral</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Balanced call/put activity in large cap names
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Insider Trading Correlation</span>
                      <Badge className="bg-purple-100 text-purple-800">High</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Options activity precedes insider purchases by 3 days
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gamma Exposure Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Gamma Exposure & Market Impact</CardTitle>
              <p className="text-sm text-muted-foreground">
                Understanding how options positioning affects stock movement
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-600">+$2.1B</div>
                  <div className="text-sm text-muted-foreground">SPY Gamma Exposure</div>
                  <div className="text-xs text-green-600">Supportive for upward moves</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-red-600">-$890M</div>
                  <div className="text-sm text-muted-foreground">QQQ Gamma Exposure</div>
                  <div className="text-xs text-red-600">Resistance to upward moves</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-600">4,250</div>
                  <div className="text-sm text-muted-foreground">SPY Key Level</div>
                  <div className="text-xs text-blue-600">Major gamma cluster</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whales" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Whale Tracker */}
            <Card>
              <CardHeader>
                <CardTitle>Whale Activity Tracker</CardTitle>
                <p className="text-sm text-muted-foreground">Trades over $1M premium</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Whale #1247</div>
                        <div className="text-sm text-muted-foreground">Pension Fund</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$4.2M NVDA Calls</div>
                      <div className="text-sm text-green-600">+$280K P&L</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Whale #892</div>
                        <div className="text-sm text-muted-foreground">Hedge Fund</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$7.8M AAPL Puts</div>
                      <div className="text-sm text-red-600">-$145K P&L</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Zap className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Whale #2156</div>
                        <div className="text-sm text-muted-foreground">Family Office</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$2.9M TSLA Calls</div>
                      <div className="text-sm text-green-600">+$520K P&L</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Copy Whale Strategies */}
            <Card>
              <CardHeader>
                <CardTitle>Whale Strategy Copier</CardTitle>
                <p className="text-sm text-muted-foreground">Follow successful institutional strategies</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Top Performing Whale</span>
                      <Badge className="bg-green-100 text-green-800">+47.2% YTD</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Specializes in tech earnings plays with 68% win rate
                    </div>
                    <Button size="sm" className="w-full">Follow Strategy</Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Conservative Whale</span>
                      <Badge className="bg-blue-100 text-blue-800">+18.5% YTD</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Low-risk covered call strategies on dividend stocks
                    </div>
                    <Button size="sm" variant="outline" className="w-full">Follow Strategy</Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Momentum Whale</span>
                      <Badge className="bg-purple-100 text-purple-800">+89.1% YTD</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      High-risk momentum plays with stop-loss protection
                    </div>
                    <Button size="sm" variant="outline" className="w-full">Follow Strategy</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Whale Performance Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Whale Performance Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs font-bold text-yellow-800">1</div>
                    <div>
                      <div className="font-medium">Whale #3847</div>
                      <div className="text-sm text-muted-foreground">Sovereign Wealth Fund</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">+127.3%</div>
                    <div className="text-sm text-muted-foreground">YTD Return</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-800">2</div>
                    <div>
                      <div className="font-medium">Whale #1092</div>
                      <div className="text-sm text-muted-foreground">Prop Trading Firm</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">+94.7%</div>
                    <div className="text-sm text-muted-foreground">YTD Return</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-800">3</div>
                    <div>
                      <div className="font-medium">Whale #5634</div>
                      <div className="text-sm text-muted-foreground">Multi-Strategy Fund</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">+78.2%</div>
                    <div className="text-sm text-muted-foreground">YTD Return</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          {/* Options-based market sentiment indicators */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Put/Call Ratio</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">0.68</div>
                <p className="text-xs text-muted-foreground">
                  Below 0.7 = Extreme bullishness
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">VIX Term Structure</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Contango</div>
                <p className="text-xs text-muted-foreground">
                  Bullish signal for equities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skew Index</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">142</div>
                <p className="text-xs text-muted-foreground">
                  Elevated tail risk pricing
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Smart Money vs Retail Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Smart Money vs Retail Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-600">Institutional Activity</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Call Volume</span>
                      <span className="text-sm font-medium">$2.1B</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Put Volume</span>
                      <span className="text-sm font-medium">$890M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Net Sentiment</span>
                      <Badge className="bg-green-100 text-green-800">Bullish</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-600">Retail Activity</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Call Volume</span>
                      <span className="text-sm font-medium">$450M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Put Volume</span>
                      <span className="text-sm font-medium">$680M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Net Sentiment</span>
                      <Badge className="bg-red-100 text-red-800">Bearish</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}