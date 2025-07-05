import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle, 
  Zap,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Lightbulb,
  Shield
} from "lucide-react";

export default function AIInsights() {
  const { data: sentimentData } = useQuery({
    queryKey: ['/api/ai/sentiment-analysis'],
    enabled: true
  });

  const { data: portfolioAI } = useQuery({
    queryKey: ['/api/ai/portfolio-optimization'],
    enabled: true
  });

  const { data: predictiveAnalytics } = useQuery({
    queryKey: ['/api/ai/predictive-analytics'],
    enabled: true
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">AI Investment Intelligence</h1>
          <p className="text-muted-foreground">Advanced AI-powered insights and portfolio optimization</p>
        </div>
      </div>

      <Tabs defaultValue="sentiment" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sentiment">Market Sentiment</TabsTrigger>
          <TabsTrigger value="optimization">Portfolio AI</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="risk">Risk AI</TabsTrigger>
        </TabsList>

        <TabsContent value="sentiment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Real-time Market Sentiment */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Fear & Greed</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">72</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Greed</Badge>
                  </div>
                  <Progress value={72} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Market showing strong bullish sentiment. Consider taking profits on overvalued positions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Sentiment */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Social Sentiment</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>NVDA</span>
                      <span className="text-green-600">+85% Bullish</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TSLA</span>
                      <span className="text-red-600">-23% Bearish</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>AAPL</span>
                      <span className="text-green-600">+67% Bullish</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Call Analysis */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Earnings AI Analysis</CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">MSFT Earnings</span>
                      <Badge className="bg-green-100 text-green-800">Strong</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      CEO tone analysis: 92% confidence, mentioned "growth" 47 times. 
                      AI detected hidden optimism in forward guidance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sector Rotation Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AI Sector Rotation Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">Sectors to Overweight</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Technology</div>
                        <div className="text-sm text-muted-foreground">AI Revolution momentum</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+15% Target</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Healthcare</div>
                        <div className="text-sm text-muted-foreground">Aging population trends</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+8% Target</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-red-600">Sectors to Underweight</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Real Estate</div>
                        <div className="text-sm text-muted-foreground">Interest rate headwinds</div>
                      </div>
                      <Badge variant="destructive">-12% Target</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Utilities</div>
                        <div className="text-sm text-muted-foreground">Growth rate concerns</div>
                      </div>
                      <Badge variant="destructive">-5% Target</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Portfolio Score */}
            <Card>
              <CardHeader>
                <CardTitle>AI Portfolio Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">87/100</div>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Diversification</span>
                        <span>92/100</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Risk-Adjusted Returns</span>
                        <span>85/100</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Cost Efficiency</span>
                        <span>78/100</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>ESG Alignment</span>
                        <span>90/100</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Rebalance Opportunity</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">High Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reduce NVDA by 3% and increase VTI exposure. Expected +2.1% annual return improvement.
                    </p>
                    <Button size="sm" className="w-full">Implement Rebalance</Button>
                  </div>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Tax Loss Harvesting</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Tax Savings</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sell TSLA position at a loss and buy RIVN. Save $1,847 in taxes while maintaining sector exposure.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Review Strategy</Button>
                  </div>

                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Dollar-Cost Averaging</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Auto-Pilot</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Set up $500 monthly DCA into SPY. AI will optimize timing based on market volatility.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Setup Auto-Invest</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Factor Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>115+ Factor AI Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Advanced multi-factor model analyzing your portfolio across institutional-grade metrics
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-600">+2.3%</div>
                  <div className="text-sm text-muted-foreground">Alpha Generation</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-600">1.2</div>
                  <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-purple-600">0.85</div>
                  <div className="text-sm text-muted-foreground">Beta</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-orange-600">12%</div>
                  <div className="text-sm text-muted-foreground">Max Drawdown</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Price Predictions */}
            <Card>
              <CardHeader>
                <CardTitle>AI Price Predictions (Next 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">AAPL</span>
                      <Badge className="bg-green-100 text-green-800">86% Confidence</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Current: $172.50</span>
                      <span className="text-green-600">Target: $185.20 (+7.4%)</span>
                    </div>
                    <Progress value={74} className="h-2 mt-2" />
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">NVDA</span>
                      <Badge className="bg-yellow-100 text-yellow-800">72% Confidence</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Current: $875.30</span>
                      <span className="text-red-600">Target: $820.15 (-6.3%)</span>
                    </div>
                    <Progress value={63} className="h-2 mt-2" />
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">MSFT</span>
                      <Badge className="bg-green-100 text-green-800">91% Confidence</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Current: $415.20</span>
                      <span className="text-green-600">Target: $438.90 (+5.7%)</span>
                    </div>
                    <Progress value={57} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Event Predictions */}
            <Card>
              <CardHeader>
                <CardTitle>Predictive Market Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">Fed Rate Decision Impact</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      78% probability of 0.25% rate cut in March. Tech stocks likely to surge 3-5%.
                    </p>
                    <Badge className="bg-orange-100 text-orange-800">March 18, 2025</Badge>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Earnings Season Surge</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      AI predicts strong Q1 earnings. Cloud and AI companies expected to beat by 12%.
                    </p>
                    <Badge className="bg-green-100 text-green-800">April 2025</Badge>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Sector Rotation Signal</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Money flow models indicate rotation from growth to value stocks in 2-3 weeks.
                    </p>
                    <Badge className="bg-blue-100 text-blue-800">High Probability</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>AI Risk Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Portfolio Risk Level</div>
                        <div className="text-sm text-muted-foreground">Moderate</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Safe</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Concentration Risk</span>
                      <span className="text-sm font-medium text-orange-600">Medium</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      NVDA represents 34% of portfolio. Consider reducing to below 25%.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Correlation Risk</span>
                      <span className="text-sm font-medium text-green-600">Low</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Good diversification across sectors and asset classes.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Volatility Risk</span>
                      <span className="text-sm font-medium text-yellow-600">Medium</span>
                    </div>
                    <Progress value={55} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Portfolio volatility slightly above target. Consider adding bonds.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alternative Data Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Alternative Data Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Satellite Data Analysis</span>
                      <Badge className="bg-blue-100 text-blue-800">Real-time</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tesla factory activity up 23% vs last month. Production ramping for Model Y refresh.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Supply Chain Tracking</span>
                      <Badge className="bg-red-100 text-red-800">Alert</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AAPL supplier delays detected in Asian ports. Potential Q2 iPhone shipment impact.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Executive Trading Patterns</span>
                      <Badge className="bg-green-100 text-green-800">Bullish</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Insider buying surge at major tech companies. 15 executives purchased shares this week.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Risk Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium text-red-800">High Correlation Detected</div>
                      <div className="text-sm text-red-600">Your tech holdings are moving in lockstep</div>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive">Review</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <div>
                      <div className="font-medium text-yellow-800">Volatility Spike Incoming</div>
                      <div className="text-sm text-yellow-600">Market volatility expected to increase 40%</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Hedge</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <PieChart className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-800">Rebalancing Opportunity</div>
                      <div className="text-sm text-blue-600">Portfolio drift detected, rebalance recommended</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Auto-Rebalance</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}