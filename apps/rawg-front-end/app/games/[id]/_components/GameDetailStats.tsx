import { Clock, Gamepad2, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface GameDetailStatsProps {
  rating?: number | null;
  metacritic?: number | null;
  playtime?: number | null;
}

export function GameDetailStats({
  rating,
  metacritic,
  playtime,
}: GameDetailStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {rating != null && (
        <Card className="overflow-hidden border-border/50">
          <CardContent className="flex flex-col items-center gap-1 pb-5 pt-5">
            <Star className="size-5 text-muted-foreground" />
            <span className="text-2xl font-bold tabular-nums">{rating}</span>
            <span className="text-xs font-medium text-muted-foreground">
              Rating
            </span>
          </CardContent>
        </Card>
      )}
      {metacritic != null && (
        <Card className="overflow-hidden border-border/50">
          <CardContent className="flex flex-col items-center gap-1 pb-5 pt-5">
            <Gamepad2 className="size-5 text-muted-foreground" />
            <span className="text-2xl font-bold tabular-nums">
              {metacritic}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Metacritic
            </span>
          </CardContent>
        </Card>
      )}
      {playtime != null && playtime > 0 && (
        <Card className="overflow-hidden border-border/50">
          <CardContent className="flex flex-col items-center gap-1 pb-5 pt-5">
            <Clock className="size-5 text-muted-foreground" />
            <span className="text-2xl font-bold tabular-nums">{playtime}h</span>
            <span className="text-xs font-medium text-muted-foreground">
              Playtime
            </span>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
