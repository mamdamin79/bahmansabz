import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GameDetailSidebarProps {
  platformNames: string[];
  website?: string | null;
}

export function GameDetailSidebar({
  platformNames,
  website,
}: GameDetailSidebarProps) {
  return (
    <aside className="space-y-6">
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
