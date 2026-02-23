import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Game } from "@/lib/api/model";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  className?: string;
}

export function GameCard({ game, className }: GameCardProps) {
  const name = game.name ?? "Unknown";
  const imageUrl = game.background_image;
  const platformNames = game.platforms
    ?.map((p) => p.platform?.name)
    .filter(Boolean) as string[] | undefined;

  return (
    <Link href={`/games/${game.id}`} className="block h-full">
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
          {game.released && (
            <CardDescription>Released {game.released}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="min-h-0 flex-1 pt-0">
          <div className="flex flex-wrap gap-1.5">
            {game.rating != null && (
              <Badge variant="default" className="font-normal">
                Rating {game.rating}
              </Badge>
            )}
            {game.metacritic != null && (
              <Badge variant="default" className="font-normal">
                Metacritic {game.metacritic}
              </Badge>
            )}
            {game.playtime != null && game.playtime > 0 && (
              <Badge variant="default" className="font-normal">
                {game.playtime}h
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1.5">
            {platformNames?.length ? (
              platformNames.slice(0, 4).map((platformName) => (
                <Badge
                  key={platformName}
                  variant="outline"
                  className="text-xs font-normal"
                >
                  {platformName}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground text-xs">—</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
