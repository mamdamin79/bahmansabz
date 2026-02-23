import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameDetailSidebarProps {
  platformNames: string[];
  genreNames?: string[];
  publisherNames?: string[];
  website?: string | null;
}

export function GameDetailSidebar({
  platformNames,
  genreNames = [],
  publisherNames = [],
  website,
}: GameDetailSidebarProps) {
  return (
    <aside className="space-y-6">
      {genreNames.length > 0 && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {genreNames.map((name) => (
                <Badge key={name} variant="secondary" className="font-normal">
                  {name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {publisherNames.length > 0 && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Publishers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {publisherNames.map((name) => (
                <Badge key={name} variant="secondary" className="font-normal">
                  {name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {platformNames.length > 0 && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {platformNames.map((platformName) => (
                <Badge
                  key={platformName}
                  variant="secondary"
                  className="font-normal"
                >
                  {platformName}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {website && (
        <Button variant="outline" className="w-full" asChild>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <ExternalLink className="size-4" />
            Official website
          </a>
        </Button>
      )}
    </aside>
  );
}
