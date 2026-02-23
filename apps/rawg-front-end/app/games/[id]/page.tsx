import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Gamepad2,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gamesRead } from "@/lib/api/games/games";
import type { GameSingle } from "@/lib/api/model";

export const dynamic = "force-dynamic";

interface GamePageProps {
  params: Promise<{ id: string }>;
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { id } = await params;
  const gameId = Number(id);
  if (Number.isNaN(gameId) || gameId < 1) {
    notFound();
  }

  let res: { data: GameSingle; status: number };
  try {
    res = await gamesRead(gameId);
  } catch {
    notFound();
  }

  if (res.status !== 200 || !res.data) {
    notFound();
  }

  const game = res.data;
  const name = game.name ?? "Unknown";
  const imageUrl = game.background_image;
  const description = game.description;
  const released = game.released;
  const rating = game.rating;
  const metacritic = game.metacritic;
  const playtime = game.playtime;
  const website = game.website;
  const platformNames = game.platforms
    ?.map((p) => p.platform?.name)
    .filter(Boolean) as string[] | undefined;

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Back link */}
      <div className="border-b border-border/50 bg-background/80 sticky top-0 z-10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl px-4 py-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/games" className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="size-4" />
              Back to games
            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Hero: image + title overlay */}
        <header className="relative mb-8 overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-lg">
          {imageUrl && (
            <>
              <div className="relative aspect-21/9 w-full sm:aspect-video">
                <Image
                  src={imageUrl}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 1280px"
                  priority
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h1 className="text-3xl font-bold tracking-tight drop-shadow-md sm:text-4xl">
                    {name}
                  </h1>
                  {released && (
                    <p className="text-white/90 mt-1 text-sm font-medium">
                      Released {released}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
          {!imageUrl && (
            <div className="bg-muted flex aspect-video items-center justify-center rounded-2xl px-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {name}
                </h1>
                {released && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    Released {released}
                  </p>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {rating != null && (
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="flex flex-col items-center gap-1 pt-5 pb-5">
                <Star className="text-muted-foreground size-5" />
                <span className="text-2xl font-bold tabular-nums">{rating}</span>
                <span className="text-muted-foreground text-xs font-medium">
                  Rating
                </span>
              </CardContent>
            </Card>
          )}
          {metacritic != null && (
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="flex flex-col items-center gap-1 pt-5 pb-5">
                <Gamepad2 className="text-muted-foreground size-5" />
                <span className="text-2xl font-bold tabular-nums">
                  {metacritic}
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  Metacritic
                </span>
              </CardContent>
            </Card>
          )}
          {playtime != null && playtime > 0 && (
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="flex flex-col items-center gap-1 pt-5 pb-5">
                <Clock className="text-muted-foreground size-5" />
                <span className="text-2xl font-bold tabular-nums">
                  {playtime}h
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  Playtime
                </span>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Two-column: sidebar + about */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar: platforms + website */}
          <aside className="space-y-6">
            {platformNames?.length ? (
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
            ) : null}

            {website ? (
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
            ) : null}
          </aside>

          {/* About */}
          {description ? (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-neutral dark:prose-invert prose-p:text-muted-foreground prose-headings:font-semibold max-w-none text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </main>
  );
}
