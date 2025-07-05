import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Play, ExternalLink, FileText, Video } from "lucide-react";

export default function Education() {
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['/api/education/resources'],
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'ebook':
        return <BookOpen className="w-5 h-5" />;
      case 'guide':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'ebook':
        return 'bg-green-100 text-green-800';
      case 'guide':
        return 'bg-purple-100 text-purple-800';
      case 'toolkit':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div>Loading educational resources...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Investment Education</h1>
        <p className="text-neutral">Comprehensive guides and resources to improve your investment skills</p>
      </div>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">1. Set Your Goals</h3>
              <p className="text-sm text-neutral mb-3">Define your investment objectives, risk tolerance, and time horizon.</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">2. Build Your Portfolio</h3>
              <p className="text-sm text-neutral mb-3">Learn about diversification and asset allocation strategies.</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">3. Monitor & Adjust</h3>
              <p className="text-sm text-neutral mb-3">Track performance and rebalance your portfolio regularly.</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Resources */}
      <div className="grid gap-6">
        {(resources as any[]).map((resource: any) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {getIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{resource.title}</h3>
                      <Badge className={`text-xs ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-neutral mb-3">{resource.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-neutral">
                      <span>Category: {resource.category}</span>
                      {resource.downloadable && (
                        <span className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          Downloadable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {resource.downloadable ? (
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  ) : (
                    <Button size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Analysis Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Market Analysis Fundamentals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Technical Analysis</h4>
              <ul className="space-y-2 text-sm text-neutral">
                <li>• Chart patterns and trend analysis</li>
                <li>• Moving averages and momentum indicators</li>
                <li>• Support and resistance levels</li>
                <li>• Volume analysis and confirmation signals</li>
                <li>• Candlestick patterns and interpretation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Fundamental Analysis</h4>
              <ul className="space-y-2 text-sm text-neutral">
                <li>• Financial statement analysis</li>
                <li>• Valuation metrics (P/E, P/B, PEG)</li>
                <li>• Industry and sector comparison</li>
                <li>• Economic indicators impact</li>
                <li>• Management quality assessment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Management */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Management Essentials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium mb-2 text-red-800">Position Sizing</h4>
              <p className="text-sm text-red-700">Never risk more than 1-2% of your portfolio on a single trade.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium mb-2 text-yellow-800">Diversification</h4>
              <p className="text-sm text-yellow-700">Spread risk across different sectors, asset classes, and geographies.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2 text-green-800">Stop Losses</h4>
              <p className="text-sm text-green-700">Set predetermined exit points to limit potential losses.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Terminology */}
      <Card>
        <CardHeader>
          <CardTitle>Common Investment Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 border rounded">
              <h5 className="font-medium text-sm">Bull Market</h5>
              <p className="text-xs text-neutral">Extended period of rising stock prices</p>
            </div>
            <div className="p-3 border rounded">
              <h5 className="font-medium text-sm">Bear Market</h5>
              <p className="text-xs text-neutral">Extended period of declining stock prices</p>
            </div>
            <div className="p-3 border rounded">
              <h5 className="font-medium text-sm">Volatility</h5>
              <p className="text-xs text-neutral">Measure of price fluctuation over time</p>
            </div>
            <div className="p-3 border rounded">
              <h5 className="font-medium text-sm">Dividend Yield</h5>
              <p className="text-xs text-neutral">Annual dividend as percentage of stock price</p>
            </div>
            <div className="p-3 border rounded">
              <h5 className="font-medium text-sm">Market Cap</h5>
              <p className="text-xs text-neutral">Total value of company's shares</p>
            </div>
            <div className="p-3 border rounded">
              <h5 className="font-medium text-sm">Beta</h5>
              <p className="text-xs text-neutral">Stock's volatility relative to market</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}