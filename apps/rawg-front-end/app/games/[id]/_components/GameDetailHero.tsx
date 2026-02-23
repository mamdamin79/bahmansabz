import Image from "next/image";

interface GameDetailHeroProps {
  name: string;
  imageUrl?: string | null;
  released?: string | null;
}

export function GameDetailHero({
  name,
  imageUrl,
  released,
}: GameDetailHeroProps) {
  return (
    <header className="relative mb-8 overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-lg">
      {imageUrl ? (
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
              <p className="mt-1 text-sm font-medium text-white/90">
                Released {released}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-2xl bg-muted px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {name}
            </h1>
            {released && (
              <p className="mt-1 text-sm text-muted-foreground">
                Released {released}
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
