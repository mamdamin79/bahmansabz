"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import type { Genre } from "@/lib/api/model";

interface GenresFilterProps {
  genres: Genre[];
}

function getGenreId(g: Genre): string {
  return String(g.id ?? g.slug ?? g.name);
}

/** Slug for URL searchParams (API accepts slugs e.g. action,rpg,indie) */
function getGenreSlug(g: Genre): string {
  return g.slug ?? String(g.id ?? g.name);
}
export function GenresFilter({ genres }: GenresFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const anchorRef = useComboboxAnchor();

  const genresParam = searchParams.get("genres") ?? "";
  const selectedSlugs = genresParam
    ? genresParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const selectedGenres = genres.filter((g) =>
    selectedSlugs.includes(getGenreSlug(g))
  );

  const handleValueChange = (value: Genre[] | null) => {
    const next = new URLSearchParams(searchParams);
    if (value && value.length > 0) {
      next.set("genres", value.map((g) => getGenreSlug(g)).join(","));
    } else {
      next.delete("genres");
    }
    next.delete("page");
    startTransition(() => {
      router.push(`/games?${next.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Filter by genre</Label>
      <Combobox<Genre, true>
        items={genres}
        multiple
        value={selectedGenres}
        onValueChange={handleValueChange}
        itemToStringLabel={(g) => g.name}
        itemToStringValue={getGenreId}
        isItemEqualToValue={(a, b) => getGenreId(a) === getGenreId(b)}
        autoHighlight={true}
      >
        <div
          ref={anchorRef}
          className="w-full max-w-md data-pending:pointer-events-none data-pending:opacity-70"
          data-pending={isPending ? "" : undefined}
        >
          <ComboboxChips>
            <ComboboxValue placeholder="All genres">
              {(selected: Genre[]) =>
                selected.map((g) => (
                  <ComboboxChip key={getGenreSlug(g)}>{g.name}</ComboboxChip>
                ))
              }
            </ComboboxValue>
            <ComboboxChipsInput placeholder="Search genres…" />
          </ComboboxChips>
        </div>
        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>No genre found.</ComboboxEmpty>
          <ComboboxList>
            {(genre) => (
              <ComboboxItem key={getGenreSlug(genre)} value={genre}>
                {genre.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
