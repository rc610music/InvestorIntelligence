import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Book, Scale } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Scale className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Legal Disclaimer</h1>
          <p className="text-muted-foreground">Important legal information regarding StockSense.Investments</p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800">Important Notice</h3>
            <p className="text-red-700 text-sm mt-1">
              This platform is designed for educational purposes only. We are not financial advisors, 
              and nothing on this platform constitutes financial advice.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Not Financial Advice</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>StockSense.Investments</strong> and all content, tools, analysis, predictions, and educational materials 
              provided on this platform are for <strong>educational and informational purposes only</strong>. We are not 
              licensed financial advisors, registered investment advisors, or broker-dealers.
            </p>
            <p>
              All information including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Educational materials and trading strategies</li>
              <li>Data analysis and portfolio suggestions</li>
              <li>AI-powered predictions and market sentiment analysis</li>
              <li>Options flow intelligence and social sentiment data</li>
              <li>Value predictions and backtesting results</li>
              <li>Market intelligence and risk assessments</li>
            </ul>
            <p>
              <strong>Should NOT be used as the sole basis for investment decisions.</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book className="h-5 w-5" />
              <span>Educational Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our platform exists to provide <strong>financial literacy education</strong> and help individuals 
              navigate complex financial systems. We aim to eliminate barriers including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Systemic financial barriers and lack of access to professional-grade tools</li>
              <li>Educational gaps in investment knowledge and strategy</li>
              <li>Complex taxation and investment regulations</li>
              <li>Historical barriers to financial markets participation</li>
            </ul>
            <p>
              While we strive to provide valuable educational content, <strong>you remain responsible 
              for all investment decisions</strong>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Consultation Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Always consult with qualified financial professionals</strong> before making investment decisions:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Licensed financial advisors for personalized investment advice</li>
              <li>Certified tax professionals for tax implications</li>
              <li>Legal counsel for complex financial structures</li>
              <li>Multiple reputable financial sources for market research</li>
            </ul>
            <p>
              Conduct thorough research and due diligence before concluding any analysis or making investment decisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Management Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Never invest more than you can afford to lose completely.</strong>
            </p>
            <p>
              We recommend this mental approach to risk management:
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              "When you invest money in the market, mentally treat it as spent forever. 
              Train your mind to assume that money is gone from your life - just like when 
              you spend money on lunch or entertainment. This psychological approach helps 
              you make more rational investment decisions without emotional attachment."
            </blockquote>
            <p>
              This mindset helps prevent emotional decision-making and overleveraging your financial position.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Technology Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our AI technology is <strong>intelligent but not perfect</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>AI models are continuously improving but will make mistakes</li>
              <li>Historical performance does not guarantee future results</li>
              <li>Market conditions can change rapidly and unpredictably</li>
              <li>AI predictions are based on available data which may be incomplete</li>
            </ul>
            <p>
              <strong>You are responsible for verifying all information</strong> obtained from 
              StockSense.Investments and its affiliates before making any financial decisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regulatory Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Investment regulations vary by jurisdiction. Ensure compliance with:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Local securities laws and regulations</li>
              <li>Tax reporting requirements in your jurisdiction</li>
              <li>Professional licensing requirements for financial advice</li>
              <li>Anti-money laundering and know-your-customer regulations</li>
            </ul>
            <p>
              <strong>StockSense.Investments is not responsible for your compliance</strong> with 
              applicable laws and regulations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              For questions about this disclaimer or our educational content, please contact our 
              support team. For investment advice, please consult with licensed financial professionals 
              in your jurisdiction.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}