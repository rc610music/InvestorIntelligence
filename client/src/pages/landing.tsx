import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Brain, Target, BarChart3, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">StockSense</h1>
          </div>
          <Button 
            onClick={() => window.location.href = '/api/login'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          AI-Powered Investment Intelligence
        </Badge>
        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Smart Investment
          <span className="text-blue-600"> Analytics</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Make smarter investment decisions with real-time market analysis, AI-powered insights, 
          and comprehensive portfolio tracking. Your path to financial growth starts here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
            onClick={() => window.location.href = '/api/login'}
          >
            Get Started Free
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8"
            onClick={() => window.location.href = '/disclaimer'}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose StockSense?
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Brain className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>AI-Powered Analysis</CardTitle>
              <CardDescription>
                Advanced machine learning algorithms analyze market patterns and predict trends with 73%+ accuracy
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Real-Time Data</CardTitle>
              <CardDescription>
                Live market data, news sentiment analysis, and institutional flow tracking for informed decisions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Target className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Portfolio Optimization</CardTitle>
              <CardDescription>
                Automatic rebalancing recommendations, risk assessment, and tax-loss harvesting opportunities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Users className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Social Sentiment</CardTitle>
              <CardDescription>
                Track social media trends, meme stock momentum, and influencer impact on market movements
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Shield className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle>Risk Management</CardTitle>
              <CardDescription>
                Advanced risk metrics, volatility analysis, and early warning systems for portfolio protection
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Educational Resources</CardTitle>
              <CardDescription>
                Comprehensive learning center with guides, tools, and strategies for all skill levels
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">73%+</div>
              <div className="text-gray-600 dark:text-gray-300">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">18.7%</div>
              <div className="text-gray-600 dark:text-gray-300">Average Annual Returns</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">115+</div>
              <div className="text-gray-600 dark:text-gray-300">Analysis Factors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Data Sources</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to Transform Your Investment Strategy?
        </h3>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of investors who use StockSense to make smarter, data-driven investment decisions.
        </p>
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
          onClick={() => window.location.href = '/api/login'}
        >
          Start Your Free Account
        </Button>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          No credit card required • Free educational resources • Real market data
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">StockSense</span>
          </div>
          <p className="text-gray-400 mb-4">
            Educational investment analytics platform. Not financial advice.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="/disclaimer" className="text-gray-400 hover:text-white">
              Disclaimer
            </a>
            <a href="/education" className="text-gray-400 hover:text-white">
              Education
            </a>
            <a href="/api/login" className="text-gray-400 hover:text-white">
              Sign In
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}