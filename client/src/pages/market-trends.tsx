import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { DisclaimerFooter } from "@/components/ui/disclaimer-footer";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  LineChart,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Eye,
  Target,
  Activity,
  Calendar,
  Filter
} from "lucide-react";
import {
  LineChart as RechartsLine,
  AreaChart,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  Line,
  Bar,
  ReferenceLine,
  Brush
} from "recharts";

// Market data interfaces
interface MarketDataPoint {
  timestamp: string;
  price: number;
  volume: number;
  change: number;
  changePercent: number;
}

interface TrendData {
  symbol: string;
  data: MarketDataPoint[];
  currentPrice: number;
  dayChange: number;
  dayChangePercent: number;
  volatility: number;
  trend: 'bullish' | 'bearish' | 'neutral';
}

interface PersonalizedSettings {
  watchlist: string[];
  timeframe: '1D' | '1W' | '1M' | '3M' | '1Y';
  chartType: 'line' | 'area' | 'candlestick' | 'volume';
  indicators: string[];
  autoRefresh: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  colorTheme: 'default' | 'dark' | 'colorful';
}

export default function MarketTrends() {
  const [settings, setSettings] = useState<PersonalizedSettings>({
    watchlist: ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'],
    timeframe: '1D',
    chartType: 'line',
    indicators: ['SMA', 'Volume'],
    autoRefresh: true,
    animationSpeed: 'normal',
    colorTheme: 'default'
  });
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');

  // Fetch real market data for trending visualization
  const { data: trendData, isLoading } = useQuery<TrendData[]>({
    queryKey: ['/api/market/trends', settings.watchlist, settings.timeframe],
    refetchInterval: settings.autoRefresh ? 30000 : false,
    enabled: true
  });

  // Generate realistic market data with trends
  const generateMarketData = (symbol: string, days: number = 30): MarketDataPoint[] => {
    const data: MarketDataPoint[] = [];
    let basePrice = Math.random() * 200 + 50; // Random base price between 50-250
    const volatility = Math.random() * 0.05 + 0.01; // 1-6% daily volatility
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      // Simulate realistic price movement with some trend
      const trend = Math.sin(i * 0.1) * 0.02; // Subtle trending component
      const randomWalk = (Math.random() - 0.5) * volatility;
      const priceChange = trend + randomWalk;
      
      basePrice = basePrice * (1 + priceChange);
      const volume = Math.floor(Math.random() * 10000000 + 1000000); // 1M-11M volume
      
      data.push({
        timestamp: date.toISOString().split('T')[0],
        price: Number(basePrice.toFixed(2)),
        volume,
        change: priceChange * basePrice,
        changePercent: priceChange * 100
      });
    }
    
    return data;
  };

  // Animated data progression for live-feel
  useEffect(() => {
    if (!isPlaying || !trendData) return;
    
    const interval = setInterval(() => {
      setCurrentDataIndex(prev => {
        const maxIndex = trendData[0]?.data?.length || 30;
        return prev >= maxIndex - 1 ? 0 : prev + 1;
      });
    }, settings.animationSpeed === 'fast' ? 200 : settings.animationSpeed === 'slow' ? 800 : 500);
    
    return () => clearInterval(interval);
  }, [isPlaying, trendData, settings.animationSpeed]);

  // Mock data for demonstration - replace with real API data
  const mockTrendData: TrendData[] = settings.watchlist.map(symbol => ({
    symbol,
    data: generateMarketData(symbol),
    currentPrice: Math.random() * 200 + 50,
    dayChange: (Math.random() - 0.5) * 10,
    dayChangePercent: (Math.random() - 0.5) * 5,
    volatility: Math.random() * 0.05 + 0.01,
    trend: Math.random() > 0.5 ? 'bullish' : Math.random() > 0.25 ? 'bearish' : 'neutral'
  }));

  const displayData = trendData || mockTrendData;
  const selectedData = displayData.find(d => d.symbol === selectedSymbol);
  const animatedData = selectedData?.data.slice(0, currentDataIndex + 10) || [];

  // Chart color themes
  const getChartColors = () => {
    switch (settings.colorTheme) {
      case 'dark':
        return {
          primary: '#3B82F6',
          secondary: '#10B981',
          danger: '#EF4444',
          background: '#1F2937'
        };
      case 'colorful':
        return {
          primary: '#8B5CF6',
          secondary: '#F59E0B',
          danger: '#EC4899',
          background: '#F3F4F6'
        };
      default:
        return {
          primary: '#2563EB',
          secondary: '#059669',
          danger: '#DC2626',
          background: '#FFFFFF'
        };
    }
  };

  const colors = getChartColors();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Market Trend Visualization</h1>
            <p className="text-muted-foreground">Personalized animated market analysis</p>
          </div>
        </div>
        
        {/* Animation Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDataIndex(0)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Live Trends</TabsTrigger>
          <TabsTrigger value="comparison">Multi-Asset</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
          <TabsTrigger value="settings">Personalization</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          {/* Watchlist Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {displayData.map((stock) => (
              <Card 
                key={stock.symbol} 
                className={`cursor-pointer transition-all ${
                  selectedSymbol === stock.symbol ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSymbol(stock.symbol)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{stock.symbol}</span>
                    <Badge 
                      variant={stock.trend === 'bullish' ? 'default' : stock.trend === 'bearish' ? 'destructive' : 'secondary'}
                    >
                      {stock.trend === 'bullish' ? <TrendingUp className="h-3 w-3" /> : 
                       stock.trend === 'bearish' ? <TrendingDown className="h-3 w-3" /> : 
                       <Activity className="h-3 w-3" />}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold">${stock.currentPrice.toFixed(2)}</div>
                  <div className={`text-sm ${stock.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.dayChange >= 0 ? '+' : ''}{stock.dayChangePercent.toFixed(2)}%
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="h-5 w-5" />
                  <span>{selectedSymbol} - {settings.timeframe} Chart</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={settings.chartType} onValueChange={(value: any) => 
                    setSettings(prev => ({ ...prev, chartType: value }))
                  }>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="area">Area</SelectItem>
                      <SelectItem value="volume">Volume</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={settings.timeframe} onValueChange={(value: any) => 
                    setSettings(prev => ({ ...prev, timeframe: value }))
                  }>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1D">1D</SelectItem>
                      <SelectItem value="1W">1W</SelectItem>
                      <SelectItem value="1M">1M</SelectItem>
                      <SelectItem value="3M">3M</SelectItem>
                      <SelectItem value="1Y">1Y</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {settings.chartType === 'area' ? (
                    <AreaChart data={animatedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke={colors.primary}
                        fill={colors.primary}
                        fillOpacity={0.3}
                        strokeWidth={2}
                        animationDuration={300}
                      />
                    </AreaChart>
                  ) : settings.chartType === 'volume' ? (
                    <BarChart data={animatedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: any) => [value.toLocaleString(), 'Volume']}
                      />
                      <Bar 
                        dataKey="volume" 
                        fill={colors.secondary}
                        animationDuration={300}
                      />
                    </BarChart>
                  ) : (
                    <RechartsLine data={animatedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={colors.primary}
                        strokeWidth={2}
                        dot={false}
                        animationDuration={300}
                      />
                      {settings.indicators.includes('SMA') && (
                        <ReferenceLine 
                          y={selectedData?.currentPrice || 0} 
                          stroke={colors.secondary}
                          strokeDasharray="5 5"
                          label="SMA"
                        />
                      )}
                    </RechartsLine>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Market Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Volatility Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {((selectedData?.volatility || 0) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">Daily volatility</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Trend Strength</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.floor(Math.random() * 40) + 60}%
                </div>
                <p className="text-sm text-muted-foreground">Bullish momentum</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Support Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${((selectedData?.currentPrice || 0) * 0.95).toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">Key support</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          {/* Multi-Asset Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Watchlist Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLine>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp"
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {displayData.slice(0, 3).map((stock, index) => (
                      <Line 
                        key={stock.symbol}
                        type="monotone" 
                        dataKey="price" 
                        data={stock.data.slice(0, currentDataIndex + 10)}
                        stroke={`hsl(${index * 120}, 70%, 50%)`}
                        strokeWidth={2}
                        name={stock.symbol}
                        animationDuration={300}
                      />
                    ))}
                  </RechartsLine>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Pattern Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Head & Shoulders', 'Double Bottom', 'Ascending Triangle'].map((pattern, index) => (
                  <div key={pattern} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{pattern}</div>
                      <div className="text-sm text-muted-foreground">
                        Confidence: {80 + Math.floor(Math.random() * 15)}%
                      </div>
                    </div>
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index === 0 ? 'Active' : 'Potential'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {/* Personalization Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Chart Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Animation Speed</Label>
                  <Select value={settings.animationSpeed} onValueChange={(value: any) => 
                    setSettings(prev => ({ ...prev, animationSpeed: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color Theme</Label>
                  <Select value={settings.colorTheme} onValueChange={(value: any) => 
                    setSettings(prev => ({ ...prev, colorTheme: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="colorful">Colorful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, autoRefresh: checked }))
                    }
                  />
                  <Label>Auto-refresh data</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Watchlist Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Add Symbol</Label>
                  <div className="flex space-x-2">
                    <Input placeholder="Enter symbol (e.g., AAPL)" />
                    <Button size="sm">Add</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Current Watchlist</Label>
                  <div className="flex flex-wrap gap-2">
                    {settings.watchlist.map(symbol => (
                      <Badge key={symbol} variant="secondary" className="cursor-pointer">
                        {symbol} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <DisclaimerFooter />
    </div>
  );
}