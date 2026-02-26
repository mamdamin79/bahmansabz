import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function GamesNotFound() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Games</h1>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Card className="rounded-2xl border-dashed border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground text-sm">
              This page could not be found.
            </p>
            <Button variant="link" asChild className="mt-4">
              <Link href="/games">Back to games</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
