"use client";

import type { Genre } from "@/lib/api/model";
import { FilterCombobox } from "./FilterCombobox";

function getGenreId(g: Genre): string {
  return String(g.id ?? g.slug ?? g.name);
}

function getGenreSlug(g: Genre): string {
  return g.slug ?? String(g.id ?? g.name);
}

const genreFilterConfig = {
  paramKey: "genres",
  label: "Filter by genre",
  placeholderAll: "All genres",
  placeholderSearch: "Search genres…",
  emptyMessage: "No genre found.",
  getItemId: getGenreId,
  getItemParamValue: getGenreSlug,
  getItemLabel: (g: Genre) => g.name,
} as const;

interface GenresFilterProps {
  genres: Genre[];
}

export function GenresFilter({ genres }: GenresFilterProps) {
  return (
    <FilterCombobox items={genres} config={genreFilterConfig} />
  );
}
