import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Brain, TrendingUp, Shield, Zap, Star, Users, Target, Sparkles } from "lucide-react";
import stockSenseIcon from "@assets/20250429_1104_Graphene Stock Tracker Icon_remix_01jt116mh7ek9sdtcr41gyfxeb_1751837863498.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={stockSenseIcon} alt="StockSense" className="w-8 h-8" />
            <span className="text-xl font-bold">StockSense</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/app" className="text-neutral hover:text-primary">
              Try Free App
            </a>
            <Button asChild>
              <a href="/app">Get Started</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-4 h-4 mr-1" />
            AI-Powered Investment Intelligence
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Make Smarter Investment Decisions with StockSense
          </h1>
          <p className="text-xl text-neutral mb-8 leading-relaxed">
            Advanced AI analytics, real-time market intelligence, and institutional-grade insights 
            that help you outperform the market. Join thousands of investors achieving superior returns.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <Button size="lg" className="px-8" asChild>
              <a href="/app">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Watch Demo
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-8 text-sm text-neutral">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>50K+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>18.7% Avg Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose StockSense?</h2>
            <p className="text-xl text-neutral max-w-2xl mx-auto">
              Professional-grade tools and AI insights that were previously only available to institutional investors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>AI Investment Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral mb-4">
                  4+ AI models working together for 73%+ prediction accuracy. Neural networks, LSTM, and transformers analyze 115+ factors.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <span>Multi-model ensemble predictions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <span>Real-time sentiment analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <span>Portfolio optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Target className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Whale Activity Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral mb-4">
                  Monitor institutional trades over $1M, dark pool activity, and smart money flows before they move markets.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    <span>Real-time whale trade alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    <span>Dark pool flow analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    <span>Unusual options activity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Zap className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Social Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral mb-4">
                  Track meme stock momentum, influencer impact, and viral trends across Reddit, Twitter, and Discord.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    <span>Multi-platform sentiment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    <span>Viral stock detection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    <span>Influencer impact scoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Proven Results</h2>
            <p className="text-xl text-neutral max-w-2xl mx-auto">
              Historical performance data shows consistent outperformance vs traditional investment approaches
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">18.7%</div>
              <div className="text-sm text-neutral">Average Annual Returns</div>
              <div className="text-xs text-neutral mt-1">vs 10.2% S&P 500</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">73%</div>
              <div className="text-sm text-neutral">Prediction Accuracy</div>
              <div className="text-xs text-neutral mt-1">vs 45-55% industry avg</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">87%</div>
              <div className="text-sm text-neutral">Major Drawdowns Avoided</div>
              <div className="text-xs text-neutral mt-1">Advanced alert system</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">1.45</div>
              <div className="text-sm text-neutral">Sharpe Ratio</div>
              <div className="text-xs text-neutral mt-1">vs 0.85 market avg</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-neutral max-w-2xl mx-auto">
              Start free, upgrade when you're ready to connect your live portfolio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Free Access</CardTitle>
                <div className="text-3xl font-bold">$0</div>
                <p className="text-neutral">Perfect for getting started</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Full app access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>All AI analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Manual portfolio tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Educational resources</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/app">Start Free</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle>Pro Connect</CardTitle>
                <div className="text-3xl font-bold">$29<span className="text-lg font-normal">/mo</span></div>
                <p className="text-neutral">Live portfolio integration</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Live brokerage sync</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Auto position tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Saved preferences</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full">Start Pro Trial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">Custom</div>
                <p className="text-neutral">For teams and institutions</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Multi-user management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Outperform the Market?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of investors using AI-powered insights to make smarter decisions and achieve superior returns.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <a href="/app">
                Try StockSense Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={stockSenseIcon} alt="StockSense" className="w-6 h-6" />
              <span className="font-semibold">StockSense</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 StockSense. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}