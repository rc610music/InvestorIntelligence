import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function News() {
  const { data: news = [], isLoading } = useQuery({
    queryKey: ['/api/news'],
  });

  if (isLoading) {
    return <div>Loading news...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Market News</h1>
        <p className="text-neutral">Latest financial news and market updates</p>
      </div>

      {/* News Feed */}
      <div className="grid gap-6">
        {news.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-neutral">
                <p>No news articles available at the moment.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          news.map((article: any) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {article.imageUrl && (
                    <div className="lg:w-48 lg:flex-shrink-0">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-32 lg:h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg leading-tight">{article.title}</h3>
                      {article.sentiment && (
                        <Badge 
                          variant={
                            article.sentiment === 'positive' ? 'default' : 
                            article.sentiment === 'negative' ? 'destructive' : 
                            'secondary'
                          }
                          className="ml-2"
                        >
                          {article.sentiment}
                        </Badge>
                      )}
                    </div>
                    <p className="text-neutral text-sm mb-3 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-neutral">
                        <span className="font-medium">{article.source}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        <span>
                          {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                        </span>
                      </div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Read more
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
