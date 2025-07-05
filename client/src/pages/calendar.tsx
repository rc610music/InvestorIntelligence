import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

export default function Calendar() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['/api/calendar/events'],
  });

  if (isLoading) {
    return <div>Loading calendar...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Economic Calendar</h1>
        <p className="text-neutral">Important economic events and announcements</p>
      </div>

      {/* Calendar Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-8 text-neutral">
              <p>No upcoming economic events scheduled.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event: any) => (
                <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {format(new Date(event.date), 'MMM').toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-primary">
                      {format(new Date(event.date), 'd')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge 
                        variant={
                          event.impact === 'HIGH' ? 'destructive' : 
                          event.impact === 'MEDIUM' ? 'default' : 
                          'secondary'
                        }
                      >
                        {event.impact}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-neutral mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{event.time}</span>
                      <span className="mx-2">•</span>
                      <span>{event.currency}</span>
                    </div>
                    {(event.previous || event.forecast || event.actual) && (
                      <div className="flex items-center space-x-4 text-xs">
                        {event.previous && (
                          <div>
                            <span className="text-neutral">Previous: </span>
                            <span className="font-medium">{event.previous}</span>
                          </div>
                        )}
                        {event.forecast && (
                          <div>
                            <span className="text-neutral">Forecast: </span>
                            <span className="font-medium">{event.forecast}</span>
                          </div>
                        )}
                        {event.actual && (
                          <div>
                            <span className="text-neutral">Actual: </span>
                            <span className="font-medium">{event.actual}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
