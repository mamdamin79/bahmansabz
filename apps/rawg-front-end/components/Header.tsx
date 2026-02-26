"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/listbox", label: "ListBox" },
] as const;

export function Header() {
  const pathname = usePathname();
  const isGamesSection =
    pathname === "/games" || pathname.startsWith("/games/");
  const isListBoxSection =
    pathname === "/listbox" || pathname.startsWith("/listbox/");
  const isGameDetail = pathname.startsWith("/games/");

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/games") return isGamesSection;
    if (href === "/listbox") return isListBoxSection;
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-muted hover:text-foreground",
                isActive(href)
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
              aria-current={isActive(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        {isGameDetail && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/games" className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="size-4" />
              Back to games
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
