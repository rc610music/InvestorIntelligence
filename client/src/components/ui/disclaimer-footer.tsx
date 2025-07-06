import { AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export function DisclaimerFooter() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-yellow-800 mb-1">Investment Disclaimer</p>
          <p className="text-yellow-700 mb-2">
            This information is for educational purposes only and is not financial advice. 
            AI predictions are not perfect and will make mistakes. Always consult with qualified 
            financial professionals and conduct your own research before making investment decisions.
          </p>
          <p className="text-yellow-700">
            <strong>Never invest more than you can afford to lose.</strong> You are responsible 
            for verifying all information from StockSense.Investments.{" "}
            <Link href="/disclaimer" className="underline font-medium">
              View full disclaimer
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}