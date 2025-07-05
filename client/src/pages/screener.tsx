import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Screener() {
  const [filters, setFilters] = useState({
    marketCap: "",
    sector: "",
    priceMin: "",
    priceMax: "",
    volumeMin: "",
    peRatio: "",
  });
  const [results, setResults] = useState<any[]>([]);

  const screenMutation = useMutation({
    mutationFn: async (filterData: any) => {
      const response = await apiRequest('POST', '/api/screener/search', filterData);
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data);
    },
  });

  const handleScreen = () => {
    screenMutation.mutate(filters);
  };

  const clearFilters = () => {
    setFilters({
      marketCap: "",
      sector: "",
      priceMin: "",
      priceMax: "",
      volumeMin: "",
      peRatio: "",
    });
    setResults([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Stock Screener</h1>
        <p className="text-neutral">Find stocks that match your investment criteria</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Screening Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="marketCap">Market Cap</Label>
              <Select value={filters.marketCap} onValueChange={(value) => setFilters(prev => ({ ...prev, marketCap: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select market cap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mega">Mega Cap ({'>'}$200B)</SelectItem>
                  <SelectItem value="large">Large Cap ($10B-$200B)</SelectItem>
                  <SelectItem value="mid">Mid Cap ($2B-$10B)</SelectItem>
                  <SelectItem value="small">Small Cap ($300M-$2B)</SelectItem>
                  <SelectItem value="micro">Micro Cap ({'<'}$300M)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sector">Sector</Label>
              <Select value={filters.sector} onValueChange={(value) => setFilters(prev => ({ ...prev, sector: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="financials">Financials</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="consumer">Consumer</SelectItem>
                  <SelectItem value="industrials">Industrials</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priceMin">Price Range</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="volumeMin">Min Volume</Label>
              <Input
                placeholder="e.g., 1000000"
                type="number"
                value={filters.volumeMin}
                onChange={(e) => setFilters(prev => ({ ...prev, volumeMin: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="peRatio">P/E Ratio</Label>
              <Select value={filters.peRatio} onValueChange={(value) => setFilters(prev => ({ ...prev, peRatio: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select P/E range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low ({'<'}15)</SelectItem>
                  <SelectItem value="moderate">Moderate (15-25)</SelectItem>
                  <SelectItem value="high">High ({'>'}25)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end space-x-2">
              <Button onClick={handleScreen} disabled={screenMutation.isPending} className="flex-1">
                <Search className="w-4 h-4 mr-2" />
                {screenMutation.isPending ? "Screening..." : "Screen Stocks"}
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>
            Screening Results 
            {results.length > 0 && <Badge variant="secondary" className="ml-2">{results.length} stocks</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-12 text-neutral">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Ready to Screen</p>
              <p>Set your criteria above and click "Screen Stocks" to find matching opportunities</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((stock, index) => {
                const isPositive = stock.change >= 0;
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-primary text-sm">{stock.symbol}</span>
                      </div>
                      <div>
                        <p className="font-medium">{stock.name}</p>
                        <p className="text-sm text-neutral">
                          {stock.sector} • Market Cap: {stock.marketCap}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold">${stock.price.toFixed(2)}</p>
                      <p className={`text-sm flex items-center justify-end ${isPositive ? 'text-success' : 'text-destructive'}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {isPositive ? '+' : ''}{stock.change.toFixed(2)}%
                      </p>
                      <p className="text-xs text-neutral">P/E: {stock.pe}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
