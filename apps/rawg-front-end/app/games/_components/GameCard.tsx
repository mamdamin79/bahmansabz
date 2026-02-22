import Image from "next/image";
import type { Game } from "@/lib/api/model";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  className?: string;
}

function formatRating(value: number | undefined): string {
  if (value == null) return "—";
  return String(value);
}

export function GameCard({ game, className }: GameCardProps) {
  const name = game.name ?? "Unknown";
  const imageUrl = game.background_image;
  const released = game.released;
  const rating = game.rating;
  const metacritic = game.metacritic;
  const playtime = game.playtime;
  const platformNames = game.platforms
    ?.map((p) => p.platform?.name)
    .filter(Boolean) as string[] | undefined;

  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md",
        imageUrl && "pt-0",
        className
      )}
    >
      {imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="gap-1">
        <CardTitle className="line-clamp-2 text-base">{name}</CardTitle>
        {released && (
          <CardDescription>Released {released}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="min-h-0 flex-1 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {rating != null && (
            <Badge variant="default" className="font-normal">
              Rating {formatRating(rating)}
            </Badge>
          )}
          {metacritic != null && (
            <Badge variant="default" className="font-normal">
              Metacritic {metacritic}
            </Badge>
          )}
          {playtime != null && playtime > 0 && (
            <Badge variant="default" className="font-normal">
              {playtime}h
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className=" pt-4 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {platformNames?.length
            ? platformNames.slice(0, 4).map((platformName) => (
                <Badge key={platformName} variant="outline" className="font-normal text-xs">
                  {platformName}
                </Badge>
              ))
            : (
              <span className="text-muted-foreground text-xs">—</span>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
