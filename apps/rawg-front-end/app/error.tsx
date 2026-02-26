"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RootError({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-muted/30">
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
