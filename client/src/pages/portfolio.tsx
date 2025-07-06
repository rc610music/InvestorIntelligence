import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, TrendingUp, TrendingDown, Edit, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import PortfolioStats from "@/components/portfolio/portfolio-stats";

const addPositionSchema = z.object({
  symbol: z.string().min(1, "Symbol is required").toUpperCase(),
  name: z.string().min(1, "Company name is required"),
  shares: z.string().min(1, "Shares is required"),
  avgPrice: z.string().min(1, "Average price is required"),
  currentPrice: z.string().min(1, "Current price is required"),
  userId: z.number().default(1),
});

type AddPositionData = z.infer<typeof addPositionSchema>;

export default function Portfolio() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: positions = [], isLoading } = useQuery({
    queryKey: ['/api/portfolio/positions/1'],
  });

  const form = useForm<AddPositionData>({
    resolver: zodResolver(addPositionSchema),
    defaultValues: {
      symbol: "",
      name: "",
      shares: "",
      avgPrice: "",
      currentPrice: "",
      userId: 1,
    },
  });

  const addPositionMutation = useMutation({
    mutationFn: async (data: AddPositionData) => {
      const response = await apiRequest('POST', '/api/portfolio/positions', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({ title: "Position added successfully" });
      setIsAddDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({ 
        title: "Error adding position", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deletePositionMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/portfolio/positions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({ title: "Position deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting position", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const onSubmit = (data: AddPositionData) => {
    addPositionMutation.mutate(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Portfolio</h1>
          <p className="text-neutral">Manage your investment positions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full lg:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Position
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Position</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="AAPL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Apple Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shares"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shares</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="avgPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="150.25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="165.50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={addPositionMutation.isPending} className="w-full">
                  {addPositionMutation.isPending ? "Adding..." : "Add Position"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Stats */}
      <PortfolioStats />

      {/* Positions List */}
      <Card>
        <CardHeader>
          <CardTitle>Positions</CardTitle>
        </CardHeader>
        <CardContent>
          {positions.length === 0 ? (
            <div className="text-center py-8 text-neutral">
              <p>No positions found. Add your first position to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {positions.map((position: any) => {
                const gainLoss = parseFloat(position.unrealizedGainLoss);
                const gainLossPercent = parseFloat(position.unrealizedGainLossPercent);
                const isPositive = gainLoss >= 0;

                return (
                  <div key={position.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-primary text-sm">{position.symbol}</span>
                      </div>
                      <div>
                        <p className="font-medium">{position.name}</p>
                        <p className="text-sm text-neutral">
                          {position.shares} shares • ${position.avgPrice} avg
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">${position.marketValue}</p>
                        <p className={`text-sm flex items-center ${isPositive ? 'text-success' : 'text-destructive'}`}>
                          {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {isPositive ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => deletePositionMutation.mutate(position.id)}
                          disabled={deletePositionMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
