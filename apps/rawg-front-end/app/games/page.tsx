import { Suspense } from "react";
import { gamesList } from "@/lib/api/games/games";
import { publishersList } from "@/lib/api/publishers/publishers";
import { PublisherFilter } from "./_components/PublisherFilter";

export const dynamic = "force-dynamic";

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ publishers?: string }>;
}) {
  const params = await searchParams;
  const publishersFilter = params.publishers ?? undefined;

  const [gamesRes, publishersRes] = await Promise.all([
    gamesList({
      page: 1,
      page_size: 10,
      ...(publishersFilter && { publishers: publishersFilter }),
    }),
    publishersList({ page_size: 50 }),
  ]);

  const games = gamesRes.data?.results ?? [];
  const publishers = publishersRes.data?.results ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Games</h1>
      <div className="mb-6">
        <Suspense fallback={<PublisherFilterFallback />}>
          <PublisherFilter publishers={publishers} />
        </Suspense>
      </div>
      {games.length > 0 ? (
        <ul className="space-y-2">
          {games.map((game) => (
            <li
              key={game.id ?? game.name}
              className="rounded border border-gray-200 bg-white p-3 shadow-sm"
            >
              <span className="font-medium">{game.name}</span>
              {game.released && (
                <span className="ml-2 text-sm text-gray-500">
                  ({game.released})
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground rounded-md border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center text-sm">
          {publishersFilter
            ? "No games found for the selected publishers. Try changing the filter."
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
