import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { creatorsList } from "@/lib/api/creators/creators";
import { gamesList } from "@/lib/api/games/games";
import { genresList } from "@/lib/api/genres/genres";
import { platformsList } from "@/lib/api/platforms/platforms";
import { publishersList } from "@/lib/api/publishers/publishers";
import { CreatorFilter } from "./_components/CreatorFilter";
import { GameCard } from "./_components/GameCard";
import { GamesPagination } from "./_components/GamesPagination";
import { GamesSort } from "./_components/GamesSort";
import { GenresFilter } from "./_components/GenresFilter";
import { MetacriticRange } from "./_components/MetacriticRange";
import { PlatformFilter } from "./_components/PlatformFilter";
import { PublisherFilter } from "./_components/PublisherFilter";
import { ReleaseDate } from "./_components/ReleaseDate";
import { SearchInput } from "./_components/SearchInput";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{
    publishers?: string;
    creators?: string;
    page?: string;
    dates?: string;
    genres?: string;
    search?: string;
    ordering?: string;
    metacritic?: string;
    platforms?: string;
  }>;
}) {
  const params = await searchParams;
  const publishersFilter = params.publishers ?? undefined;
  const creatorsFilter = params.creators ?? undefined;
  const pageParam = params.page;
  const datesParam = params.dates ?? undefined;
  const genresParam = params.genres ?? undefined;
  const searchParam = params.search ?? undefined;
  const orderingParam = params.ordering ?? undefined;
  const metacriticParam = params.metacritic ?? undefined;
  const platformsParam = params.platforms ?? undefined;
  const currentPage = Math.max(1, parseInt(String(pageParam ?? "1"), 10) || 1);

  const [gamesRes, publishersRes, creatorsRes, genresRes, platformsRes] =
    await Promise.all([
      gamesList({
        page: currentPage,
        page_size: PAGE_SIZE,
        ...(publishersFilter && { publishers: publishersFilter }),
        ...(creatorsFilter && { creators: creatorsFilter }),
        ...(datesParam && { dates: datesParam }),
        ...(genresParam && { genres: genresParam }),
        ...(searchParam && { search: searchParam }),
        ...(orderingParam && { ordering: orderingParam }),
        ...(metacriticParam && { metacritic: metacriticParam }),
        ...(platformsParam && { platforms: platformsParam }),
      }),
      publishersList({ page_size: 50 }),
      creatorsList({ page_size: 50 }),
      genresList({ page_size: 50 }),
      platformsList({ page_size: 50 }),
    ]);

  const games = gamesRes.data?.results ?? [];
  const publishers = publishersRes.data?.results ?? [];
  const creators = creatorsRes.data?.results ?? [];
  const genres = genresRes.data?.results ?? [];
  const platforms = platformsRes.data?.results ?? [];
  const totalCount = gamesRes.data?.count ?? 0;

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Page header - same style as detail back bar */}
      <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Games</h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Aside: filters */}
          <aside className="space-y-6 lg:sticky lg:top-18 lg:self-start">
            <Card className="rounded-2xl border-border/50 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Suspense fallback={<PublisherFilterFallback />}>
                  <PublisherFilter publishers={publishers} />
                </Suspense>
                <Suspense fallback={<CreatorFilterFallback />}>
                  <CreatorFilter creators={creators} />
                </Suspense>
                <Suspense fallback={<ReleaseDateFallback />}>
                  <ReleaseDate />
                </Suspense>
                <GenresFilter genres={genres} />
                <PlatformFilter platforms={platforms} />
                <MetacriticRange metacriticParam={metacriticParam} />
              </CardContent>
            </Card>
          </aside>

          {/* Main: search top left, then games grid */}
          <div className="min-w-0">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end sm:gap-6">
              <div className="min-w-0 flex-1 sm:max-w-xs">
                <SearchInput />
              </div>
              <div className="w-full sm:w-48">
                <GamesSort />
              </div>
            </div>

            {games.length > 0 ? (
              <>
                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {games.map((game) => (
                    <li
                      key={game.id ?? game.slug ?? game.name}
                      className="h-full"
                    >
                      <GameCard game={game} />
                    </li>
                  ))}
                </ul>
                <Suspense fallback={null}>
                  <GamesPagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                  />
                </Suspense>
              </>
            ) : (
              <Card className="rounded-2xl border-dashed border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground text-sm">
                    {publishersFilter ||
                    creatorsFilter ||
                    datesParam ||
                    genresParam ||
                    platformsParam ||
                    searchParam ||
                    orderingParam ||
                    metacriticParam
                      ? "No games found for the selected filters."
                      : "No games found."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function PublisherFilterFallback() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted-foreground">
        Filter by publisher
      </span>
      <div className="h-9 max-w-md animate-pulse rounded-md border border-border/50 bg-muted/50" />
    </div>
  );
}

function ReleaseDateFallback() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted-foreground">
        Filter by release date
      </span>
      <div className="h-9 max-w-md animate-pulse rounded-md border border-border/50 bg-muted/50" />
    </div>
  );
}

function CreatorFilterFallback() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted-foreground">
        Filter by creator
      </span>
      <div className="h-9 max-w-md animate-pulse rounded-md border border-border/50 bg-muted/50" />
    </div>
  );
}
