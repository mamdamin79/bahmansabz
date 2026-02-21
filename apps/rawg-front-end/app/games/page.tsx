import { gamesList } from "@/lib/api/games/rawg";

// SSG: omit or use export const dynamic = 'force-static'
// SSR: export const dynamic = 'force-dynamic'
// ISR: export const revalidate = 60
export const revalidate = 60;

export default async function GamesPage() {
  const { data } = await gamesList({ page: 1, page_size: 10 });
  const games = data?.results ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Games (SSR / ISR)</h1>
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
