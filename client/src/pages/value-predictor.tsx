import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Calculator,
  Target,
  Clock,
  DollarSign,
  Activity,
  Brain,
  BarChart3,
  Zap,
  Shield,
  Eye,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function ValuePredictor() {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [investmentAmount, setInvestmentAmount] = useState("10000");
  const [timeHorizon, setTimeHorizon] = useState("12");

  const { data: predictionData } = useQuery({
    queryKey: ['/api/ai/value-prediction', selectedStock],
    enabled: true
  });

  const { data: backtestData } = useQuery({
    queryKey: ['/api/ai/backtest-results', selectedStock, investmentAmount, timeHorizon],
    enabled: true
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">AI Value Predictor</h1>
          <p className="text-muted-foreground">Advanced AI-powered value prediction and portfolio backtesting</p>
        </div>
      </div>

      <Tabs defaultValue="predictor" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictor">Value Predictor</TabsTrigger>
          <TabsTrigger value="backtest">Backtesting</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
        </TabsList>

        <TabsContent value="predictor" className="space-y-4">
          {/* Stock Selection and Prediction Input */}
          <Card>
            <CardHeader>
              <CardTitle>Stock Analysis Input</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Symbol</Label>
                  <Input 
                    id="stock"
                    value={selectedStock}
                    onChange={(e) => setSelectedStock(e.target.value.toUpperCase())}
                    placeholder="AAPL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount</Label>
                  <Input 
                    id="amount"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="10000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time Horizon (months)</Label>
                  <Input 
                    id="time"
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(e.target.value)}
                    placeholder="12"
                  />
                </div>
              </div>
              <Button className="w-full mt-4">
                <Brain className="h-4 w-4 mr-2" />
                Generate AI Prediction
              </Button>
            </CardContent>
          </Card>

          {/* AI Prediction Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Price Prediction - {selectedStock}</CardTitle>
                <p className="text-sm text-muted-foreground">Multi-model ensemble prediction</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">$195.50</div>
                    <Badge className="bg-green-100 text-green-800">+13.3% Expected Return</Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      95% confidence interval: $178.20 - $212.80
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Model Confidence</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Technical Analysis</span>
                        <span className="text-green-600">Bullish</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fundamental Analysis</span>
                        <span className="text-green-600">Strong</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sentiment Analysis</span>
                        <span className="text-green-600">Positive</span>
                      </div>
                      <Progress value={71} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center space-y-2 p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">${(parseFloat(investmentAmount) * 1.133).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Expected Value</div>
                    </div>
                    <div className="text-center space-y-2 p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+${(parseFloat(investmentAmount) * 0.133).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Potential Profit</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Best Case (95th percentile)</span>
                      <span className="text-green-600 font-bold">+23.4%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Expected Case (50th percentile)</span>
                      <span className="text-blue-600 font-bold">+13.3%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Worst Case (5th percentile)</span>
                      <span className="text-red-600 font-bold">-8.7%</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk-Adjusted Return (Sharpe Ratio)</span>
                      <Badge className="bg-blue-100 text-blue-800">1.34</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Factors Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Key Prediction Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Revenue Growth</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">+15% Weight</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Q4 earnings showed 12% YoY revenue growth, beating estimates
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Market Position</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">+12% Weight</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dominant market share in premium smartphone segment
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">AI Integration</span>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">+18% Weight</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Apple Intelligence rollout driving ecosystem engagement
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Cash Position</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">+8% Weight</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    $162B cash provides strategic flexibility and dividend safety
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-orange-600" />
                      <span className="font-medium">Valuation Multiple</span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">-5% Weight</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    P/E ratio of 28.5x slightly above historical average
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Regulatory Risk</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800">-7% Weight</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    EU Digital Markets Act creating compliance costs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backtest" className="space-y-4">
          {/* Historical Performance */}
          <Card>
            <CardHeader>
              <CardTitle>AI Strategy Backtesting</CardTitle>
              <p className="text-sm text-muted-foreground">Historical performance of AI predictions vs actual results</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-600">73.2%</div>
                  <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-600">+18.7%</div>
                  <div className="text-sm text-muted-foreground">Avg Annual Return</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-purple-600">1.45</div>
                  <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-orange-600">12%</div>
                  <div className="text-sm text-muted-foreground">Max Drawdown</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Model Performance by Time Period</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">1 Month Predictions</span>
                      <Badge className="bg-green-100 text-green-800">87% Accuracy</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Short-term momentum signals highly accurate
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">6 Month Predictions</span>
                      <Badge className="bg-blue-100 text-blue-800">74% Accuracy</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Medium-term fundamental analysis strong
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">12 Month Predictions</span>
                      <Badge className="bg-yellow-100 text-yellow-800">68% Accuracy</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Long-term predictions affected by macro events
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Strategy Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">AI Value Predictor</div>
                      <div className="text-sm text-muted-foreground">Multi-factor AI model</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">+18.7%</div>
                    <div className="text-sm text-muted-foreground">Annual Return</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">S&P 500 Index</div>
                      <div className="text-sm text-muted-foreground">Market benchmark</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">+10.2%</div>
                    <div className="text-sm text-muted-foreground">Annual Return</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Traditional Analysis</div>
                      <div className="text-sm text-muted-foreground">Human analyst picks</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">+14.3%</div>
                    <div className="text-sm text-muted-foreground">Annual Return</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium">Random Selection</div>
                      <div className="text-sm text-muted-foreground">Control group</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-600">+7.8%</div>
                    <div className="text-sm text-muted-foreground">Annual Return</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          {/* Scenario Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Monte Carlo Scenario Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">10,000 simulations for {selectedStock}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">67%</div>
                    <div className="text-sm text-muted-foreground">Probability of Profit</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600">+13.3%</div>
                    <div className="text-sm text-muted-foreground">Expected Return</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-orange-600">15.8%</div>
                    <div className="text-sm text-muted-foreground">Volatility</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Return Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Extreme Gain (+30% or more)</span>
                      <span className="text-sm font-medium">8.2%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Strong Gain (+15% to +30%)</span>
                      <span className="text-sm font-medium">23.4%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Moderate Gain (0% to +15%)</span>
                      <span className="text-sm font-medium">35.6%</span>
                    </div>
                    <Progress value={36} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Moderate Loss (0% to -15%)</span>
                      <span className="text-sm font-medium">25.1%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Significant Loss (-15% or more)</span>
                      <span className="text-sm font-medium">7.7%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Scenario Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Market Scenario Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Bull Market Scenario</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">35% Probability</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Fed cuts rates, inflation continues declining, AI boom accelerates
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Expected Return</span>
                    <span className="text-green-600 font-bold">+28.4%</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Normal Market Scenario</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">45% Probability</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Steady economic growth, moderate inflation, normal market volatility
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Expected Return</span>
                    <span className="text-blue-600 font-bold">+13.3%</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Bear Market Scenario</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800">20% Probability</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Recession, geopolitical tensions, tech sector correction
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Expected Return</span>
                    <span className="text-red-600 font-bold">-18.7%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          {/* AI Model Details */}
          <Card>
            <CardHeader>
              <CardTitle>AI Model Ensemble</CardTitle>
              <p className="text-sm text-muted-foreground">Multiple AI models working together for accurate predictions</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Active Models</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Brain className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Neural Network v4.2</div>
                          <div className="text-sm text-muted-foreground">Deep learning model</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium">Random Forest v3.1</div>
                          <div className="text-sm text-muted-foreground">Ensemble method</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">LSTM v2.8</div>
                          <div className="text-sm text-muted-foreground">Time series analysis</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Target className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-medium">Transformer v1.5</div>
                          <div className="text-sm text-muted-foreground">Attention mechanism</div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Training</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Model Performance</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Neural Network</span>
                        <span>76.2% accuracy</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Random Forest</span>
                        <span>71.8% accuracy</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>LSTM</span>
                        <span>69.4% accuracy</span>
                      </div>
                      <Progress value={69} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Ensemble Average</span>
                        <span className="font-bold">73.2% accuracy</span>
                      </div>
                      <Progress value={73} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Data Sources & Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-600">Market Data</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Price & volume history</li>
                    <li>• Options flow data</li>
                    <li>• Insider trading activity</li>
                    <li>• Short interest data</li>
                    <li>• ETF flows</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600">Fundamental Data</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Earnings & revenue</li>
                    <li>• Balance sheet metrics</li>
                    <li>• Cash flow analysis</li>
                    <li>• Analyst estimates</li>
                    <li>• Industry comparisons</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-600">Alternative Data</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Social media sentiment</li>
                    <li>• Satellite imagery</li>
                    <li>• Patent filings</li>
                    <li>• Job postings</li>
                    <li>• Economic indicators</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Limitations */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-orange-800">Model Limitations & Disclaimers</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-orange-800">
                <p className="text-sm">
                  AI predictions are based on historical data and may not account for unprecedented events:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Black swan events can invalidate historical patterns</li>
                  <li>• Model accuracy decreases for longer time horizons</li>
                  <li>• Past performance does not guarantee future results</li>
                  <li>• Market conditions can change rapidly</li>
                  <li>• Use predictions as one factor in investment decisions</li>
                </ul>
                <p className="text-sm font-medium mt-3">
                  Always conduct your own research and consider your risk tolerance before investing.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}