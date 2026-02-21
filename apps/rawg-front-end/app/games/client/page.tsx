"use client";

import { useGamesList } from "@/lib/api/games/rawg";

export default function GamesClientPage() {
  const { data, isLoading, error } = useGamesList({
    page: 1,
    page_size: 10,
  });

  if (isLoading) return <p className="p-8">Loading games...</p>;
  if (error) return <p className="p-8 text-red-600">Error: {String(error)}</p>;

  const games = data?.results ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Games (Client / React Query)</h1>
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
    </main>
  );
}
