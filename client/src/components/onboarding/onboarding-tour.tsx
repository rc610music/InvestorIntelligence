import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Lightbulb, 
  TrendingUp, 
  Shield, 
  Target, 
  Brain,
  BookOpen,
  PieChart,
  BarChart3,
  Calendar,
  Newspaper,
  Filter,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TourStep {
  id: string;
  title: string;
  description: string;
  tip: string;
  icon: any;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  category: 'basic' | 'intermediate' | 'advanced';
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to StockSense',
    description: 'Your comprehensive investment analytics platform with real-time market data and AI-powered insights.',
    tip: 'Investment Tip: Start with understanding your risk tolerance before making any investment decisions.',
    icon: TrendingUp,
    category: 'basic'
  },
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    description: 'Get a quick snapshot of market conditions, trending stocks, and key economic indicators.',
    tip: 'Investment Tip: Check the market overview daily to understand current market sentiment and trends.',
    icon: BarChart3,
    target: '#dashboard-section',
    category: 'basic'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Tracking',
    description: 'Track your investments, monitor performance, and analyze your portfolio allocation.',
    tip: 'Investment Tip: Diversification is key - aim for a balanced portfolio across different sectors and asset classes.',
    icon: PieChart,
    target: '#portfolio-section',
    category: 'basic'
  },
  {
    id: 'news',
    title: 'Market News',
    description: 'Stay informed with real-time financial news and market-moving events.',
    tip: 'Investment Tip: News can create short-term volatility, but focus on long-term fundamentals for better returns.',
    icon: Newspaper,
    target: '#news-section',
    category: 'basic'
  },
  {
    id: 'calendar',
    title: 'Economic Calendar',
    description: 'Track important economic events, earnings announcements, and market catalysts.',
    tip: 'Investment Tip: Economic events like Fed meetings and earnings reports can significantly impact stock prices.',
    icon: Calendar,
    target: '#calendar-section',
    category: 'intermediate'
  },
  {
    id: 'screener',
    title: 'Stock Screener',
    description: 'Filter and discover stocks based on technical indicators, fundamentals, and custom criteria.',
    tip: 'Investment Tip: Use screeners to find stocks that match your investment strategy and risk profile.',
    icon: Filter,
    target: '#screener-section',
    category: 'intermediate'
  },
  {
    id: 'ai-insights',
    title: 'AI Investment Intelligence',
    description: 'Leverage advanced AI models for sentiment analysis, predictions, and portfolio optimization.',
    tip: 'Investment Tip: AI can provide insights, but always combine with your own research and risk management.',
    icon: Brain,
    target: '#ai-insights-section',
    category: 'advanced'
  },
  {
    id: 'options-flow',
    title: 'Options Flow Intelligence',
    description: 'Track institutional money flows, whale trades, and unusual options activity.',
    tip: 'Investment Tip: Large institutional trades can signal market direction, but require careful interpretation.',
    icon: Activity,
    target: '#options-flow-section',
    category: 'advanced'
  },
  {
    id: 'education',
    title: 'Investment Education',
    description: 'Access comprehensive learning resources to improve your investment knowledge.',
    tip: 'Investment Tip: Continuous learning is essential for investment success. Start with basics and build up.',
    icon: BookOpen,
    target: '#education-section',
    category: 'basic'
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'Understanding and managing risk is crucial for long-term investment success.',
    tip: 'Investment Tip: Never invest more than you can afford to lose, and always have an exit strategy.',
    icon: Shield,
    category: 'basic'
  }
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'basic' | 'intermediate' | 'advanced'>('basic');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const filteredSteps = tourSteps.filter(step => step.category === selectedCategory);
  const currentStepData = filteredSteps[currentStep];
  const progress = ((currentStep + 1) / filteredSteps.length) * 100;

  useEffect(() => {
    if (currentStepData) {
      setCompletedSteps(prev => new Set([...Array.from(prev), currentStepData.id]));
    }
  }, [currentStepData]);

  const handleNext = () => {
    if (currentStep < filteredSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCategoryChange = (category: 'basic' | 'intermediate' | 'advanced') => {
    setSelectedCategory(category);
    setCurrentStep(0);
  };

  const handleSkipTour = () => {
    localStorage.setItem('stocksense-tour-completed', 'true');
    onClose();
  };

  const handleCompleteTour = () => {
    localStorage.setItem('stocksense-tour-completed', 'true');
    localStorage.setItem('stocksense-tour-category', selectedCategory);
    onClose();
  };

  if (!currentStepData) return null;

  const Icon = currentStepData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon className="w-6 h-6 text-primary" />
              <DialogTitle className="text-xl">Investment Tour</DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkipTour}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip Tour
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Selection */}
          <div className="flex space-x-2">
            <Button
              variant={selectedCategory === 'basic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange('basic')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Basic
            </Button>
            <Button
              variant={selectedCategory === 'intermediate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange('intermediate')}
            >
              <Target className="w-4 h-4 mr-2" />
              Intermediate
            </Button>
            <Button
              variant={selectedCategory === 'advanced' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange('advanced')}
            >
              <Brain className="w-4 h-4 mr-2" />
              Advanced
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {filteredSteps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {currentStepData.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base">
                {currentStepData.description}
              </CardDescription>
              
              {/* Investment Tip */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-yellow-800 mb-1">Investment Tip</p>
                    <p className="text-yellow-700 text-sm">{currentStepData.tip}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {currentStep === filteredSteps.length - 1 ? (
              <Button
                onClick={handleCompleteTour}
                className="flex items-center space-x-2"
              >
                <span>Complete Tour</span>
                <TrendingUp className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center space-x-2">
            {filteredSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}