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
import { FILTER_LIST_PAGE_SIZE, GAMES_PAGE_SIZE } from "./constants";

export const dynamic = "force-dynamic";

type SearchParams = {
  publishers?: string;
  creators?: string;
  page?: string;
  dates?: string;
  genres?: string;
  search?: string;
  ordering?: string;
  metacritic?: string;
  platforms?: string;
};

function parsePageParams(params: SearchParams) {
  const pageParam = params.page;
  const currentPage = Math.max(1, parseInt(String(pageParam ?? "1"), 10) || 1);
  return {
    currentPage,
    publishersFilter: params.publishers ?? undefined,
    creatorsFilter: params.creators ?? undefined,
    datesParam: params.dates ?? undefined,
    genresParam: params.genres ?? undefined,
    searchParam: params.search ?? undefined,
    orderingParam: params.ordering ?? undefined,
    metacriticParam: params.metacritic ?? undefined,
    platformsParam: params.platforms ?? undefined,
  };
}

function buildGamesListParams(
  p: ReturnType<typeof parsePageParams>
): Parameters<typeof gamesList>[0] {
  return {
    page: p.currentPage,
    page_size: GAMES_PAGE_SIZE,
    ...(p.publishersFilter && { publishers: p.publishersFilter }),
    ...(p.creatorsFilter && { creators: p.creatorsFilter }),
    ...(p.datesParam && { dates: p.datesParam }),
    ...(p.genresParam && { genres: p.genresParam }),
    ...(p.searchParam && { search: p.searchParam }),
    ...(p.orderingParam && { ordering: p.orderingParam }),
    ...(p.metacriticParam && { metacritic: p.metacriticParam }),
    ...(p.platformsParam && { platforms: p.platformsParam }),
  };
}

function hasActiveFilters(p: ReturnType<typeof parsePageParams>): boolean {
  return !!(
    p.publishersFilter ||
    p.creatorsFilter ||
    p.datesParam ||
    p.genresParam ||
    p.platformsParam ||
    p.searchParam ||
    p.orderingParam ||
    p.metacriticParam
  );
}

async function fetchGamesPageData(p: ReturnType<typeof parsePageParams>) {
  const [gamesRes, publishersRes, creatorsRes, genresRes, platformsRes] =
    await Promise.all([
      gamesList(buildGamesListParams(p)),
      publishersList({ page_size: FILTER_LIST_PAGE_SIZE }),
      creatorsList({ page_size: FILTER_LIST_PAGE_SIZE }),
      genresList({ page_size: FILTER_LIST_PAGE_SIZE }),
      platformsList({ page_size: FILTER_LIST_PAGE_SIZE }),
    ]);
  return {
    games: gamesRes.data?.results ?? [],
    publishers: publishersRes.data?.results ?? [],
    creators: creatorsRes.data?.results ?? [],
    genres: genresRes.data?.results ?? [],
    platforms: platformsRes.data?.results ?? [],
    totalCount: gamesRes.data?.count ?? 0,
  };
}

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const p = parsePageParams(params);

  let data: Awaited<ReturnType<typeof fetchGamesPageData>>;
  try {
    data = await fetchGamesPageData(p);
  } catch {
    throw new Error("Failed to load games");
  }

  const emptyMessage = hasActiveFilters(p)
    ? "No games found for the selected filters."
    : "No games found.";

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Aside: filters */}
          <aside className="space-y-6 lg:sticky lg:top-18 lg:self-start">
            <Card className="rounded-2xl border-border/50 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PublisherFilter publishers={data.publishers} />
                <CreatorFilter creators={data.creators} />
                <ReleaseDate />
                <GenresFilter genres={data.genres} />
                <PlatformFilter platforms={data.platforms} />
                <MetacriticRange metacriticParam={p.metacriticParam} />
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

            {data.games.length > 0 ? (
              <>
                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {data.games.map((game) => (
                    <li
                      key={game.id ?? game.slug ?? game.name}
                      className="h-full"
                    >
                      <GameCard game={game} />
                    </li>
                  ))}
                </ul>
                <GamesPagination
                  currentPage={p.currentPage}
                  totalCount={data.totalCount}
                />
              </>
            ) : (
              <Card className="rounded-2xl border-dashed border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground text-sm">
                    {emptyMessage}
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
