"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RootError({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">error</h1>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Card className="rounded-2xl border-dashed border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground text-sm">
              Something went wrong. Please try again.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" onClick={reset} type="button">
                Try again
              </Button>
              <Button variant="link" asChild>
                <Link href="/games">Back to games</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
