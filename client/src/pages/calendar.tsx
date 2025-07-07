import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, TrendingUp, AlertCircle, Star, Filter, RefreshCw } from "lucide-react";
import { format, isToday, isTomorrow, isYesterday, addDays, startOfWeek, endOfWeek } from "date-fns";
import { useState, useEffect } from "react";

export default function Calendar() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [refreshTime, setRefreshTime] = useState(new Date());
  
  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ['/api/calendar/events'],
    refetchInterval: 60000, // Refresh every minute for live updates
  });

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const getEventDateLabel = (eventDate: string) => {
    const date = new Date(eventDate);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d');
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTimeUntilEvent = (eventDate: string) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diff = event.getTime() - now.getTime();
    
    if (diff < 0) return 'Past';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return `${Math.floor(diff / 86400000)}d`;
  };

  // Filter events by time periods
  const filterEvents = (events: any[], filter: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = addDays(today, 1);
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    switch (filter) {
      case 'today':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= today && eventDate < tomorrow;
        });
      case 'tomorrow':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= tomorrow && eventDate < addDays(tomorrow, 1);
        });
      case 'week':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= weekStart && eventDate <= weekEnd;
        });
      case 'high':
        return events.filter(event => event.impact === 'high');
      default:
        return events;
    }
  };

  const filteredEvents = filterEvents(events, activeFilter);

  // Group events by date for better organization
  const groupedEvents = filteredEvents.reduce((groups: any, event: any) => {
    const date = format(new Date(event.date), 'yyyy-MM-dd');
    if (!groups[date]) groups[date] = [];
    groups[date].push(event);
    return groups;
  }, {});

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-2 w-64"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Live Updates */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1 flex items-center space-x-2">
            <CalendarIcon className="w-6 h-6" />
            <span>Economic Calendar</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live Updates" />
          </h1>
          <p className="text-neutral">
            Real-time economic events and market-moving announcements
          </p>
          <p className="text-xs text-neutral mt-1">
            Last updated: {format(refreshTime, 'h:mm:ss a')} • Auto-refresh: 30s
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-neutral">Today's Events</p>
              <p className="text-lg font-bold">{filterEvents(events, 'today').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-neutral">High Impact</p>
              <p className="text-lg font-bold">{filterEvents(events, 'high').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-neutral">This Week</p>
              <p className="text-lg font-bold">{filterEvents(events, 'week').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm text-neutral">Total Events</p>
              <p className="text-lg font-bold">{events.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Event Timeline</span>
            </CardTitle>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Events' },
                { key: 'today', label: 'Today' },
                { key: 'tomorrow', label: 'Tomorrow' },
                { key: 'week', label: 'This Week' },
                { key: 'high', label: 'High Impact' }
              ].map(filter => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {Object.keys(groupedEvents).length === 0 ? (
            <div className="text-center py-12 text-neutral">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No events found</p>
              <p>Try adjusting your filter or check back later for updates.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedEvents)
                .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                .map(([date, dayEvents]) => (
                <div key={date}>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-px bg-gray-200 flex-1" />
                    <Badge variant="outline" className="px-3 py-1">
                      {getEventDateLabel(date)}
                    </Badge>
                    <div className="h-px bg-gray-200 flex-1" />
                  </div>
                  
                  <div className="space-y-3">
                    {(dayEvents as any[]).map((event: any) => (
                      <div 
                        key={event.id} 
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors relative"
                      >
                        {/* Live indicator for events happening soon */}
                        {getTimeUntilEvent(event.date) !== 'Past' && 
                         parseInt(getTimeUntilEvent(event.date)) < 60 && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        )}
                        
                        {/* Time Badge */}
                        <div className="w-20 text-center">
                          <div className="text-xs font-medium text-primary">
                            {format(new Date(event.date), 'h:mm a')}
                          </div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {getTimeUntilEvent(event.date)}
                          </Badge>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-lg">{event.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getImpactColor(event.impact)}>
                                {event.impact} impact
                              </Badge>
                              {event.currency && (
                                <Badge variant="outline">{event.currency}</Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-neutral mb-2">
                            <span className="flex items-center space-x-1">
                              <span className="w-2 h-2 bg-blue-500 rounded-full" />
                              <span>{event.country}</span>
                            </span>
                            {event.previous && (
                              <span>Previous: {event.previous}</span>
                            )}
                            {event.forecast && (
                              <span>Forecast: {event.forecast}</span>
                            )}
                          </div>
                          
                          {event.description && (
                            <p className="text-sm text-neutral">{event.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
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