import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { 
  TrendingUp, 
  TrendingDown, 
  Brain,
  Eye,
  Activity,
  Target,
  AlertTriangle,
  DollarSign,
  Users,
  MessageCircle,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Flame,
  Globe,
  TrendingDownIcon
} from "lucide-react";

export default function MarketIntelligence() {
  const { data: marketOverview } = useQuery({
    queryKey: ['/api/market/intelligence-overview'],
    enabled: true
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Globe className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Market Intelligence Command Center</h1>
            <p className="text-muted-foreground">Real-time market insights powered by advanced AI analytics</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800 px-3 py-1">
          <Activity className="h-4 w-4 mr-1" />
          Live
        </Badge>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Market Sentiment</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Bullish</div>
            <p className="text-xs text-muted-foreground">Fear & Greed: 72</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Options Flow</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$2.4B</div>
            <p className="text-xs text-muted-foreground">Daily volume</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Social Buzz</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">189K</div>
            <p className="text-xs text-muted-foreground">Mentions today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">AI Confidence</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">Prediction accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Whale Activity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">47</div>
            <p className="text-xs text-muted-foreground">Large trades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Risk Level</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <p className="text-xs text-muted-foreground">VIX: 18.2</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Smart Alerts</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="flows">Money Flows</TabsTrigger>
          <TabsTrigger value="social">Social Intel</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Top Market Movers with AI Insights */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI-Enhanced Market Movers</CardTitle>
                <Link href="/screener">
                  <Button variant="outline" size="sm">View Full Screener</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-lg">NVDA</div>
                        <div className="text-sm text-muted-foreground">AI momentum strong</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">+8.7%</div>
                      <div className="text-sm text-muted-foreground">$875.30</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-green-100 text-green-800">AI Score: 94</Badge>
                    <div className="text-xs text-green-600">Strong Buy Signal</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-lg">AAPL</div>
                        <div className="text-sm text-muted-foreground">iPhone cycle positive</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">+3.2%</div>
                      <div className="text-sm text-muted-foreground">$172.50</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-blue-100 text-blue-800">AI Score: 78</Badge>
                    <div className="text-xs text-blue-600">Moderate Buy</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-medium text-lg">TSLA</div>
                        <div className="text-sm text-muted-foreground">Delivery concerns</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">-4.8%</div>
                      <div className="text-sm text-muted-foreground">$248.50</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-red-100 text-red-800">AI Score: 34</Badge>
                    <div className="text-xs text-red-600">Caution Advised</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Action Center */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get advanced AI-powered market analysis and portfolio optimization.
                </p>
                <Link href="/ai-insights">
                  <Button className="w-full">Explore AI Insights</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Options Flow</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Track institutional money flows and whale activity in options markets.
                </p>
                <Link href="/options-flow">
                  <Button variant="outline" className="w-full">View Flow Data</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Social Sentiment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor social media sentiment and meme stock momentum indicators.
                </p>
                <Link href="/social-sentiment">
                  <Button variant="outline" className="w-full">Check Sentiment</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {/* Critical Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Critical Market Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium text-red-800">Unusual Options Activity</div>
                      <div className="text-sm text-red-600">NVDA put volume 800% above average</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">High Priority</Badge>
                    <div className="text-sm text-muted-foreground mt-1">5 min ago</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="font-medium text-orange-800">Meme Stock Surge</div>
                      <div className="text-sm text-orange-600">AMC social mentions up 340% in 1 hour</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
                    <div className="text-sm text-muted-foreground mt-1">12 min ago</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-800">Whale Movement</div>
                      <div className="text-sm text-blue-600">$47M AAPL call sweep detected</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800">Watch</Badge>
                    <div className="text-sm text-muted-foreground mt-1">18 min ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Alert Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Portfolio Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Position size changes over 10%</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Correlation spikes above 0.8</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Volatility increases above 25%</span>
                      <Badge className="bg-blue-100 text-blue-800">Monitoring</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Market Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Unusual options flow</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Social sentiment spikes</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Earnings surprises</span>
                      <Badge className="bg-blue-100 text-blue-800">Monitoring</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          {/* AI Predictions Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Market Predictions</CardTitle>
                <Link href="/value-predictor">
                  <Button variant="outline" size="sm">Advanced Predictor</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">AAPL - 30 Day</span>
                    <Badge className="bg-green-100 text-green-800">86% Confidence</Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">$185.20</div>
                  <div className="text-sm text-muted-foreground">+7.4% upside target</div>
                  <Progress value={74} className="h-2 mt-2" />
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">NVDA - 30 Day</span>
                    <Badge className="bg-yellow-100 text-yellow-800">72% Confidence</Badge>
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-1">$820.15</div>
                  <div className="text-sm text-muted-foreground">-6.3% downside risk</div>
                  <Progress value={37} className="h-2 mt-2" />
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">MSFT - 30 Day</span>
                    <Badge className="bg-green-100 text-green-800">91% Confidence</Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">$438.90</div>
                  <div className="text-sm text-muted-foreground">+5.7% upside target</div>
                  <Progress value={57} className="h-2 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Scenario Probabilities */}
          <Card>
            <CardHeader>
              <CardTitle>Market Scenario Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bull Market Continuation</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-3" />
                  <p className="text-xs text-muted-foreground">Fed cuts rates, AI boom accelerates</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sideways Consolidation</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-3" />
                  <p className="text-xs text-muted-foreground">Range-bound trading, mixed signals</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Market Correction</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-3" />
                  <p className="text-xs text-muted-foreground">Geopolitical tensions, economic slowdown</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flows" className="space-y-4">
          {/* Money Flow Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Institutional Money Flows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">Inflows</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Technology Sector</span>
                      <span className="text-green-600 font-bold">+$2.1B</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Healthcare</span>
                      <span className="text-green-600 font-bold">+$890M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Consumer Discretionary</span>
                      <span className="text-green-600 font-bold">+$560M</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-red-600">Outflows</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Real Estate</span>
                      <span className="text-red-600 font-bold">-$1.2B</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Utilities</span>
                      <span className="text-red-600 font-bold">-$670M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Energy</span>
                      <span className="text-red-600 font-bold">-$430M</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dark Pool Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Dark Pool Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-purple-600">72</div>
                    <div className="text-sm text-muted-foreground">Dark Pool Index</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600">$847M</div>
                    <div className="text-sm text-muted-foreground">Block Volume</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">+23%</div>
                    <div className="text-sm text-muted-foreground">vs Yesterday</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">NVDA</div>
                      <div className="text-sm text-muted-foreground">Large block accumulation</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Bullish</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">AAPL</div>
                      <div className="text-sm text-muted-foreground">Institutional buying interest</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Neutral</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">TSLA</div>
                      <div className="text-sm text-muted-foreground">Distribution pattern detected</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Bearish</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          {/* Social Media Intelligence */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Trending Stocks</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Flame className="h-4 w-4 text-red-500" />
                        <span className="font-medium">NVDA</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">127K mentions</div>
                        <Badge className="bg-green-100 text-green-800">+89% Bullish</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">TSLA</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">89K mentions</div>
                        <Badge className="bg-red-100 text-red-800">-34% Bearish</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">AAPL</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">68K mentions</div>
                        <Badge className="bg-green-100 text-green-800">+67% Bullish</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Influencer Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">@ElonMusk</div>
                        <div className="text-sm text-muted-foreground">Bullish on TSLA - 2h ago</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+23% Impact</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">@CathieDWood</div>
                        <div className="text-sm text-muted-foreground">AI revolution - 4h ago</div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">+15% Impact</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">@DeepFValue</div>
                        <div className="text-sm text-muted-foreground">Diamond hands GME - 1d ago</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+67% Impact</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meme Stock Monitor */}
          <Card>
            <CardHeader>
              <CardTitle>Meme Stock Momentum Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-orange-600 mb-2">847</div>
                <Badge className="bg-orange-100 text-orange-800">Extreme Activity</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Index above 800 indicates retail FOMO conditions
                </p>
              </div>
              <Progress value={84} className="h-3 mb-4" />

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="text-lg font-bold text-green-600">AMC</div>
                  <div className="text-sm text-green-600">+47.3%</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-bold text-green-600">GME</div>
                  <div className="text-sm text-green-600">+23.7%</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-bold text-green-600">BB</div>
                  <div className="text-sm text-green-600">+18.9%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}