import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GameDetailBackLink() {
  return (
    <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl px-4 py-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/games" className="gap-1.5 text-muted-foreground">
            <ArrowLeft className="size-4" />
            Back to games
          </Link>
        </Button>
      </div>
    </div>
  );
}
