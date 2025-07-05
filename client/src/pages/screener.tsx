import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export default function Screener() {
  const [filters, setFilters] = useState({
    marketCap: "",
    sector: "",
    priceMin: "",
    priceMax: "",
    volumeMin: "",
    peRatio: "",
  });

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
              <Select>
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
              <Select>
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
              <Select>
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

            <div className="flex items-end">
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Screen Stocks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Screening Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-neutral">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Ready to Screen</p>
            <p>Set your criteria above and click "Screen Stocks" to find matching opportunities</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
