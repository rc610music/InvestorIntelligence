import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  MessageCircle,
  Users,
  Eye,
  Flame,
  Target,
  Clock,
  Activity,
  AlertTriangle,
  Heart,
  Share,
  ThumbsUp,
  BarChart3
} from "lucide-react";

export default function SocialSentiment() {
  const { data: trendingStocks } = useQuery({
    queryKey: ['/api/social/trending-stocks'],
    enabled: true
  });

  const { data: memeStockTracker } = useQuery({
    queryKey: ['/api/social/meme-stocks'],
    enabled: true
  });

  const { data: influencerSentiment } = useQuery({
    queryKey: ['/api/social/influencer-sentiment'],
    enabled: true
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Social Sentiment Intelligence</h1>
          <p className="text-muted-foreground">Real-time social media sentiment analysis and meme stock tracking</p>
        </div>
      </div>

      <Tabs defaultValue="trending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="meme">Meme Stocks</TabsTrigger>
          <TabsTrigger value="influencers">Influencers</TabsTrigger>
          <TabsTrigger value="alerts">Smart Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          {/* Social Media Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reddit Mentions</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47.2K</div>
                <p className="text-xs text-muted-foreground">
                  +23% vs yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Twitter Volume</CardTitle>
                <Share className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">189K</div>
                <p className="text-xs text-muted-foreground">
                  +45% vs yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Discord Activity</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.8K</div>
                <p className="text-xs text-muted-foreground">
                  +67% vs yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+72</div>
                <p className="text-xs text-muted-foreground">
                  Very bullish
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trending Stocks */}
          <Card>
            <CardHeader>
              <CardTitle>Trending Stocks on Social Media</CardTitle>
              <p className="text-sm text-muted-foreground">Most mentioned stocks across platforms</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Flame className="h-5 w-5 text-red-500" />
                      <span className="text-2xl font-bold">#1</span>
                    </div>
                    <div>
                      <div className="font-medium text-lg">NVDA</div>
                      <div className="text-sm text-muted-foreground">127,340 mentions</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-green-100 text-green-800">+89% Bullish</Badge>
                    <div className="text-sm text-green-600">+12.4% momentum</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                      <span className="text-2xl font-bold">#2</span>
                    </div>
                    <div>
                      <div className="font-medium text-lg">TSLA</div>
                      <div className="text-sm text-muted-foreground">89,256 mentions</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-red-100 text-red-800">-34% Bearish</Badge>
                    <div className="text-sm text-red-600">-8.7% momentum</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-blue-500" />
                      <span className="text-2xl font-bold">#3</span>
                    </div>
                    <div>
                      <div className="font-medium text-lg">AAPL</div>
                      <div className="text-sm text-muted-foreground">67,891 mentions</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-green-100 text-green-800">+67% Bullish</Badge>
                    <div className="text-sm text-green-600">+5.2% momentum</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-purple-500" />
                      <span className="text-2xl font-bold">#4</span>
                    </div>
                    <div>
                      <div className="font-medium text-lg">AMC</div>
                      <div className="text-sm text-muted-foreground">45,672 mentions</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-green-100 text-green-800">+78% Bullish</Badge>
                    <div className="text-sm text-green-600">+45.3% momentum</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Social Sentiment Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <div className="p-3 bg-green-100 rounded-lg text-center">
                  <div className="font-medium text-green-800">NVDA</div>
                  <div className="text-xs text-green-600">+89%</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <div className="font-medium text-green-700">AAPL</div>
                  <div className="text-xs text-green-500">+67%</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg text-center">
                  <div className="font-medium text-yellow-700">MSFT</div>
                  <div className="text-xs text-yellow-600">+23%</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <div className="font-medium text-red-700">TSLA</div>
                  <div className="text-xs text-red-600">-34%</div>
                </div>
                <div className="p-3 bg-green-100 rounded-lg text-center">
                  <div className="font-medium text-green-800">AMC</div>
                  <div className="text-xs text-green-600">+78%</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <div className="font-medium text-green-700">GME</div>
                  <div className="text-xs text-green-500">+56%</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg text-center">
                  <div className="font-medium text-yellow-700">PLTR</div>
                  <div className="text-xs text-yellow-600">+12%</div>
                </div>
                <div className="p-3 bg-red-100 rounded-lg text-center">
                  <div className="font-medium text-red-800">BABA</div>
                  <div className="text-xs text-red-600">-67%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meme" className="space-y-4">
          {/* Meme Stock Index */}
          <Card>
            <CardHeader>
              <CardTitle>Meme Stock Momentum Index</CardTitle>
              <p className="text-sm text-muted-foreground">Tracking retail investor favorites</p>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">847</div>
                <Badge className="bg-green-100 text-green-800">Extreme Bullishness</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Index above 800 indicates retail FOMO conditions
                </p>
              </div>
              <Progress value={84} className="h-3" />
            </CardContent>
          </Card>

          {/* Meme Stock Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Meme Stock Movers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Flame className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">AMC</div>
                        <div className="text-sm text-muted-foreground">Theatre Chain</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+47.3%</div>
                      <div className="text-sm text-muted-foreground">24h</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">GME</div>
                        <div className="text-sm text-muted-foreground">Gaming Retailer</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+23.7%</div>
                      <div className="text-sm text-muted-foreground">24h</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">BB</div>
                        <div className="text-sm text-muted-foreground">BlackBerry</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+18.9%</div>
                      <div className="text-sm text-muted-foreground">24h</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retail Sentiment Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Reddit WallStreetBets Activity</span>
                      <span className="font-medium">Extreme</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Options Call/Put Ratio</span>
                      <span className="font-medium">Bullish</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Social Media Hype Score</span>
                      <span className="font-medium">Very High</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Retail Order Flow</span>
                      <span className="font-medium">Heavy Buying</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Meme Stock Risk Warning */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-orange-800">Meme Stock Risk Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-orange-800">
                <p className="text-sm">
                  Current meme stock index at extreme levels. Historical analysis shows:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• 87% probability of 20%+ correction within 30 days</li>
                  <li>• Average drawdown duration: 45 days</li>
                  <li>• Recommended position sizing: &lt;5% of portfolio</li>
                </ul>
                <Button size="sm" variant="outline" className="border-orange-600 text-orange-600">
                  View Full Risk Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="influencers" className="space-y-4">
          {/* Top Financial Influencers */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Influencer Sentiment</CardTitle>
              <p className="text-sm text-muted-foreground">Tracking market-moving personalities</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">@ElonMusk</div>
                      <div className="text-sm text-muted-foreground">143M followers</div>
                      <div className="text-xs text-green-600">Last tweet: Bullish on TSLA</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">+23% Impact</Badge>
                    <div className="text-sm text-muted-foreground mt-1">2h ago</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">@CathieDWood</div>
                      <div className="text-sm text-muted-foreground">1.2M followers</div>
                      <div className="text-xs text-blue-600">Last tweet: AI revolution incoming</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800">+15% Impact</Badge>
                    <div className="text-sm text-muted-foreground mt-1">4h ago</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">@DeepFValue</div>
                      <div className="text-sm text-muted-foreground">890K followers</div>
                      <div className="text-xs text-green-600">Last post: Diamond hands GME</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">+67% Impact</Badge>
                    <div className="text-sm text-muted-foreground mt-1">1d ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Influencer Impact Tracker */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tweet Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Elon Musk on DOGE</span>
                      <Badge className="bg-red-100 text-red-800">High Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Much wow, such currency" - DOGE +47% in 1 hour
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>143K retweets</span>
                      <span className="text-green-600">+47% price impact</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Cathie Wood on AI</span>
                      <Badge className="bg-blue-100 text-blue-800">Medium Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "AI will transform everything" - ARKK +3.2%
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>45K retweets</span>
                      <span className="text-green-600">+3.2% price impact</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Influencer Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accuracy Rate</span>
                    <span className="text-sm font-medium">67.3%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Impact</span>
                    <span className="text-sm font-medium">+12.4%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Follower Engagement</span>
                    <span className="text-sm font-medium">8.9%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {/* Smart Alert System */}
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Social Alerts</CardTitle>
              <p className="text-sm text-muted-foreground">Get notified before the crowd</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-800">Momentum Building</div>
                      <div className="text-sm text-green-600">PLTR mentions up 340% in last hour</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600">Act Now</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-800">Whale Activity</div>
                      <div className="text-sm text-blue-600">Large options flow detected in NVDA</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Monitor</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="font-medium text-orange-800">Sentiment Reversal</div>
                      <div className="text-sm text-orange-600">TSLA sentiment flipped from +67% to -23%</div>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive">Review</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mention Volume Spikes</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sentiment Reversals</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Influencer Activity</span>
                    <Badge className="bg-blue-100 text-blue-800">Monitoring</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Meme Stock Momentum</span>
                    <Badge className="bg-red-100 text-red-800">Disabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>NVDA momentum alert</span>
                    <span className="text-muted-foreground">2h ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AMC sentiment spike</span>
                    <span className="text-muted-foreground">4h ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Elon tweet alert</span>
                    <span className="text-muted-foreground">6h ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GME whale activity</span>
                    <span className="text-muted-foreground">1d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}