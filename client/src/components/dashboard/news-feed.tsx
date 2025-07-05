import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NewsFeed() {
  const { data: news = [], isLoading } = useQuery({
    queryKey: ['/api/news'],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market News</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Loading news...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.length === 0 ? (
          <div className="text-center py-4 text-neutral">
            <p>No news articles available.</p>
          </div>
        ) : (
          news.slice(0, 3).map((article: any) => (
            <div key={article.id} className="flex space-x-3">
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1 line-clamp-2">{article.title}</h4>
                <p className="text-xs text-neutral mb-2 line-clamp-2">{article.summary}</p>
                <div className="flex items-center text-xs text-neutral">
                  <span>{article.source}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-3 h-3 mr-1" />
                  <span>
                    {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
