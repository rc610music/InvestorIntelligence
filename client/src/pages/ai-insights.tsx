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

// AI Analytics API Types
interface SentimentData {
  fearGreedIndex: {
    value: number;
    status: string;
    lastUpdated: string;
    weeklyChange: number;
  };
  marketSentiment: {
    overall: string;
    confidence: number;
    socialMediaScore: number;
    institutionalFlow: string;
    retailSentiment: number;
  };
  sectorSentiment: Array<{
    sector: string;
    sentiment: string;
    score: number;
    change: number;
  }>;
}

interface PortfolioOptimization {
  riskAssessment: {
    portfolioRisk: string;
    sharpeRatio: number;
    maxDrawdown: number;
    volatility: number;
    beta: number;
  };
  rebalancingRecommendations: Array<{
    action: string;
    asset: string;
    currentWeight: number;
    targetWeight: number;
    reason: string;
  }>;
  taxOptimization: {
    potentialSavings: number;
    harvestingOpportunities: number;
    recommendations: string[];
  };
  performancePrediction: {
    expectedReturn: number;
    confidenceInterval: string;
    timeHorizon: string;
    probability: number;
  };
}

interface PredictiveAnalytics {
  marketPredictions: {
    sp500: {
      current: number;
      predicted30Day: number;
      confidence: number;
      range: { low: number; high: number };
      factors: string[];
    };
    nasdaq: {
      current: number;
      predicted30Day: number;
      confidence: number;
      range: { low: number; high: number };
      factors: string[];
    };
  };
  sectorRotation: Array<{
    sector: string;
    signal: string;
    strength: number;
    timeframe: string;
  }>;
  riskFactors: Array<{
    factor: string;
    probability: number;
    impact: string;
  }>;
  monteCarloResults: {
    simulations: number;
    averageReturn: number;
    successRate: number;
    worstCase: number;
    bestCase: number;
  };
}

export default function AIInsights() {
  const { data: sentimentData, isLoading: sentimentLoading } = useQuery<SentimentData>({
    queryKey: ['/api/ai/sentiment-analysis'],
    enabled: true
  });

  const { data: portfolioAI, isLoading: portfolioLoading } = useQuery<PortfolioOptimization>({
    queryKey: ['/api/ai/portfolio-optimization'],
    enabled: true
  });

  const { data: predictiveAnalytics, isLoading: predictiveLoading } = useQuery<PredictiveAnalytics>({
    queryKey: ['/api/ai/predictive-analytics'],
    enabled: true
  });

  if (sentimentLoading || portfolioLoading || predictiveLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Brain className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">AI Investment Intelligence</h1>
            <p className="text-muted-foreground">Loading advanced AI-powered insights...</p>
          </div>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

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
                    <span className="text-2xl font-bold text-green-600">
                      {sentimentData?.fearGreedIndex?.value ?? 0}
                    </span>
                    <Badge 
                      variant="secondary" 
                      className={`${(sentimentData?.fearGreedIndex?.status === 'Greed') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'}`}
                    >
                      {sentimentData?.fearGreedIndex?.status ?? 'Loading...'}
                    </Badge>
                  </div>
                  <Progress value={sentimentData?.fearGreedIndex?.value ?? 0} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Market sentiment: {sentimentData?.marketSentiment?.overall ?? 'Loading...'} 
                    ({sentimentData?.marketSentiment?.confidence ?? 0}% confidence)
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
                      <span>Social Media Score</span>
                      <span className="text-green-600">{sentimentData?.marketSentiment?.socialMediaScore ?? 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Retail Sentiment</span>
                      <span className="text-blue-600">{sentimentData?.marketSentiment?.retailSentiment ?? 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Institutional Flow</span>
                      <Badge variant="outline" className="text-xs">
                        {sentimentData?.marketSentiment?.institutionalFlow ?? 'Loading...'}
                      </Badge>
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

          {/* Sector Sentiment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Sector Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentimentData?.sectorSentiment?.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{sector.sector}</div>
                      <div className="text-sm text-muted-foreground">
                        Score: {sector.score} ({sector.change > 0 ? '+' : ''}{sector.change}%)
                      </div>
                    </div>
                    <Badge 
                      className={
                        sector.sentiment === 'Bullish' ? 'bg-green-100 text-green-800' :
                        sector.sentiment === 'Bearish' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {sector.sentiment}
                    </Badge>
                  </div>
                )) ?? (
                  <div className="text-center py-4 text-muted-foreground">
                    Loading sector sentiment data...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Portfolio Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>AI Portfolio Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {portfolioAI?.riskAssessment?.sharpeRatio ?? 0}
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {portfolioAI?.riskAssessment?.portfolioRisk ?? 'Loading...'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sharpe Ratio</span>
                        <span>{portfolioAI?.riskAssessment?.sharpeRatio ?? 0}</span>
                      </div>
                      <Progress value={(portfolioAI?.riskAssessment?.sharpeRatio ?? 0) * 50} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Max Drawdown</span>
                        <span>{portfolioAI?.riskAssessment?.maxDrawdown ?? 0}%</span>
                      </div>
                      <Progress value={Math.abs(portfolioAI?.riskAssessment?.maxDrawdown ?? 0) * 5} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Volatility</span>
                        <span>{portfolioAI?.riskAssessment?.volatility ?? 0}%</span>
                      </div>
                      <Progress value={(portfolioAI?.riskAssessment?.volatility ?? 0) * 3} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Beta</span>
                        <span>{portfolioAI?.riskAssessment?.beta ?? 0}</span>
                      </div>
                      <Progress value={(portfolioAI?.riskAssessment?.beta ?? 0) * 80} className="h-2" />
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
                  {portfolioAI?.rebalancingRecommendations?.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {rec.action === 'Reduce' ? 
                            <TrendingDown className="h-4 w-4 text-red-600" /> :
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          }
                          <span className="font-medium">{rec.action} {rec.asset}</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">AI Suggested</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {rec.currentWeight}% → {rec.targetWeight}%: {rec.reason}
                      </p>
                      <Button size="sm" className="w-full">Implement Rebalance</Button>
                    </div>
                  )) ?? (
                    <div className="text-center py-4 text-muted-foreground">
                      Loading AI recommendations...
                    </div>
                  )}

                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Optimization Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AI Tax Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      ${portfolioAI?.taxOptimization?.potentialSavings ?? 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Potential Tax Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {portfolioAI?.taxOptimization?.harvestingOpportunities ?? 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Harvesting Opportunities</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">AI Recommendations:</h4>
                  {portfolioAI?.taxOptimization?.recommendations?.map((rec, index) => (
                    <div key={index} className="text-sm p-3 bg-gray-50 rounded-lg">
                      {rec}
                    </div>
                  )) ?? (
                    <div className="text-sm text-muted-foreground">Loading tax optimization...</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Prediction */}
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-600">
                    {portfolioAI?.performancePrediction?.expectedReturn ?? 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Expected Return</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-600">
                    {portfolioAI?.performancePrediction?.probability ?? 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium text-purple-600">
                    {portfolioAI?.performancePrediction?.confidenceInterval ?? 'Loading...'}
                  </div>
                  <div className="text-sm text-muted-foreground">Range</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium text-orange-600">
                    {portfolioAI?.performancePrediction?.timeHorizon ?? 'Loading...'}
                  </div>
                  <div className="text-sm text-muted-foreground">Time Horizon</div>
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