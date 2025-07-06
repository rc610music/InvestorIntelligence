import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Download, Play, ExternalLink, FileText, Video, Clock, Users, Target, ChevronDown, ChevronUp, TrendingUp, Brain, PieChart } from "lucide-react";
import { useState } from "react";

export default function Education() {
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['/api/education/resources'],
  });

  const [expandedResources, setExpandedResources] = useState<number[]>([]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'ebook':
        return <BookOpen className="w-5 h-5" />;
      case 'guide':
        return <FileText className="w-5 h-5" />;
      case 'toolkit':
        return <PieChart className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'ebook':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'guide':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'toolkit':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const toggleResourceExpansion = (id: number) => {
    setExpandedResources(prev => 
      prev.includes(id) 
        ? prev.filter(resourceId => resourceId !== id)
        : [...prev, id]
    );
  };

  const categorizeResources = (resources: any[]) => {
    const categories = {
      'Fundamentals': ['Portfolio Management', 'Risk Management', 'Economics'],
      'Advanced Trading': ['Options Trading', 'Technical Analysis', 'Analytics'],
      'Specialized Topics': ['Alternative Investments', 'Sustainable Investing', 'Psychology'],
      'Tools & Research': ['Research Methods', 'Analytics']
    };
    
    const categorized: Record<string, any[]> = {};
    
    Object.keys(categories).forEach(category => {
      categorized[category] = resources.filter(resource => 
        categories[category as keyof typeof categories].some(cat => 
          resource.category.includes(cat)
        )
      );
    });
    
    return categorized;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral">Loading comprehensive educational resources...</p>
        </div>
      </div>
    );
  }

  const categorizedResources = categorizeResources(resources as any[]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Investment Education Center
        </h1>
        <p className="text-neutral max-w-2xl mx-auto">
          Master the markets with our comprehensive educational resources. From beginner fundamentals to advanced strategies, 
          everything you need to become a successful investor.
        </p>
      </div>

      {/* Learning Path Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-green-700 dark:text-green-400">
              <Target className="w-5 h-5 mr-2" />
              Beginner Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-neutral">Perfect for new investors</div>
            <div className="text-2xl font-bold text-green-600">4 Resources</div>
            <div className="text-xs text-neutral">Portfolio basics, risk management, and fundamental analysis</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-yellow-700 dark:text-yellow-400">
              <TrendingUp className="w-5 h-5 mr-2" />
              Intermediate Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-neutral">For experienced investors</div>
            <div className="text-2xl font-bold text-yellow-600">4 Resources</div>
            <div className="text-xs text-neutral">Options trading, technical analysis, and ESG investing</div>
          </CardContent>
        </Card>
        
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-red-700 dark:text-red-400">
              <Brain className="w-5 h-5 mr-2" />
              Advanced Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-neutral">For sophisticated investors</div>
            <div className="text-2xl font-bold text-red-600">2 Resources</div>
            <div className="text-xs text-neutral">Behavioral finance and advanced portfolio analytics</div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Resources by Category */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Trading</TabsTrigger>
          <TabsTrigger value="specialized">Specialized</TabsTrigger>
          <TabsTrigger value="tools">Tools & Research</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {(resources as any[]).map((resource: any) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                isExpanded={expandedResources.includes(resource.id)}
                onToggle={() => toggleResourceExpansion(resource.id)}
                getIcon={getIcon}
                getTypeColor={getTypeColor}
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
        
        {Object.entries(categorizedResources).map(([category, categoryResources]) => (
          <TabsContent key={category.toLowerCase().replace(/\s+/g, '')} value={category.toLowerCase().replace(/\s+/g, '')} className="space-y-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <p className="text-neutral text-sm">
                {category === 'Fundamentals' && 'Essential knowledge every investor needs to build a solid foundation.'}
                {category === 'Advanced Trading' && 'Sophisticated strategies and techniques for active traders.'}
                {category === 'Specialized Topics' && 'Niche areas and emerging trends in modern investing.'}
                {category === 'Tools & Research' && 'Practical tools and methodologies for market analysis.'}
              </p>
            </div>
            <div className="grid gap-4">
              {categoryResources.map((resource: any) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  isExpanded={expandedResources.includes(resource.id)}
                  onToggle={() => toggleResourceExpansion(resource.id)}
                  getIcon={getIcon}
                  getTypeColor={getTypeColor}
                  getDifficultyColor={getDifficultyColor}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

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

      {/* Quick Reference Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Key Investment Principles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-1">Time in Market {'>'} Timing the Market</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">Consistent investing beats trying to time perfect entries</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-400 mb-1">Diversification is Key</h4>
                <p className="text-sm text-green-700 dark:text-green-300">Spread risk across different assets and sectors</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-400 mb-1">Control Your Emotions</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">Fear and greed are the biggest enemies of returns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Investment Glossary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex justify-between items-center p-2 border rounded">
                <span className="font-medium text-sm">P/E Ratio</span>
                <span className="text-xs text-neutral">Price-to-earnings valuation metric</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span className="font-medium text-sm">Dividend Yield</span>
                <span className="text-xs text-neutral">Annual dividend ÷ stock price</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span className="font-medium text-sm">Beta</span>
                <span className="text-xs text-neutral">Stock volatility vs market</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span className="font-medium text-sm">Market Cap</span>
                <span className="text-xs text-neutral">Total company value</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ResourceCard Component
function ResourceCard({ resource, isExpanded, onToggle, getIcon, getTypeColor, getDifficultyColor }: {
  resource: any;
  isExpanded: boolean;
  onToggle: () => void;
  getIcon: (type: string) => JSX.Element;
  getTypeColor: (type: string) => string;
  getDifficultyColor: (difficulty: string) => string;
}) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              {getIcon(resource.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-lg">{resource.title}</h3>
                <Badge className={`text-xs ${getTypeColor(resource.type)}`}>
                  {resource.type}
                </Badge>
                <Badge className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty}
                </Badge>
              </div>
              <p className="text-neutral mb-3">{resource.description}</p>
              <div className="flex items-center space-x-4 text-sm text-neutral">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {resource.duration}
                </span>
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
            <Button variant="outline" size="sm" onClick={onToggle}>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
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

        {/* Expanded Content */}
        <Collapsible open={isExpanded}>
          <CollapsibleContent className="space-y-4">
            <Separator />
            
            {/* Topics Tags */}
            <div>
              <h4 className="font-medium mb-2">Topics Covered</h4>
              <div className="flex flex-wrap gap-2">
                {resource.topics?.map((topic: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Chapters */}
            {resource.content?.chapters && (
              <div>
                <h4 className="font-medium mb-2">Chapters</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {resource.content.chapters.map((chapter: string, index: number) => (
                    <div key={index} className="flex items-center text-sm text-neutral">
                      <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-2 text-xs font-medium">
                        {index + 1}
                      </span>
                      {chapter}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Points */}
            {resource.content?.keyPoints && (
              <div>
                <h4 className="font-medium mb-2">Key Takeaways</h4>
                <div className="space-y-2">
                  {resource.content.keyPoints.map((point: string, index: number) => (
                    <div key={index} className="flex items-start text-sm text-neutral">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}