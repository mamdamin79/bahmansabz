import { Suspense } from "react";
import { gamesList } from "@/lib/api/games/games";
import { genresList } from "@/lib/api/genres/genres";
import { publishersList } from "@/lib/api/publishers/publishers";
import { GameCard } from "./_components/GameCard";
import { GamesPagination } from "./_components/GamesPagination";
import { GenresFilter } from "./_components/GenresFilter";
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
    page?: string;
    dates?: string;
    genres?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const publishersFilter = params.publishers ?? undefined;
  const pageParam = params.page;
  const datesParam = params.dates ?? undefined;
  const genresParam = params.genres ?? undefined;
  const searchParam = params.search ?? undefined;
  const currentPage = Math.max(1, parseInt(String(pageParam ?? "1"), 10) || 1);

  const [gamesRes, publishersRes, genresRes] = await Promise.all([
    gamesList({
      page: currentPage,
      page_size: PAGE_SIZE,
      ...(publishersFilter && { publishers: publishersFilter }),
      ...(datesParam && { dates: datesParam }),
      ...(genresParam && { genres: genresParam }),
      ...(searchParam && { search: searchParam }),
    }),
    publishersList({ page_size: 50 }),
    genresList({ page_size: 50 }),
  ]);

  const games = gamesRes.data?.results ?? [];
  const publishers = publishersRes.data?.results ?? [];
  const genres = genresRes.data?.results ?? [];
  const totalCount = gamesRes.data?.count ?? 0;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Games</h1>
      <div className="mb-6">
        <Suspense fallback={<PublisherFilterFallback />}>
          <PublisherFilter publishers={publishers} />
        </Suspense>
        <Suspense fallback={<ReleaseDateFallback />}>
          <ReleaseDate />
        </Suspense>
        <GenresFilter genres={genres} />
        <SearchInput />
      </div>
      {games.length > 0 ? (
        <>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <li key={game.id ?? game.slug ?? game.name} className="h-full">
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
        <p className="text-muted-foreground rounded-md border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center text-sm">
          {publishersFilter || datesParam
            ? "No games found for the selected filters."
            : "No games found."}
        </p>
      )}
    </main>
  );
}

function PublisherFilterFallback() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Filter by publisher</span>
      <div className="bg-muted/50 border-input h-9 max-w-md animate-pulse rounded-md border" />
    </div>
  );
}

function ReleaseDateFallback() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Filter by release date</span>
      <div className="bg-muted/50 border-input h-9 max-w-md animate-pulse rounded-md border" />
    </div>
  );
}
