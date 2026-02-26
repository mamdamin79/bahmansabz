"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function GamesRouteHeader() {
  const pathname = usePathname();
  const isGamesRoute = pathname === "/games" || pathname.startsWith("/games/");
  const isGamesIndex = pathname === "/games" || pathname === "/games/";

  if (!isGamesRoute) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      {isGamesIndex ? (
        <div className="mx-auto flex max-w-6xl px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Games</h1>
        </div>
      ) : (
        <div className="mx-auto flex max-w-5xl px-4 py-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/games" className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="size-4" />
              Back to games
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
