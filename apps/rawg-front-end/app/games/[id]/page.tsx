import { notFound } from "next/navigation";
import { gamesRead } from "@/lib/api/games/games";
import type { GameSingle } from "@/lib/api/model";
import { GameDetailAbout } from "./_components/GameDetailAbout";
import { GameDetailBackLink } from "./_components/GameDetailBackLink";
import { GameDetailHero } from "./_components/GameDetailHero";
import { GameDetailSidebar } from "./_components/GameDetailSidebar";
import { GameDetailStats } from "./_components/GameDetailStats";

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
  const platformNames = game.platforms
    ?.map((p) => p.platform?.name)
    .filter(Boolean) as string[] | undefined;

  const genreNames = game.genres
    ?.map((g) => g.name)
    .filter(Boolean) as string[] | undefined;
  const publisherNames = game.publishers
    ?.map((p) => p.name)
    .filter(Boolean) as string[] | undefined;

  return (
    <main className="min-h-screen bg-muted/30">
      <GameDetailBackLink />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <GameDetailHero
          name={name}
          imageUrl={game.background_image}
          released={game.released}
        />

        <GameDetailStats
          rating={game.rating}
          metacritic={game.metacritic}
          playtime={game.playtime}
        />

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <GameDetailSidebar
            platformNames={platformNames ?? []}
            genreNames={genreNames}
            publisherNames={publisherNames}
            website={game.website}
          />

          {game.description ? (
            <GameDetailAbout description={game.description} />
          ) : null}
        </div>
      </div>
    </main>
  );
}
