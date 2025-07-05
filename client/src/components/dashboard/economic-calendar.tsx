import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function EconomicCalendar() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['/api/calendar/events'],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Economic Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Loading calendar...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Economic Calendar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-4 text-neutral">
            <p>No upcoming economic events.</p>
          </div>
        ) : (
          events.slice(0, 3).map((event: any) => (
            <div key={event.id} className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">
                  {format(new Date(event.date), 'MMM').toUpperCase()}
                </span>
                <span className="text-xs font-bold text-primary">
                  {format(new Date(event.date), 'd')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm truncate">{event.title}</p>
                  <Badge 
                    variant={
                      event.impact === 'HIGH' ? 'destructive' : 
                      event.impact === 'MEDIUM' ? 'default' : 
                      'secondary'
                    }
                    className="text-xs"
                  >
                    {event.impact}
                  </Badge>
                </div>
                <p className="text-xs text-neutral">
                  {event.time} • {event.forecast && `Expected: ${event.forecast}`}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
